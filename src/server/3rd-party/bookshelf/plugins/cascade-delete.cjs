/**
 * Module dependencies.
 */

const { mapSeries } = require('bluebird');
const flattenDeep = require('lodash/flattenDeep');
const reduce = require('lodash/reduce');

/**
 * Export `bookshelf-cascade-delete` plugin.
 */
module.exports = (bookshelf) => {
  const Model = bookshelf.Model.prototype;
  const knex = bookshelf.knex;
  const client = knex.client.config.client;
  const quoteColumns =
    client === 'postgres' || client === 'postgresql' || client === 'pg';

  /**
   * Dependency map.
   */

  function dependencyMap(skipDependents = false) {
    if (skipDependents || !this.deletedDependencies) {
      return;
    }

    return reduce(
      this.deletedDependencies,
      (result, dependent) => {
        const { relatedData } = this.prototype[dependent]();
        const skipDependents = relatedData.type === 'belongsToMany';

        return [
          ...result,
          {
            deletedDependencies: dependencyMap.call(
              relatedData.target,
              skipDependents
            ),
            key: relatedData.key('foreignKey'),
            model: relatedData.target,
            skipDependents,
            tableName: skipDependents
              ? relatedData.joinTable()
              : relatedData.target.prototype.tableName,
          },
        ];
      },
      []
    );
  }

  /**
   * Recursive deletes.
   */

  function recursiveDeletes(parent) {
    // Stringify in case of parent being an instance of query.
    const parentValue =
      typeof parent === 'number' || typeof parent === 'string'
        ? `'${parent}'`
        : parent.toString();
    const dependencies = dependencyMap.call(this);

    // Build delete queries for each dependent.
    return reduce(
      dependencies,
      (result, { tableName, key, model, skipDependents }) => {
        const whereClause = `${
          quoteColumns ? `"${key}"` : key
        } IN (${parentValue})`;

        return [
          ...result,
          (transaction) => transaction(tableName).del().whereRaw(whereClause),
          skipDependents
            ? []
            : recursiveDeletes.call(
                model,
                knex(tableName)
                  .column(model.prototype.idAttribute)
                  .whereRaw(whereClause)
              ),
        ];
      },
      []
    );
  }

  /**
   * Cascade delete.
   */

  function cascadeDelete(transacting, options) {
    const id =
      this.get(this.idAttribute) || this._knex.column(this.idAttribute);
    const queries = recursiveDeletes.call(this.constructor, id);

    return mapSeries(flattenDeep(queries).reverse(), (query) =>
      query(transacting)
    ).then(() =>
      Model.destroy.call(this, {
        ...options,
        transacting,
      })
    );
  }

  /**
   * Extend Model `destroy` method.
   */

  bookshelf.Model = bookshelf.Model.extend({
    destroy(options) {
      options = options || {};

      if (options.cascadeDelete === false) {
        return Model.destroy.call(this, options);
      }

      if (options.transacting) {
        return cascadeDelete.call(this, options.transacting, options);
      }

      return bookshelf.knex.transaction((transacting) =>
        cascadeDelete.call(this, transacting, options)
      );
    },
  });
};

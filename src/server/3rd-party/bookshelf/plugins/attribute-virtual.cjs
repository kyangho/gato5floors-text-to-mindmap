const _ = require('lodash');

function getVirtual(model, virtualName) {
  if (_.get(model, ['constructor', 'virtuals', virtualName])) {
    return _.get(model.constructor.virtuals, [virtualName, 'get'])
      ? model.constructor.virtuals[virtualName].get(model.attributes, model)
      : _.isFunction(model.constructor.virtuals[virtualName])
      ? model.constructor.virtuals[virtualName](model.attributes, model)
      : null;
  }
}

function getVirtuals(model, response, options = {}) {
  _.forEach(
    _.get(options, 'virtuals') || _.map(this.constructor.virtuals, 'name'),
    (virtualName) => {
      if (!virtualName) {
        return;
      }
      this.attributes[virtualName] = getVirtual(this, virtualName);
    }
  );
}

function setVirtual(value, key) {
  const virtual = _.get(this.constructor.virtuals, key);
  if (virtual) {
    if (_.isFunction(virtual.set)) {
      virtual.set.call(this, value);
    }
    return true;
  }
}

// Virtuals Plugin
// Allows getting/setting virtual (computed) properties on model instances.
// -----
module.exports = (Bookshelf) => {
  const proto = Bookshelf.Model.prototype;
  const Model = Bookshelf.Model.extend({
    // If virtual properties have been defined they will be created
    // as simple getters on the model.
    initialize() {
      if (!this.constructor.virtuals) {
        return proto.initialize.apply(this, arguments);
      }

      const virtuals = this.constructor.virtuals;
      if (_.isObject(virtuals)) {
        for (const virtualName in virtuals) {
          let getter, setter;
          if (_.isFunction(virtualName)) {
            getter = virtualName;
            setter = _.noop;
          } else {
            getter = virtualName.get ? virtualName.get : _.noop;
            setter = virtualName.set ? virtualName.set : _.noop;
            this.constructor.virtuals[virtualName].name = virtualName;
          }
          Object.defineProperty(this, virtualName, {
            enumerable: true,
            get: getter,
            set: setter,
          });
        }
      }

      this.on('fetched', getVirtuals.bind(this));

      return proto.initialize.apply(this, arguments);
    },

    // Allow virtuals to be fetched like normal properties
    get(attr) {
      if (_.get(this.constructor.virtuals, attr)) {
        return getVirtual.apply(
          undefined,
          [this, attr].concat(Array.from(arguments).slice(1))
        );
      }
      return proto.get.apply(this, arguments);
    },

    // Allow virtuals to be set like normal properties
    set(key, value, options) {
      if (!key) return this;

      // Determine whether we're in the middle of a patch operation based on the
      // existence of the `patchAttributes` object.
      const isPatching = this.patchAttributes != null;

      // Handle `{key: value}` style arguments.
      if (_.isObject(key)) {
        const nonVirtuals = _.omitBy(key, setVirtual.bind(this));
        if (isPatching) {
          this.patchAttributes = _.assign(
            {},
            this.patchAttributes,
            nonVirtuals
          );
        }
        // Set the non-virtual attributes as normal.
        return proto.set.call(this, nonVirtuals, options);
      }

      // Handle `"key", value` style arguments for virtual setter.
      if (setVirtual.call(this, value, key)) {
        return this;
      }

      // Handle `"key", value` style assignment call to be added to patching
      // attributes if set("key", value, ...) called from inside a virtual setter.
      if (isPatching) {
        this.patchAttributes[key] = value;
      }

      return proto.set.apply(this, arguments);
    },

    // Override `save` to keep track of state while doing a `patch` operation.
    save(key, value, options) {
      let attrs = {};

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key && _.clone(key);
        options = _.clone(value) || {};
      } else {
        attrs[key] = value;
        options = options ? _.clone(options) : {};
      }

      // Determine whether to save using update or insert
      options.method = this.saveMethod(options);

      // Check if we're going to do a patch, in which case deal with virtuals now.
      if (options.method === 'update' && options.patch) {
        // Extend the model state to collect side effects from the virtual setter
        // callback. If `set` is called, this object will be updated in addition
        // to the normal `attributes` object.
        this.patchAttributes = {};

        // Any setter could throw. We need to reject `save` if they do.
        try {
          // Check if any of the patch attributes are virtuals. If so call their setter. Any setter that calls
          // `this.set` will be modifying `this.patchAttributes` instead of `this.attributes`.
          for (const attributeName in attrs) {
            if (setVirtual.call(this, attrs[attributeName], attributeName)) {
              // This was a virtual, so remove it from the attributes to be passed to `Model.save`.
              delete attrs[attributeName];
            }
          }

          // Now add any changes that occurred during the update.
          attrs = _.assign({}, attrs, this.patchAttributes);
        } catch (e) {
          return Promise.reject(e);
        } finally {
          // Delete the temporary object.
          delete this.patchAttributes;
        }
      }

      return proto.save.call(this, attrs, options);
    },
  });

  Bookshelf.Model = Model;

  const Collection = Bookshelf.Collection.prototype;

  Bookshelf.Collection = Bookshelf.Collection.extend({
    initialize() {
      if (!this.model.virtuals) {
        return Collection.initialize.apply(this, arguments);
      }

      // Parse JSON columns after collection is fetched.
      this.on('fetched', (collection) => {
        collection.models.forEach((model) => {
          getVirtuals.apply(model);
        });
      });

      return Collection.initialize.apply(this, arguments);
    },
  });
};

const uuid = require('uuid');
const merge = require('lodash/merge');
const result = require('lodash/result');
const isFunction = require('lodash/isFunction');
const isBoolean = require('lodash/isBoolean');
const toString = require('lodash/toString');

module.exports = (bookshelf, settings) => {
  // Add default settings
  const { version } = merge(
    {
      version: 'v4',
    },
    settings
  );

  // Store prototypes for later
  const modelPrototype = bookshelf.Model.prototype;

  // Extends the default model class
  bookshelf.Model = bookshelf.Model.extend({
    initialize(attributes, options) {
      modelPrototype.initialize.call(this);

      if (this.uuid) {
        const uuidColumn = isBoolean(this.uuid)
          ? this.idAttribute
          : toString(this.uuid);
        this.defaults = merge(
          {
            [uuidColumn]: isFunction(uuid[version])
              ? uuid[version]()
              : version.call(this, attributes, options),
          },
          result(this, 'defaults')
        );
      }
    },
  });
};

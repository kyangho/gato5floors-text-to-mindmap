# bookshelf-json-columns

This plugin enables you to define which model columns have JSON format, preventing manual hook definition for each model with JSON columns.

## Usage

Require and register the **bookshelf-json-columns** plugin:

```js
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('./json-columns'));
```

Define which columns have JSON format with the `jsonColumns` class property:

```js
bookshelf.Model.extend({
  tableName: 'foo'
}, {
  jsonColumns: ['bar', 'biz']
});
```

If you're using ES6 class syntax, define `jsonColumns` as static property:

```js
class Model extends bookshelf.Model {
  get tableName() {
    return 'foo';
  }

  static jsonColumns = ['bar', 'biz'];
}
```

This plugin extends the `initialize` and `save` methods of Bookshelf's `Model`, so if you are also extending or overriding them on your models make sure to call their prototype after your work is done:

```js
bookshelf.Model.extend({
  initialize: function() {
    // Do some stuff.
    store.addModel(this);

    // Call the `initialize` prototype method.
    bookshelf.Model.prototype.initialize.apply(this, arguments);
  },
  save: function() {
    // Do some stuff.
    store.validateModel(this);

    // Call the `save` prototype method.
    bookshelf.Model.prototype.save.apply(this, arguments);
  },
  tableName: 'foo'
}, {
  jsonColumns: ['bar', 'biz']
});
```

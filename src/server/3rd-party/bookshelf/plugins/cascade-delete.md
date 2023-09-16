# bookshelf-cascade-delete

This plugin provides cascade delete with a simple configuration on your models.

## Usage

Require and register the `bookshelf-cascade-delete` plugin:

```js
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('./cascade-delete'));
```

Define which relations depend on your model when it's destroyed with the `deletedDependencies` prototype property:

```js
const Post = bookshelf.Model.extend({
  tableName: 'Post'
});

const Author = bookshelf.Model.extend({
  tableName: 'Author',
  posts: function() {
    return this.hasMany(Post);
  }
}, {
  dependents: ['posts']
});
```

If you're using the ES6 class syntax, define `deletedDependencies` as static property:

```js
class Author extends bookshelf.Model {
  get tableName() {
    return 'Author';
  }

  posts() {
    return this.hasMany(Post);
  }

  static dependents = ['posts'];
}
```

Use `destroy` to delete your model:

```js
Author.forge({ id: 1 }).destroy();
```

A transaction is created and all the cascade queries executed:

```sql
DELETE FROM "Post" where "author_id" IN (1)
DELETE FROM "Author" where "id" IN (1)
```

You can pass an existing transaction as you would normally do:

```js
bookshelf.transaction(function(transaction) {
  return Author.forge({ id: 1 }).destroy({ transacting: transaction })
}).then(function() {
  return Author.forge({ id: 2 }).destroy({ transacting: transaction })
});
```

It's possible to disable the cascade delete with the `cascadeDelete` option:

```js
Author.forge({ id: 1 }).destroy({ cascadeDelete: false });
```

Since this plugin extends the `destroy` method, if you're extending or overriding it on your models make sure to call its prototype after your work is done:

```js
const Author = bookshelf.Model.extend({
  tableName: 'Author',
  posts: function() {
    return this.hasMany(Post);
  },
  destroy: function() {
    // Do some stuff.
    sendDeleteAccountEmail(this);

    // Call the destroy prototype method.
    bookshelf.Model.prototype.destroy.apply(this, arguments);
  }
}, {
  dependents: ['posts']
});
```
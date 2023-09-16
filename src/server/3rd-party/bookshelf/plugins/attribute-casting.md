# bookshelf-attribute-casting
This plugin that makes formatting, parsing and finding models easier.

## Installation
All you need to do is add it as a bookshelf plugin and enable it on your models.

```js
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('./attribute-casting');
```

## Usage
This plugin allows you to create an arrangement for the variables
inside your models. You can now specify for each variable how
they should be inserted and read to and from the database:

```js
// Model definition
let User = bookshelf.model('users', {
  tableName: 'users',
  // Sample relation
  organisation: function() {
    return this.belongsTo('organisations');
  }
}, {
  casts : {
    password: {
      format: (password) => encrypt(password),
      parse: (password) => decrypt(password)
    }
  }
});
```

The above code will encrypt a password (if present) when
storing the model to the database and decrypt the password
(if present) when getting a user out of the database.
This makes it so the database always has the encrypted password
and `user.get('password')` will always return the decrypted password.

To use an unformatted field to retrieve a model from the database
the `spot()` function can be used:

```js
User.spot({username: 'PietHein', password: 'decryptedpassword'})
.fetch().then(user => console.log(user.get('status') + user.get('password')));
// Prints: decryptedpassword
```

In this case the password will be formatted (encrypted) before being passed
to the database query.

## Overriding
_WARNING: SpotParse makes the format and parse functions static to be used with `spot()`._  
Overriding the `format` and `parse` functions inside your model will
result in `spot({key: value})` no longer parsing the value properly.  
You can however override the `format` and `parse` functions in the
static (constructor) part of your module, for instance:

```js
// Model definition
let User = bookshelf.model('users', {
  tableName: 'users',
  // Sample relation
  organisation: function() {
    return this.belongsTo('organisations');
  },
  // WARNING: Overriding attributes here will result in spot()
  // not being able to parse a password for instance.
  // format: function(attributes) {
  //   if (attributes.password && attributes.method) attributes.method = 'login';
  //   return attributes;
  // }
}, {
  casts : {
    password: {
      format: (password) => encrypt(password),
      parse: (password) => decrypt(password)
    }
  },

  // Format can be overridden like this, inside the static part.
  format: function(attributes) {
    if (attributes.password && attributes.method) attributes.method = 'login';
    // Because of formatArrangement (also see parseArrangement)
    // the password will still be formatted (encrypted) if present.
    return this.formatArrangement(attributes);
  }
});
```

Leaving out `this.formatArrangement()` will nullify the workings of the 
`casts ` property, the `spot()` method will still use the overridden code.
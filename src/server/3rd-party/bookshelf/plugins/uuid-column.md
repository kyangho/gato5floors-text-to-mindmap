# bookshelf-uuid
Automatically generate UUIDs for your models

### Installation

All you need to do is add it as a bookshelf plugin and enable it on your models.

```js
let knex = require('knex')(require('./knexfile.js').development)
let bookshelf = require('bookshelf')(knex)

// Add the plugin
bookshelf.plugin(require('./uuid-column'))
```

Enable it on your models
```js
let User = bookshelf.Model.extend({ tableName: 'users', uuid: true })
```

or

```js
let User = bookshelf.Model.extend({ tableName: 'users', uuid: 'your_column' })
```

### Usage

Nothing fancy here, just keep using bookshelf as usual.

```js
// This user is indestructible
let user = yield User.forge({ email: 'foo@bar' }).save()
console.log(user.id) // 6b7a192f-6e1c-4dcb-8e57-14ab16d5fdf4
```

### Settings

This plugin generates UUIDs v4 by default, but you can easily switch to
v1 UUIDs or a custom generator.

```js
bookshelf.plugin(require('./uuid-column'), {
  version: 'v1' // Or your own function
})
```

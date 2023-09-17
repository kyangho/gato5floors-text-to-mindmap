const get = require('lodash/get');

module.exports = (bookshelf) => {
  bookshelf.Model = bookshelf.Model.extend(
    {
      format(attr) {
        return this.constructor.format(attr);
      },
      parse(attr) {
        return this.constructor.parse(attr);
      },
      spot(args) {
        return this.where(this.format(args));
      },
    },
    {
      casts: {},
      format(attr) {
        return this.formatArrangement(attr);
      },
      parse(attr) {
        return this.parseArrangement(attr);
      },
      formatArrangement(attr) {
        for (let key in attr) {
          if (typeof get(this.casts, [key, 'format']) == 'function') {
            attr[key] = this.casts[key].format(attr[key], attr);
          }
        }
        return attr;
      },
      parseArrangement(attr) {
        for (let key in attr) {
          if (typeof get(this.casts, [key, 'parse']) == 'function') {
            attr[key] = this.casts[key].parse(attr[key], attr);
          }
        }
        return attr;
      },
      spot(args) {
        return this.where(this.format(args));
      },
    }
  );
};

const mongoMiddleware = require('mongoose');

mongoMiddleware.plugin(schema => {
  schema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
  });
});
module.exports = mongoMiddleware;

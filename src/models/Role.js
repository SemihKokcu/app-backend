const mongoose = require('../middleware/MongoMiddlware');

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  descp: {
    type: String,
  },
  claims: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Claim',
  }],
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

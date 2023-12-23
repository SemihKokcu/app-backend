const mongoose = require('../middleware/mongoMiddlware');

const Schema = mongoose.Schema;

const claimSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  descp: {
    type: String,
  },
}, { timestamps: true });

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;

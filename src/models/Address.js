const mongoose = require('../middleware/mongoMiddlware');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  buildingNumber: {
    type: String,
  },
  doorNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: String,
  },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;

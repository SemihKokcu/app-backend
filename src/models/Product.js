const mongoose = require('../middleware/mongoMiddlware');


const Schema = mongoose.Schema;

const contentSchema = new Schema({
  name: { type: String, required: true },
  descp: { type: String, required: true },
  price: { type: Number, required: false },
  stock: { type: Number, required: false },
  isActive : { type: Boolean, required: true},
  imageUrls: { type: [String], required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'categories' },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
},{ timestamps: true });

const product = mongoose.model('Products', contentSchema);

module.exports = product;

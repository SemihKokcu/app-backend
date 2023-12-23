const mongoose = require('../middleware/mongoMiddlware');


const { Schema } = mongoose;

const contentSchema = new Schema({
  name: { type: String, required: true },
  products: { type: Schema.Types.ObjectId, ref: 'Product', required: false },
},{ timestamps: true });

const category = mongoose.model('Categories', contentSchema);

module.exports = category;

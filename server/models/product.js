const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  productCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
});

module.exports = mongoose.model('Product', schema);

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  type: String
});

module.exports = mongoose.model('ProductCategory', schema);

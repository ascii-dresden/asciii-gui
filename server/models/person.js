const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: [String],
  telephone: [String],
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Person', schema);

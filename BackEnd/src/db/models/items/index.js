const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  textFirst: String,
  textSecond: Number,
  date: Date
});

module.exports = Purchase = mongoose.model('purchases', purchaseSchema);
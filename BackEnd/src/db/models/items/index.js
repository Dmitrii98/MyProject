const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  textFirst: String,
  textSecond: Number,
  isEdit: Boolean,
  isEditFirst: Boolean,
  isEditSecond: Boolean,
  date: Date
});

module.exports = Purchase = mongoose.model('purchases', purchaseSchema);
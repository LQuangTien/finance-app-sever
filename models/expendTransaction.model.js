const mongoose = require("mongoose");

var spendingTransacionSchema = new mongoose.Schema({
  date: String,
  amount: Number,
  type: String,
  category: String
});
var SpendingTransaction = mongoose.model(
  "SpendingTransaction",
  spendingTransacionSchema
);
module.exports = SpendingTransaction;

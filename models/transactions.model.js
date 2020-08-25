const mongoose = require("mongoose");

var transacionSchema = new mongoose.Schema({
  date: String,
  amount: Number
});
var Transaction = mongoose.model("Transaction ", transacionSchema);
module.exports = Transaction;

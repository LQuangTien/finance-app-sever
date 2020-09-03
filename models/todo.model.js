const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const todoSchema = new mongoose.Schema({
  userId: Schema.Types.ObjectId,
  content: String,
  date: {
    type: String,
    default: moment().format("DD/MM/YYYY")
  }
});
const Todo = mongoose.model("Todo", todoSchema, "todos");
module.exports = Todo;

const mongoose = require("mongoose");

const Todo = require("../models/todo.model");
const Response = require("../helpers/response.helper");

module.exports.getTodo = async (req, res) => {
  const { userId } = req.tokenPayload;
  const todos = await Todo.find({ userId });
  if (!todos.length) {
    return Response.error(res, { message: "No todo data" });
  }
  return Response.success(res, { todos });
};
module.exports.postTodo = async (req, res) => {
  const { userId } = req.tokenPayload;
  const id = mongoose.Types.ObjectId(userId);
  const newTodo = new Todo({
    userId: id,
    ...req.body
  });
  await newTodo.save();
  return Response.success(res, { message: "Submit Complete" }, 202);
};
module.exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findOneAndDelete({ _id: id });
  return Response.success(res, { message: "Delete Complete" }, 202);
};
module.exports.patchTodo = async (req, res) => {
  const { _id, content } = req.body;
  await Todo.findOneAndUpdate({ _id }, { $set: { content } });
  return Response.success(res, { message: "Edit Complete" }, 202);
};

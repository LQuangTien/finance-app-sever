const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");

router.get("/", todoController.getTodo);
router.post("/", todoController.postTodo);
router.delete("/:id", todoController.deleteTodo);
router.patch("/", todoController.patchTodo);

module.exports = router;

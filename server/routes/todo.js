const express = require("express")

const TodoController = require("../controllers/todo")

const router = express.Router()

// Create
router.post("/todo", TodoController.createTodo)

// Read
router.get("/todos", TodoController.getTodos)

// Update
router.put("/todo/:id", TodoController.updateTodo)

// Delete
router.delete("/todo/:id", TodoController.deleteTodo)

module.exports = router

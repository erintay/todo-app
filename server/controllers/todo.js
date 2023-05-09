const Todo = require("../models/todo")
//mongoose todo update by id -"Find by id in Mongoose"
/**
 *
 * Mongoose API
 *
 * Create document - returns a promise
 * const document = await <model>.create({task: 'value'})
 *
 * Save document
 * <document>.save()
 *
 * { task: 'learn stuff' }
 * { task: "" }
 */
createTodo = async (req, res) => {
  console.log(req.query)
  const todo = await Todo.create(req.query)
  await todo.save()
  //does there need to be an error statement if the save fails?
  return res.status(200).json({ data: todo })
}

/**
 *
 * Mongoose API
 *
 * Get documents - returns a promise
 * const documents = await <model>.find({})
 *
 */

getTodos = async (req, res) => {
  const todos = await Todo.find({})
  if (!todos.length) {
    return res
      .status(500)
      .json({ success: false, error: "Could not find todos" })
  }
  return res.status(200).json({
    success: true,
    data: todos,
  })
}

/**
 *
 * Mongoose API
 *
 * Update document - returns a promise
 * const documents = await <model>.findOneAndUpdate({ _id: <id to update>}, {task: 'updated value'})
 *
 */
//
updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.query)
  // does the above need to do anything to seek out a specific id/task, or just call for a basic string?
  if (!todo.length) {
    return res
      .status(500)
      .json({ success: false, error: "Could not update todos" })
  }
}

/*
 *
 * Mongoose API
 *
 * Delete document - returns a promise
 * const documents = await <model>.findOneAndDelete({ _id: <id to update>})
 *
 */
deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id })

  return res.status(200).json({
    success: true,
    data: todo,
  })

  return res
    .status(500)
    .json({ success: false, error: "Could not delete todos" })
}

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
}

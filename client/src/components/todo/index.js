import React, { useState } from "react"

export const Todo = ({ todo, deleteTodo, updateTodo }) => {
  const [editMode, setEditMode] = useState(!todo)
  const [modifiedTask, setModifiedTask] = useState("")

  const { task, _id: taskId } = todo

  return (
    <div className="todo-item">
      <span className="todo-item-interact">
        <button onClick={() => deleteTodo({ taskId })}>X</button>
        <button
          onClick={() => {
            setModifiedTask(task)
            setEditMode(!editMode)
          }}
        >
          E
        </button>
      </span>
      <span>
        <h3>Task: </h3>
        {editMode ? (
          <>
            <input
              type="text"
              value={modifiedTask}
              onChange={(e) => setModifiedTask(e.target.value)}
            ></input>
            <button
              onClick={() => {
                updateTodo({ task: modifiedTask, taskId })
                setEditMode(false)
              }}
            >
              C
            </button>
          </>
        ) : (
          <p>{modifiedTask ? modifiedTask : task}</p>
        )}
      </span>
    </div>
  )
}

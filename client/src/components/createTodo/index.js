import React, { useState } from "react"

export const CreateTodo = ({ createTodo }) => {
  const [task, setTask] = useState("")

  return (
    <div className="todo-item">
      <span>
        <h3>Create task: </h3>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        ></input>
        <button
          onClick={() => {
            setTask("")
            createTodo({ task })
          }}
        >
          C
        </button>
      </span>
    </div>
  )
}

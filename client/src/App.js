import { useEffect, useState } from "react"
import "./App.css"
import { Todo } from "./components/todo"
import { useGetTodos } from "./hooks/useGetTodos"
import { CreateTodo } from "./components/createTodo"

function App() {
  const [todos, setTodos] = useState([])
  const { data, loading } = useGetTodos()

  useEffect(() => {
    if (data) {
      setTodos(data)
    }
  }, [data])

  const createTodo = async ({ task }) => {
    try {
      const resp = await fetch(`http://localhost:3000/api/todo?task=${task}`, {
        method: "POST",
      })

      const jsonData = await resp.json()

      if (!jsonData) {
        throw new Error("could not create data")
      }

      const newTodo = jsonData.data
      const newTodos = [...todos, newTodo]

      setTodos(newTodos)
    } catch (err) {
      console.error(err)
    }
  }

  const updateTodo = async ({ task, taskId }) => {
    try {
      const resp = await fetch(
        `http://localhost:3000/api/todo/${taskId}?task=${task}`,
        {
          method: "PUT",
        }
      )

      const jsonData = await resp.json()

      if (!jsonData) {
        throw new Error("could not update data")
      }

      const newTodos = [...todos]
      const todoIndex = newTodos.findIndex((todo) => todo._id === taskId)
      newTodos[todoIndex].task = task

      setTodos([...newTodos])
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTodo = async ({ taskId }) => {
    try {
      await fetch(`http://localhost:3000/api/todo/${taskId}`, {
        method: "DELETE",
      })
      const filteredTodos = todos.filter((todo) => todo._id !== taskId)
      setTodos(filteredTodos)
    } catch (err) {
      console.error(err)
    }
  }

  if (loading || !data)
    return (
      <section>
        <p>Loading...</p>
      </section>
    )

  return (
    <div className="App">
      <div>
        <section>
          {todos.map((todo, idx) => (
            <Todo
              key={idx}
              todo={todo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </section>
        <section>
          <CreateTodo createTodo={createTodo} />
        </section>
      </div>
    </div>
  )
}

export default App

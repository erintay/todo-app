import { useEffect, useState } from "react"

export const useGetTodos = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("http://localhost:3000/api/todos", {
        "Content-Type": "application/json",
        Accept: "application/json",
      })

      const jsonData = await resp.json()

      setData(jsonData.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  return {
    data,
    loading,
  }
}

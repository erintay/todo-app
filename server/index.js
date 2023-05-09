const express = require("express")
const cors = require("cors")

require("dotenv").config({ path: "./config.env" })

const db = require("./db")
const todoRouter = require("./routes/todo")

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.use("/api", todoRouter)

app.get("/", (req, res) => {
  res.send("To use the API, try GET /api/todos")
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

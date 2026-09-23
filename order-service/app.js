const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "ecommerce"
})

// Get all orders
app.get(["/orders", "/api/orders"], (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) throw err

    res.json(result)
  })
})

// Create an order
app.post(["/orders", "/api/orders"], (req, res) => {
  const { product_id, quantity } = req.body

  db.query(
    "INSERT INTO orders(product_id,quantity,status) VALUES (?,?,?)",
    [product_id, quantity, "CREATED"],
    (err) => {
      if (err) throw err

      res.json({ message: "order created" })
    }
  )
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

app.listen(5001, () => console.log("order service running"))
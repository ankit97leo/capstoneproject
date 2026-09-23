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

// Get all products
app.get(["/products", "/api/products"], (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) throw err

    res.json(result)
  })
})

// Create a product
app.post(["/products", "/api/products"], (req, res) => {
  const { name, price, stock } = req.body

  db.query(
    "INSERT INTO products(name,price,stock) VALUES (?,?,?)",
    [name, price, stock],
    (err) => {
      if (err) throw err

      res.json({ message: "product created" })
    }
  )
})

// Delete a product
app.delete(["/products/:id", "/api/products/:id"], (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) throw err

      res.json({ message: "deleted" })
    }
  )
})

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})

// Start server
app.listen(5000, () => {
  console.log("product service running")
})
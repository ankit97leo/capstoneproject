
const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "ecommerce"
})

app.get("/inventory",(req,res)=>{
 db.query("SELECT * FROM inventory",(err,result)=>{
   if(err) throw err
   res.json(result)
 })
})

app.put("/inventory/:productId",(req,res)=>{
 const {stock}=req.body
 const productId=req.params.productId

 db.query("UPDATE inventory SET stock=? WHERE product_id=?",
 [stock,productId],(err)=>{
   if(err) throw err
   res.json({message:"stock updated"})
 })
})

app.listen(5002,()=>console.log("inventory service running"))

const ConnectToMongo = require("./db")
 const express = require("express")
 const app = express()
 const PORT = 4000

 const router = require ("./routes/auth")
 const route = require("./routes/notes")

 //connection
 ConnectToMongo()

 //Middlewear
 app.use (express.json())
 app.use(express.urlencoded({extended:false}))
  

  app.use("/api",router)
  app.use("/api/notes",route)

 app.listen(PORT,()=>{
    console.log(`iNotebook listen on ${PORT}`)
 })
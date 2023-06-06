const express  = require("express")
const {connection} = require("./config/db")
require("dotenv").config()

const {userRouter} = require("./router/user.route")
const { postRotuer } = require("./router/post.route")

const app=express()
app.use(express.json())   //json parsar

//user router
app.use("/" , userRouter)
//post router
app.use("/" , postRotuer)


app.get("/", (req,res)=>{
    res.send("welcome")
})


app.listen(`${process.env.port}` , async()=>{
    try {
        
        await connection
        console.log("Database is connected")
    } catch (error) {
      console.log(error)  
    }

    console.log(`${process.env.port} port is working`)
})
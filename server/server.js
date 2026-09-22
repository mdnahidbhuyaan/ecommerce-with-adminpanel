
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require("./routes/auth/auth-routes")
// create a database connection
// create a separate file for this and then import that file here

mongoose.connect("mongodb+srv://ecommerce-with-adminpanel:ecommerce-with-adminpanel@cluster0.75lrr6c.mongodb.net/ecommerce-with-adminpanel")
.then(()=>
    console.log("mongoDB Connected"))
.catch((err)=>
    console.log(err))

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({
        origin:"http://localhost:5173/",
        methods:["GET","POST","DELETE","PUT"],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials:true
    })
)

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRouter)

app.listen(PORT , ()=> 
console.log(`Server running successfully ${PORT}`)
)
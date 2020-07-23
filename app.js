require('dotenv').config()
const createDB = require("./config/db");
require('colors')
const express = require('express')
const morgan = require("morgan");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//db connection
createDB()

const app = express()

//Route files
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");

//morgan
app.use(morgan('dev'))

//middlewares
app.use(express.json())
app.use(cookieParser())

//Route middlewares
app.use('/api/v1', authRoute)
app.use("/api/v1/category", categoryRoute);


const port = process.env.PORT || 8000


app.listen(port,(req,res)=>{
    console.log(`server is listening at port ${port}`.yellow.bold)
})
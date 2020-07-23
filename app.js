require('dotenv').config()
require('colors')
const express = require('express')
const morgan = require("morgan");
const createDB = require('./config/db')
const bodyParser = require('body-parser')

//db connection
createDB()

const app = express()

//Route files
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category")

//morgan
app.use(morgan('dev'))

//middlewares
app.use(express.json())

//Route middlewares
app.use('/api/v1', authRoute)
app.use("/api/v1", categoryRoute);


const port = process.env.PORT || 8000


app.listen(port,(req,res)=>{
    console.log(`server is listening at port ${port}`.yellow.bold)
})
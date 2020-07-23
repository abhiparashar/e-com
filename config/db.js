const mongoose = require("mongoose");

const createDB = async()=>{
    const conn = await mongoose.connect("mongodb://localhost/ecom",{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    console.log(`MongoDB connected:${conn.connection.host}`.cyan.underline.bold)
}

module.exports = createDB
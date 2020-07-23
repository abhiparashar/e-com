const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add your name'],
    },
    email:{
        type:String,
        required:[true,'Please add valid email'],
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ]
    },
    password:{
        type:String,
        required:[true,'Please add your passwords'],
        minlength:6,
        select:false
    },
    resetPasswordToken: String,
    resetPaswordExpire: Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User', userSchema)
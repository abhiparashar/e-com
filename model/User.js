const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

//Encrypt the password
userSchema.pre('save',async function(){
    const hash = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,hash)
})

//create JWT 
userSchema.methods.getSignedJwttoken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
}

module.exports = mongoose.model('User', userSchema)
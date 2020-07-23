const User = require('../model/User')

exports.Signup = async(req,res,next)=>{
    try {
        const{name,email,password} = req.body
        const user = await User.create({ name, email, password });

        tokenResponseSend(user,200,res);
    } catch (error) {
        res.send(error);
    }
}

exports.Signin = async(req,res,next)=>{
    try{
        const{email,password} = req.body

        if(!password || !email){
             return res.status(400).json({
                success:false,
            })
        }

        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.send('user not found')
        }

        const isMatch = user.matchPassword(password)
        if (!isMatch){
        return res.send('password does not match')
        }

        tokenResponseSend(user, 200, res);
    }catch(err){
        return res.send(400).json({success:false})
    }
}

//create token and cookie 
const tokenResponseSend = (user,statusCode,res)=>{
    
    const token =  user.getSignedJwttoken()

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRE_COOKIE * 24 * 60 * 60 * 1000
      ),
      httpOnly:true
    };

    res.status(statusCode).cookie("token", token, options).json({
        success:true,
        token
    })
}
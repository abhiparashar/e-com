const User = require('../model/User')

exports.Signup = async(req,res,next)=>{
    try{
        const user = await User.create(req.body)
        res.status(200).json({
            success:true,
            data:user
        })
    }catch(err){
        res.send(err)
    }
}

exports.Signin = async(req,res,next)=>{
    try{
        const user = await User.find(req.body);
        if(!password || !email){
            return res.status(400).json({
                success:false,
            })
        }

        if(!user){
            return res.send('user not found')
        }

        res.status(200).json({
            success:true,
            data:user
        })
    }catch(err){
        res.send(400).json({success:false})
    }
}

exports.updateUser = async(req,res,next)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id);
        if (!user) {
          res.status(400).json({
            success: false,
          });
        }
        res.status(200).json({
          success: true,
          data: user,
        });
    }catch(err){
        res.status(400).json({
            success:false
        })
    }
}

exports.deleteUser = async(req,res,next)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
          res.status(400).json({
            success: false,
          });
        }
        
        res.status(200).json({
          success: true,
          data: {},
        });
    }catch(err){
        res.status(400).json({
            success:false
        })
    }
}

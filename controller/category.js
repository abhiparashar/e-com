const Category = require('../model/Catgory')

exports.createCategory = async(req,res)=>{
    try{
    let category = await Category.find(req.body)
    //if category already exists
    if(category){
        res.status(401).json({
            success:false,
            message:"category already exists"
        })
    }
    //create the category and save in the database
    category = await Category.create(req.body)
    res.status(200).json({
        success:true,
        data:category
    })
    }catch(err){
       res.send(err)
    }
}

//Get all the categories
exports.getAllCategories = async(req,res,next)=>{
    try {
     const categories = await Category.find();
     res.status(200).json({
         success:true,
         data:categories
     })
    } catch (err) {
        res.send(err)
    }
}

//Get a category
exports.getCategory = async(req,res,next)=>{
    try{
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(400).json({
            success:false,
            message:`category with this id ${req.params.id} does not exist`
        })
    }
    res.status(200).json({
        success:true,
        data:category
    })
    }catch(err){
        res.send(err)
    }
}
    
//update a Category
exports.updateCategory = async(req,res,next)=>{
    try{
    const category = await Category.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    if(!category){
        res.status(400).json({
            success:false,
            message:`category with this id ${req.params.id} does not exist`
        })
    }
    res.status(200).json({
        success:true,
        data:category
    })
    }catch(err){
        res.send(err)
    }
}

//Delete a Category
exports.deleteCategory = async(req,res,next)=>{
    try{
    const category = await Category.findByIdAndDelete(req.params.id)
        if(!category){
        res.status(400).json({
            success:false,
            message:`user with this id ${req.params.id} does not exist.`
        })
    }
    res.status(200).json({
        success:true
    })
    }catch(err){
        res.send(err)
    }
}
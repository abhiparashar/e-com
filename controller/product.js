const Product = require('../model/Product')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.createProduct = (req,res,next)=>{
    let form = formidable.IncomingForm()
    form.keepExnsions = true
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(200).json({
                error:"Image could not be found"
            })
        }

        //check for fileds
        const{name,description,price,category,quantity,shipping} = fields
        if(!name||!description||!price||!category||!quantity||!shipping){
            return res.status(400).json({
                error:"all fields are requireds"
            })
        }

        let product = new Product(fields)
        if(files.photo){
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
    })
}


const db = require('../models');
const Product = db.product;


exports.getAllProducts = (req,res)=>{
    let sq;
    if(req.query.sortby){
        sq = req.query.sortby;
        sq=req.query.order=='asc'?sq:`-${sq}`;
    }else{
        sq = "-createdOn";
    }
    Product.find().sort(sq).exec((err,products)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.send({
            message:"Products retrieved Successfully",
            data:products
        })
    })
}

exports.saveNewProduct = (req,res)=>{
    let data = req.body;
    let product = new Product();
    for(let p in data){
        product[p] = data[p];
    }
    product.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(201).send({
            message:"Products created Successfully",
            data:response
        })
    })
}

exports.updateProduct =  (req,res)=>{
    let data = req.body;
    Product.updateOne({_id:data.id},data,(err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(201).send({
            message:"Products Updated Successfully",
            data:response
        })
    });
}

exports.deleteProduct =  (req,res)=>{
    Product.deleteOne({_id:req.params.pid},(err,response)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(201).send({
            message:"Products Deleted Successfully",
            data:response
        })
    })
}

exports.getProductById = (req,res)=>{
    Product.findOne({_id:req.params.pid},(err,product)=>{
        if(err){
            return res.status(500).send({message:err});
        }
        res.status(200).send({
            data:product
        })
    })
}
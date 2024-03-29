const mongoose = require("mongoose");

const Product = mongoose.model(
    'Product',
    new mongoose.Schema({
        type: String,
        company: String,
        size: Number,
        price: Number,
        model: String,
        color: String,
        isActive:{
            type:Boolean,
            default:true
        },
        createdOn: {
            type: Date,
            default: Date.now
        }
    })
)

module.exports = Product;
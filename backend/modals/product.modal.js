const mongoose = require("mongoose");

const variantSchema = new mongoose.schema({
    size:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Size"
    }],
    color:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Color"
    },
    image:{
        type:[String],
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    stock:{
        type:Number,
        default:0
    }
})

const productSchema = new mongoose.schema({
    name: {
        type: String,
        require: true
    },
    descripation: {
        type: String,
        require: true
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    for:{
        type:[String],
        enum:['unisex', 'men', 'women', 'kids'],
        default:"unisex"
    },
    varaint:{
        type:[variantSchema],
        require:true
    }
});

const productModal=mongoose.model("Product",productSchema); 
module.exports={productModal};
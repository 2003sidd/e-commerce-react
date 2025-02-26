const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
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
    // stock:{
    //     type:Number,
    //     default:0
    // }
})

const productSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Unisex'],
        required: true
      },
    varaint:{
        type:[variantSchema],
        require:true
    }
});

const productModal=mongoose.model("Product",productSchema); 
module.exports={productModal};
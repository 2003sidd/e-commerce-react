const mongoose = require("mongoose");
const variantSchema = require("./Product-vareient-modal");


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
},{
    timestamps:true
});

const productModal=mongoose.model("Product",productSchema); 
module.exports={productModal};
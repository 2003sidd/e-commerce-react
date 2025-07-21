const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
    size: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size"
    }],
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color"
    },
    image: {
        type: [String],
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    // stock:{
    //     type:Number,
    //     default:0
    // }
},{
    timestamps:true
});

module.exports = variantSchema; 
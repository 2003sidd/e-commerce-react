const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productVarientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Varient",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quantity:{
        required:true,
        type:number
    }
},{timestamps:true});

const CartModal = mongoose.model("Cart", cartSchema);

module.exports = CartModal;
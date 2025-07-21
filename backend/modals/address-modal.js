const mongoose=require("mongoose");

const addressSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:2
    },
    number:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
                ref: "User"
    }
});

const addressModal= mongoose.model("Address",addressSchema);

module.exports=addressModal;
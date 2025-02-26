const mongoose=require("mongoose");

const brandSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:2
    },
    image:{
        type:String,
        required:true,
    }
});

const brandModal= mongoose.model("Brand",brandSchema);

module.exports=brandModal;
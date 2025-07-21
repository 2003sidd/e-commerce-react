const mongoose=require("mongoose");

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:2
    },
    image:{
        type:String,
        required:true
    }
});

const categoryModal= mongoose.model("Category",categorySchema);

module.exports=categoryModal;
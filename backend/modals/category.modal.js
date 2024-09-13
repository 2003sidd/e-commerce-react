const mongoose=require("mongoose");

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        minLength:2
    },
    image:{
        type:String,
        require:true,
    }
});

const categoryModal= mongoose.model("Category",categorySchema);

module.exports=categoryModal;
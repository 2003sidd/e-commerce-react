const mongoose=require("mongoose");

const colorSchema= new mongoose.Schema({
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
const colorModal= mongoose.model("Color",colorSchema);
module.exports={colorModal};
const mongoose=require("mongoose");

const colorSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
});
const colorModal= mongoose.modal("Color",colorSchema);
module.exports+{colorModal};
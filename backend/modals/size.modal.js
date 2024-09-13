const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
    size:{
        type:Number,
        require:true
    }
});

const sizeModal= mongoose.model("Size",sizeSchema);
module.exports= {sizeModal};
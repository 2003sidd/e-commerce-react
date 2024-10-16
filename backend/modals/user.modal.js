const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    number: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    password: {
        type: String,
        required: true  // Correct spelling here
    }, 
    address:{
        type:[String],
        default: null
    }
}, { timestamps: true });


let userModal = mongoose.model("User", userSchema);
module.exports = { userModal }; 
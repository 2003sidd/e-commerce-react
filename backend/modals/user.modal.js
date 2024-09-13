const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }, 
    address:{
        type:[String]
    }
}, { timestamps: true });


let userModal = mongoose.model("User", userSchema);
module.exports = { userModal }; 
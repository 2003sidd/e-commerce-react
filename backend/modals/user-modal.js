const mongoose = require("mongoose");
const bycrpt = require("bcrypt");
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
    address: {
        type: [String],
        default: null
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true });




userSchema.pre('save', async function (next) {
    console.log("password is", this.password)
    this.password = await bycrpt.hash(this.password, 10);

    next();

});


userSchema.methods.comparePassword = async function (password) {
    return await this.bycrpt.compare(password, this.password);
}

userSchema.method.genrateToken = async function (params) {


}

let userModal = mongoose.model("User", userSchema);
module.exports = { userModal }; 
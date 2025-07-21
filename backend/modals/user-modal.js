const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Corrected library name

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  
  refreshToken: {
    type: String,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  // Hash the password only if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10); // Use a cost factor of at least 10
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error); // Pass the error to the error handler
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Error comparing password:", error);
    return false; // Return false on error to avoid potential leaks
  }
};


let userModal = mongoose.model("User", userSchema);
module.exports = { userModal }; 
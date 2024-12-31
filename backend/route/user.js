const express= require("express");
const { signUpUserHandler, loginUserHandler, updateUser, refreshToken } = require("../controller/user");

const router= express.Router();

//for signup user
router.route("/signup").post(signUpUserHandler);

// for loggin user
router.route("/login").post(loginUserHandler);

router.route("/refreshToken").post(refreshToken);

router.route('/').get(updateUser);



module.exports=router;
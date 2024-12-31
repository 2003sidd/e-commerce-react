const { userModal } = require("../modals/user-modal");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ApiResponse } = require("../utils/ApiResponse");
const { SERVER_ERROR_CODE, INTERNAL_SERVER_ERROR } = require("../utils/constant");
const { generateToken,generateRefreshToken } = require("../utils/jwt")
const bcrypt = require("bcrypt")

dotenv.config();

const signUpUserHandler = async (req, res) => {
    try {
        const { name, email, password, number, address } = req.body;

        const user = new userModal({ name, email, password, number, address: address || null })

        user.save()
            .then((savedUser) => {
                // genrate fcm token
                const accessToken = generateToken(savedUser);

                res.json(new ApiResponse(201, { accessToken, savedUser }, 'Registration successful!'));
            })
            .catch((error) => {
                res.json(new ApiResponse(400, error.message, 'Registration failed!'));
            });
    } catch {
        res.json(new ApiResponse(SERVER_ERROR_CODE, null, INTERNAL_SERVER_ERROR));
    }
};

const loginUserHandler = async (req, res) => {
    try {
        // get the username and password 
        const { name, password } = req.body;

        const user = await userModal.findOne({ name });

        if (user) {
            // console.log(userModal.fullName())
            // const isTrue = await userModal.comparePassword(password);
            const isTrue = await bcrypt.compare(password, user.password);
            if (!isTrue) {
                res.json(new ApiResponse(200, "Password incorrect", "login successfully"));
                return
            }
            console.log("it works ",user)
            // genrate fcm token
            const accessToken = generateToken(user.toObject());
            const refreshToken = generateRefreshToken(user.toObject());
            if (accessToken && refreshToken) {
                user.refreshToken=refreshToken;
                await user.save({ validateBeforeSave: false });
                res.json(new ApiResponse(200, {accessToken,refreshToken}, "login successfully"));
            } else {
                res.json(new ApiResponse(SERVER_ERROR_CODE, null, INTERNAL_SERVER_ERROR));
            }
        } else {
            res.json(new ApiResponse(400, null, "user not found!"));
        }
    } catch (error) {
        console.log("error", error)
        res.json(new ApiResponse(SERVER_ERROR_CODE, error, INTERNAL_SERVER_ERROR));
    }
};



const refreshToken = async (req, res) => {
    try {
        // get the username and password 
        const   refreshToken  = req.body.refreshToken;
console.log("refresh token",req.body )
console.log("refresh token is",refreshToken )

        if (!refreshToken) return res.json(new ApiResponse(400, null, "Refresh token not fount"));


        // Verify the JWT token
        const refToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await userModal.findById(refToken?._id);
        if(!user) return res.json(new ApiResponse(400, null, "invalid refresh token"))

            if(user.refreshToken===refreshToken){
                const jwt = await generateToken(user.toObject());

               return res.json(new ApiResponse(400, {jwt}, "invalid refresh token"))
            }else{
             return res.json(new ApiResponse(400, null, "invalid refresh token"))
            }

        // Attach user information to the request object
        
    } catch (error) {
        console.log("error", error)
        res.json(new ApiResponse(SERVER_ERROR_CODE, error, INTERNAL_SERVER_ERROR));
    }
};


const updateUser = async (req, res) => {
    const _id = "6692888681a7a272202f3245";

    res.end("it also works well");
};

module.exports = { signUpUserHandler, loginUserHandler, updateUser, refreshToken };

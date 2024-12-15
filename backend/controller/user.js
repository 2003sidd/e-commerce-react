const { userModal } = require("../modals/user-modal");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ApiResponse } = require("../utils/ApiResponse");
const { SERVER_ERROR_CODE, INTERNAL_SERVER_ERROR } = require("../utils/constant");

dotenv.config();

const signUpUserHandler = async (req, res) => {
    try {
        const { name, email, password, number, address } = req.body;

        const user = new userModal({ name, email, password, number, address: address || null })

        user.save()
            .then((savedUser) => {
                const accessToken = getFcmToken(savedUser);
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
        console.log("user is", user)
        
        if (user) {
            const isTrue = await userModal.comparePassword(password);
            if(!isTrue){
                res.json(new ApiResponse(200, "Password incorrect", "login successfully"));
                return 
            }
            
            const accessToken = getFcmToken(user);
            if(acessToken){
                res.json(new ApiResponse(200, accessToken, "login successfully"));
            }else{
                res.json(new ApiResponse(SERVER_ERROR_CODE, null, INTERNAL_SERVER_ERROR));
            }
        } else {
            res.json(new ApiResponse(400, null, "user not found!"));
        }
    } catch (error) {
        console.log("error",error)
        res.json(new ApiResponse(SERVER_ERROR_CODE, error, INTERNAL_SERVER_ERROR));
    }
};

const getFcmToken = (user) => {
    return jwt.sign({ name: user.name, age:user.age, email:user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}


const updateUser = async (req, res) => {
    const _id = "6692888681a7a272202f3245";

    res.end("it also works well");
};

module.exports = { signUpUserHandler, loginUserHandler, updateUser };

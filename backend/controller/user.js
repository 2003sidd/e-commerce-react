const { userModal } = require("../modals/user-modal");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { ApiResponse } = require("../utils/ApiResponse");
const { SERVER_ERROR_CODE, INTERNAL_SERVER_ERROR } = require("../utils/constant");
const { generateToken, generateRefreshToken } = require("../utils/jwt")
const bcrypt = require("bcrypt");
const { ApiError } = require("../utils/ApiError");

dotenv.config();

const signUpUserHandler = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password, number } = req.body;

        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return res.status(400).json({ error: 'Name is required and must be at least 2 characters.' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Valid email is required.' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }

            const numberRegex = /^[0-9]{10}$/; // Example: for 10-digit phone numbers
            if (!number || !numberRegex.test(number)) {
                return res.status(400).json({ error: 'A valid 10-digit phone number is required.' });
            }

        const user = new userModal({ name, email, password, number })

        user.save()
            .then((savedUser) => {
                // genrate fcm token
                console.log("saved user", savedUser)
                const accessToken = generateToken(savedUser);
                const user = { ...savedUser.toObject() }; // Convert to plain object
                delete user.password;

                res.json(new ApiResponse(201, { accessToken, user }, 'Registration successful!'));
            })
            .catch((error) => {
                console.log("Error at signup", error)
                res.json(new ApiResponse(400, error.message, 'Registration failed!'));
            });
    } catch (error) {
        console.log("Error at signup", error)

        res.json(new ApiResponse(SERVER_ERROR_CODE, null, INTERNAL_SERVER_ERROR));
    }
};

const loginUserHandler = async (req, res) => {
    try {
        // get the username and password 
        const { email, password } = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: 'Valid email is required.' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }

        const user = await userModal.findOne({ email });

        if (user) {
            // console.log(userModal.fullName())
            // const isTrue = await userModal.comparePassword(password);
            const isTrue = await bcrypt.compare(password, user.password);
            if (!isTrue) {
                res.json(new ApiResponse(200, "Password incorrect", "login successfully"));
                return
            }
            console.log("it works ", user)
            // genrate fcm token
            const accessToken = generateToken(user.toObject());
            const refreshToken = generateRefreshToken(user.toObject());
            if (accessToken && refreshToken) {
                user.refreshToken = refreshToken;
                await user.save({ validateBeforeSave: false });
                res.json(new ApiResponse(200, { accessToken, refreshToken }, "login successfully"));
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
        const refreshToken = req.body.refreshToken;
        console.log("refresh token", req.body)
        console.log("refresh token is", refreshToken)

        if (!refreshToken) return res.json(new ApiResponse(400, null, "Refresh token not fount"));


        // Verify the JWT token
        const refToken = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const user = await userModal.findById(refToken?._id);
        if (!user) return res.json(new ApiResponse(400, null, "invalid refresh token"))

        if (user.refreshToken === refreshToken) {
            const jwt = await generateToken(user.toObject());

            return res.json(new ApiResponse(400, { jwt }, "invalid refresh token"))
        } else {
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


const getAllCustomer = async (req, res) => {
    try {
        const { top, index, searchBy, isPagination } = req.body;

        if (typeof isPagination === "undefined" || !isPagination) {
            const data = await userModal.find();
            const count = await userModal.countDocuments();
            return res.json(new ApiResponse(200, { data, count }, "User found"));
        }

        if (typeof top === "undefined" || typeof index === "undefined") {
            return res.json(new ApiResponse(200, null, "Index and top are required"));
        }

        let skip = top * (index - 1);
        let data, count;
        if (!searchBy || searchBy.trim() === "") {
            data = await productModal.find();
            count = await productModal.countDocuments();
        } else {

            data = await productModal.aggregate([
                { $match: { name: { $regex: searchBy, $options: 'i' } } },
                { $skip: skip },
                { $limit: top }
            ]);
            count = await productModal.countDocuments();
        }

    } catch (error) {
        console.log("Error", error);
        return res.json(new ApiError(500, INTERNAL_SERVER_ERROR, null))
    }

    const getUserById = async (req, res) => {
        try {
            const { id } = req.params;

            const data = await userModal.findById(id);
            if (data) {
                return res.json(new ApiResponse(200, data, "User found"));
            }

            return res.json(new ApiResponse(200, null, "User not found"));


        } catch (error) {
            console.log("Error", error);
            return res.json(new ApiError(500, INTERNAL_SERVER_ERROR, null))
        }
    }

    const updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const userData = req.body;
            const data = await userModal.findByIdAndUpdate(userData.id, userData, { new: true, runValidators: true });

            if (data) {
                return res.json(new ApiResponse(201, data, "User updated"));
            };

            return res.json(new ApiResponse(200, null, "User not found"))

        } catch (error) {
            console.log("Error", error);
            return res.json(new ApiError(500, INTERNAL_SERVER_ERROR, null))
        }
    }
}
module.exports = { signUpUserHandler, loginUserHandler, updateUser, refreshToken, getAllCustomer };

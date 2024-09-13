const { userModal } = require("../modals/user.modal");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const signUpUserHandler = async (req, res) => {
    const { name, email, password, number } = req.body;

    const user = await userModal.create({
        name, email, number, password
    });

    res.end(JSON.stringify(req.body));
};
const loginUserHandler = async (req, res) => {
    const { name, password } = req.body;
    if (typeof name == "undefined" || name.trim() === "") {
        res.json({
            status: 400,
            message: "provide name",
            data: null
        })
        return;
    }

    if (typeof password == "undefined" || password.trim() === "") {
        res.json({
            status: 400,
            message: "provide password",
            data: null
        })
        return;
    }
    const user = await userModal.findOne({ name, password });
    if (user) {
        const accessToken = jwt.sign({ name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
        // console.log("user is", user);
        // res.end(JSON.stringify(user));
    } else {
        console.log("user is", user);
        res.end(JSON.stringify("user not found!"));
    }
};


const updateUser = async (req, res) => {
    const _id = "6692888681a7a272202f3245";
    // const data =await userModal.findOneAndDelete({ password:"Dev@2003"});

    console.log("data is", data);
    res.end("it also works well");
};

module.exports = { signUpUserHandler, loginUserHandler, updateUser };

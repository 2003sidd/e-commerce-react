const jwt = require("jsonwebtoken");

let secretKey ="Sidd@2003";
const signIn=(user)=>{
    jwt.sign(user,secretKey);
};

odule.exports={signIn};
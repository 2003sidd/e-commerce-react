const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    try{
    // first check request headers has authorization or not
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized' });

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded
        next();
    }catch(err){
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            return res.status(500).json({ message: 'Server error' });
        }
    }
}


// Function to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 120});
}

const generateRefreshToken = (userData) => {
    // Generate a new JWT token using user data
    console.log("user",userData)
    return jwt.sign(userData, process.env.REFRESH_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken,generateRefreshToken};
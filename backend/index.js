const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const router = require("./route/route");
const authRouter = require('./route/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {upload} = require("./utils/multer")
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (token == null) return res.sendStatus(401); // No token provided

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // Token has expired
                return res.status(401).json({ message: 'Token has expired' });
            } else {
                // Other errors (invalid token, etc.)
                return res.status(403).json({ message: 'Invalid token' });
            }
        }
        
        req.user = user; // Add user to request object
        next(); // Proceed to the next middleware or route handler
    });
};


// Routes
app.use("/route/api", router);
app.use("/route/users", authRouter);



// Database connection
const url = "mongodb://127.0.0.1:27017/shoeBackend";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err.message);
    });

// Basic endpoint
app.get("/", async (req, resp) => {
    console.log("API hit");
    resp.send("Home works");
});

app.post("/upload",upload.single("uploaded_file"),(req,res)=>{
    console.log('body ',req.body);
    console.log("file",req.file);
    res.end("end");
})



// Server listening
const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

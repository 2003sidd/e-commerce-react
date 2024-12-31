const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./route/route");
const authRouter = require('./route/user');
const dotenv = require('dotenv');
const swaggerJSD =require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
// Database connection
const db = require("./utils/db");
// const swaggerJSDoc = require("swagger-jsdoc");

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());


const swaggerOption={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Sample api with swagger",
            version:"1.0.0",
            descripation:"A sample api to learn swagger"
        },
        servers:[{
            url:"http://localhost:8800"
        }],
    },
    apis:["./route/*.js"]
}

const swaggerSpec = swaggerJSD(swaggerOption);


app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
// Routes
app.use("/route/api", router);
app.use("/route/users", authRouter);


// Basic endpoint
app.get("/", async (req, resp) => {
    console.log("API hit");
    resp.send("Home works");
});

// Server listening
const PORT = 8800;
app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
});

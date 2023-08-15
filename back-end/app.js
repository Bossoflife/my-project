// importing the dependency into the app file
const express = require("express");
const ErrorHandler = require("./middleware/Error"); 
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

// using the app the dependencise inside the app file to be exported into the server file
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static("uploads"))
app.use(bodyParser.urlencoded({extended: true, limit:"50mb"}));
// const fileupload = (fileUpload({useTempFiles: true}));



// this is for ErrorHandler
app.use(ErrorHandler);


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "back-end/config/.env",
  });
}   

// importing the routes
const user = require("./controller/user");
// const fileUpload = require("express-fileupload");

app.use("/api/v2/user", user);


// export the app to be used outside this file 
module.exports = app;

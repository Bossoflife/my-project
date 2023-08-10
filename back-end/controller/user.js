const express = require("express");
const path = require("path");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError")
const router = express.Router();
const User = require("../model/user.js");
const { upload } = require("../multer");
const cloudinary = require("../index/cloudinaryConfig");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken")


router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      const error = new ErrorHandler("User already exists", 400);
      return next(error);
    }

    const fileBuffer = req.file.buffer;

    let = imageUrl, publicId;
    try {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary Upload Error:", error);
              const cloudinaryError = new ErrorHandler("Error uploading to Cloudinary", 500);
              return reject(cloudinaryError);
            }

            console.log("Cloudinary Upload Result:", result);
            resolve(result);
          }
        ).end(fileBuffer);
      });

      imageUrl = result.secure_url; // Get the URL from Cloudinary result
      publicId = result.public_id;

      // Continue with user creation and saving
      const user = new User({
        name: name,
        email: email,
        password: password,
        avatar: {
          url: imageUrl,
          public_id: publicId,
        },
      });

      try {
        const newUser = await user.save();
        res.status(201).json({
          success: true,
          message: "File uploaded successfully",
          newUser,
          imageUrl,
          publicId,
        });

        const activationToken = createActivationToken(newUser);
       

        // Do something with the activation token, e.g., send it to the user's email
      } catch (error) {
        console.error("Database Save Error: ", error);
        const saveError = new ErrorHandler("Error saving user to database", 500);
        return next(saveError);
      } 
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      const cloudinaryError = new ErrorHandler("Error uploading to Cloudinary", 500);
      return next(cloudinaryError);
    }
  } catch (error) {
    console.error("User Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating user",
      // Other error data
    });
  }
});



const createActivationToken = (user) => {
  // Create and return the activation token (not shown in the code you provided)
  return jwt.sign(user, process.env.ACTIVATION_SECRET,{
    expiresion: "5m"
  });
};

//activate user 
router.post("/activation", catchAsyncError(async(req,res,next) =>{
  try{
   const {activation_Token } = req.body;
   
   const newUser = jwt.verify(activation_Token, process.env.ACTIVATION_SECRET)
   
   if(!newUser){
    return next(new ErrorHandler("Invalid token", 400));
   }
   const {name, email, password, avatar} = newUser;

   User.create({
    name,
    email,
    avatar,
    password
   });

   sendToken(newUser, 201,res);
  }catch(err){

  }
}))
module.exports = router;

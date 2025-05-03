import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { body, query, validationResult } from "express-validator";




// **
// Register
// **
const register = async (req, res) => {

        await Promise.all([
            body('name')
             .isString().withMessage('Username must be a string')
             .isLength({ min: 4 }).withMessage('name too short')
             .run(req),
            body('email')
             .isEmail().withMessage('Invalid email address')
             .run(req),
            body('password')
             .isLength({ min: 6, max: 30 }).withMessage('Password length must be between 6 and 30 characters')
             .run(req),
          ]);
    
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({
              success: false,
              message: 'Validation failed',
              errors: errors.array().map(err => ({
                [err.path]: err.msg
              }))
            });
          }

        // Validation...
        const existingUser = await User.findOne({ email:req.body.email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }

        //Entry
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
     
        const newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password: hashedPassword,
            token:null,
            role: 'student',
            permission: "",
            date: new Date()
        });

        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            data:{
                "_id": newUser._id,
                "name": newUser.name,
                "email": newUser.email,    
            }
        });
};





// **
// Login
// **
const login = async (req, res) => {
    
        await Promise.all([
            body('email')
            .isEmail().withMessage('Invalid email address')
            .run(req),
            body('password')
            .isLength({ min: 6, max: 30 }).withMessage('Password length must be between 6 and 30 characters')
            .run(req),
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                [err.path]: err.msg
            }))
            });
        }

        const user = await User.findOne({ email:req.body.email}).select('+password');
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        let token = Math.random().toString(36).slice(2);
        const updatedUser = await User.findByIdAndUpdate(user._id,{token:token},{ new: true })

        return res.status(200).json({
            success: true,
            message: "Logged In",
            data:{
                name:updatedUser.name,
                email:updatedUser.email,
                token:updatedUser.token,
            }
        });

};



// **
// Logout
// **
 const logout = async (req, res) => {

            const user = await User.findOne({ token: req.params.token });
            if(!user){
                return res.status(500).json({
                    success: false,
                    message: "Failed to logout"
                })
            }

            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { token:null },
                { new: true }
              );

        
            return res.status(200).json({
                message: "Logged out successfully.",
                success: true
            });


}



// **
// getUserProfile
// **
 const getUserProfile = async (req, res) => {
        
    
        const user = await User.findOne({ token:req.params.token});
        if (!user) {
            return res.status(404).json({
                message: "Profile not found",
                success: false
            })
        }

        return res.status(200).json({
            success: true,
            message: "Success",
            data:{
                user
            }
        });

}


// **
// updateProfile
// **
 const updateProfile = async (req, res) => {


    const user = await User.findOne({ token:req.token});
    if (!user) {
        return res.status(404).json({
            message: "Profile not found",
            success: false
        })
    }

    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        if (user.photoUrl) {
            const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
            deleteMediaFromCloudinary(publicId);
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = { name, photoUrl };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select("-password");

        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully."
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }
}




export default {
    getUserProfile,
    register,
    updateProfile,
    logout,
    login
}
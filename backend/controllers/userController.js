import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { query, validationResult } from "express-validator";




// **
// Register
// **
export const register = async (req, res) => {

        const {
            username,
            email,
            password,
            confirmPassword,
            role,
            permission,
            date
        } = req.body;


        if (!username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Username, email, password, and confirm password are required."
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match."
            });
        }

        // Validation...
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }



        //Entry
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'student',
            permission: permission || ["read", "edit", "update", "delete"],
            date: date || new Date()
        });

        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            data:{

            }
        });

        
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({
    //         success: false,
    //         message: "Failed to register. Please try again later."
    //     });
    // }
};





// **
// Login
// **
export const login = async (req, res) => {
    
    // try {

        const { email, password } = req.body;
        
        if (!email || !password) {
            console.log("Missing email or password");
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }


        let token = "asdasd";
        const updatedUser = await User.findByIdAndUpdate(userId,{token:token}, { new: true })

        // generateToken(res, user, `Welcome back ${user.username}`);

    // } catch (error) {
    //     console.error("🔥 Error during login:", error);
    //     return res.status(500).json({
    //         success: false,
    //         message: "Failed to login"
    //     });
    // }
};



// **
// Logout
// **
export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}


// **
// getUserProfile
// **
export const getUserProfile = async (req, res) => {


      await Promise.all([
        query('full_name').isString().withMessage('Full name must be a string').isLength({ min: 5 }).withMessage('Full name too short'),
        query('username').isString().withMessage('Username must be a string').isLength({ min: 5 }).withMessage('Username too short'),
        query('email').isEmail().withMessage('Invalid email address'),
        query('password').isLength({ min: 6, max: 30 }).withMessage('Password length must be between 6 and 30 characters')
      ].map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: errors.array().map(err => ({
            [err.path]: err.msg
          }))
        });
      }
   
   
    // try {
        // const userId = req.id;
        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(404).json({
        //         message: "Profile not found",
        //         success: false
        //     })
        // }
        return res.status(200).json({
            success: true,
        
        })

    // } catch (error) {
    //     console.log(error);
    //     return res.status(500).json({
    //         success: false,
    //         message: "Failed to load user"
    //     })
    // }


}


// **
// updateProfile
// **
export const updateProfile = async (req, res) => {
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
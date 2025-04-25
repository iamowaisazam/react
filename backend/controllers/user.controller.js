import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";


import DB from '../database/mongodb.js';


export const register = async (req, res) => {
    try {
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
                message: "Username, email, password and confirm password are required."
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match."
            });
        }


        const db = await DB();
        const usersCollection = db.collection('users');

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            email,
            password: hashedPassword,
            role: role || 'user',
            permission: permission || ["read", "edit", "update", "delete"],
            date: date || new Date()
        };


        await usersCollection.insertOne(newUser);

        return res.status(201).json({
            success: true,
            message: "Account created successfully."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register. Please try again later.",
        });
    }
};


export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        console.log("📥 Request body:", req.body);

        if (!email || !password) {
            console.log("❌ Missing email or password");
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const db = await DB();
        console.log("✅ Connected to DB");

        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ email });

        console.log("🔍 Fetched user:", user);


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("🔐 Password match:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }

        generateToken(res, user, `Welcome back ${user.username}`);

    } catch (error) {
        console.error("🔥 Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        });
    }
};



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
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if (!user) {
            return res.status(404).json({
                message: "Profile not found",
                success: false
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to load user"
        })
    }
}
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
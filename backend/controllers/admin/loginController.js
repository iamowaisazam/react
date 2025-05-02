import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
import { body, validationResult } from 'express-validator';


export const adminlogin = [

    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),


    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation errors',
                    errors: errors.array(),
                });
            }

            const { email, password } = req.body;
            console.log("Request body:", req.body);


            const user = await User.findOne({ email }).select('+password');
            console.log("🔍 Fetched user:", user);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password"
                });
            }

            if (user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Admins only."
                });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);


            if (!isPasswordMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect email or password"
                });
            }


            generateToken(res, user, `Welcome back ${user.username}`);

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: "Failed to login"
            });
        }
    }
];

export const getAllUsers = async (req, res) => {

    try {
        // Ensure user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        const users = await User.find().select('-password');

        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error("🔥 Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users. Please try again later."
        });
    }
};

export const createUser = [

    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
    body('confirmPassword').notEmpty().withMessage('Confirm Password is required'),


    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array(),
            });
        }

        const { username, email, password, confirmPassword, role, permission, date } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match."
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }

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
            message: "Account created successfully."
        });
    }
];

export const getSingleUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Ensure user is admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error("🔥 Error fetching user:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user. Please try again later."
        });
    }
};

export const updateUser = [

    body('username').optional().notEmpty().withMessage('Username is required'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('role').optional().isIn(['admin', 'student']).withMessage('Invalid role'),


    async (req, res) => {
        const { userId } = req.params;
        const { username, email, role } = req.body;


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: errors.array(),
            });
        }

        try {

            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. Admins only."
                });
            }

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }

            user.username = username || user.username;
            user.email = email || user.email;
            user.role = role || user.role;

            await user.save();

            return res.status(200).json({
                success: true,
                message: "User updated successfully.",
                data: user
            });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to update user. Please try again later."
            });
        }
    }
];

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {

        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admins only."
            });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });
    } catch (error) {
        console.error("🔥 Error deleting user:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete user. Please try again later."
        });
    }
};



export default {
    deleteUser,
    updateUser,
    adminlogin,
    getSingleUser,
    createUser,
    getAllUsers
}
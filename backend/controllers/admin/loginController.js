import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
import { body, validationResult } from 'express-validator';


const adminlogin = async (req, res) => {
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

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password +role');
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

    return generateToken(res, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, "Logged In");
};



const getAllUsers = async (req, res) => {

    // console.log(req.user)
    // if (!req.user || req.user.role !== 'admin') {
    //     return res.status(403).json({
    //         success: false,
    //         message: "Access denied. Admins only."
    //     });
    // }

    const users = await User.find().select('-password');

    return res.status(200).json({
        success: true,
        data: users
    });

};

const createUser = async (req, res) => {
    await Promise.all([
        body('name')
            .isString().withMessage('Username must be a string')
            .isLength({ min: 4 }).withMessage('name too short')
            .run(req),
        body('email')
            .isEmail().withMessage('Invalid email address')
            .run(req),
        body('password')
            .notEmpty().withMessage('Password is required')
            .run(req),
        body('confirmPassword')
            .notEmpty().withMessage('Confirm Password is required')
            .run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
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
};


const getSingleUser = async (req, res) => {
    const { userId } = req.params;

    // if (!req.user || req.user.role !== 'admin') {
    //     return res.status(403).json({
    //         success: false,
    //         message: "Access denied. Admins only."
    //     });
    // }

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
};

const updateUser = async (req, res) => {
    await Promise.all([
        body('name').optional().notEmpty().withMessage('name is required').run(req),
        body('email').optional().isEmail().withMessage('Invalid email address').run(req),
        body('role').optional().isIn(['admin', 'student']).withMessage('Invalid role').run(req)
    ]);

    const { userId } = req.params;
    const { name, email, role } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }


    // if (!req.user || req.user.role !== 'admin') {
    //     return res.status(403).json({
    //         success: false,
    //         message: "Access denied. Admins only."
    //     });
    // }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "User updated successfully.",
        data: user
    });


};

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    // if (!req.user || req.user.role !== 'admin') {
    //     return res.status(403).json({
    //         success: false,
    //         message: "Access denied. Admins only."
    //     });
    // }

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


};



export default {
    deleteUser,
    updateUser,
    adminlogin,
    getSingleUser,
    createUser,
    getAllUsers
}
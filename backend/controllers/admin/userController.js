import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";
import { body, validationResult } from 'express-validator';



const List = async (req, res) => {
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    //Search


    if (req.query.search) {
        query.$or = [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
            { phone: { $regex: req.query.search, $options: "i" } }
        ];
    }

    // Total Count
    const total = await User.countDocuments(query);

    //Records
    let data = await User.find(query)
        .select('-password')
        .skip(skip)
        .limit(limit);

    //Pages 
    const pages = Math.ceil(total / limit);

    return res.status(200).json({
        success: true,
        data: {
            data: data,
            total: total,
            page: page,
            pages: pages,
            limit: limit,
            skip: skip,
        }
    });

};

const Create = async (req, res) => {
    await Promise.all([
        body('name')
            .isString().withMessage('name must be a string')
            .isLength({ min: 4 }).withMessage('name too short')
            .run(req),
        body('email')
            .isEmail().withMessage('Invalid email address')
            .run(req),
        body('password')
            .notEmpty().withMessage('Password is required')
            .run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array().reduce((acc, err) => {
                acc[err.path] = err.msg;
                return acc;
            }, {})
        });
    }


    const existingUser = await User.findOne({ email:req.body.email });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists with this email."
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password: hashedPassword,
        role: req.body.role || 'user',
        permission: req.body.permission || ["read", "edit", "update", "delete"],
        date: new Date()
    });

    await newUser.save();

    return res.status(201).json({
        success: true,
        message: "Account created successfully."
    });
};


const Find = async (req, res) => {
    const { userId } = req.params;
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


const Update = async (req, res) => {

    await Promise.all([
        body('name').notEmpty().withMessage('Name is required').run(req),
        body('email').isEmail().withMessage('Invalid email address').run(req),
        body('role').notEmpty().withMessage('Role Is Required').isIn(['admin', 'customer', 'user'])
        .withMessage('Role must be one of: admin, customer, user').run(req),
        body('password').optional({ checkFalsy: true }).isLength({ min: 6, max: 20})
        .withMessage('Password Minimum 6 Character').run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array().reduce((acc, err) => {
                acc[err.path] = err.msg;
                return acc;
            }, {})
        });
    }


    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }


    const existingUser = await User.findOne({email:req.body.email});
    if(existingUser) {
        if(existingUser.id != userId){
              return res.status(400).json({
                success: false,
                message: "User already exists with this email."
            });
        }
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;
    user.phone = req.body.phone;
    if(req.body.password){
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
    }
    await user.save();

    return res.status(200).json({
        success: true,
        message: "User updated successfully.",
        data: {
        }
    });

};


const Delete = async (req, res) => {
   
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
    Delete,
    Update,
    Find,
    Create,
    List
}
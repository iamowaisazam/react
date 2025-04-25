import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [50, "Username cannot be more than 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },

    role: {
        type: String,
        enum: ["admin", "instructor", "student"],
        default: "student"
    },
    permission: {
        type: [String],
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export const User = mongoose.model("User", userSchema);

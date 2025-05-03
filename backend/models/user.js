import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    token: {
        type: String,
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

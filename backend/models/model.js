import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

// Rename the model name as requested (using 'model')
const Car = mongoose.model('model', carSchema);

export default Car;


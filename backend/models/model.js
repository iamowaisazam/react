import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        catId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        makeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Make',
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

const Car = mongoose.model('model', carSchema);

export default Car;

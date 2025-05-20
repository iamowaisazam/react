import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        catId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        makeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'make',
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


export default mongoose.model('model', carSchema);

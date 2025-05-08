import mongoose from 'mongoose';

const makeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        catId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Make = mongoose.model('Make', makeSchema);

export default Make;

import mongoose from 'mongoose';

const makeSchema = new mongoose.Schema(
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
    },
    {
        timestamps: true,
    }
);

const Make = mongoose.model('make', makeSchema);

export default Make;

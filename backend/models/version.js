import mongoose from 'mongoose';


const versionSchema = new mongoose.Schema(
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
        modelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Model',
            required: true,
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


const Version = mongoose.model('Version', versionSchema);

export default Version;

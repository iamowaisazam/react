import mongoose from 'mongoose';


const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],  // The allowed values
            required: true
        },
        description: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
);


const Category = mongoose.model('Category', categorySchema);

export default Category;

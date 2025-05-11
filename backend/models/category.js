import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            required: true
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;

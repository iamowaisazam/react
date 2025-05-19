import mongoose from 'mongoose';


const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        modelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'model',
        },
          makeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'make',
        },
          catId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
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


const Post = mongoose.model('post', postSchema);

export default Post;

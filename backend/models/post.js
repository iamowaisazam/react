import mongoose from 'mongoose';


const postSchema = new mongoose.Schema(
    {
        title: {type: String,required: true},
        slug: {type: String,required: true},
        price: {type: String},
        description: {type: String},
        longitude: {type: String},
        latitude: {type: String},
        image:{type: String},
        images:{type: String},
        modelId: {type: mongoose.Schema.Types.ObjectId,ref: 'model'},
        makeId: {type: mongoose.Schema.Types.ObjectId,ref: 'make'},
        catId: {type: mongoose.Schema.Types.ObjectId,ref: 'category'},
        verId: {type: mongoose.Schema.Types.ObjectId,ref: 'version'},
        userId: {type: mongoose.Schema.Types.ObjectId,ref: 'user'},
        country: {type: String,},
        state: {type: String},
        city: {type: String},
        tags:{type: String},
        features: {type: Object,default: {}},
        specs:{type:[{
          title: { type: String },
          value: { type: String },
          icon: { type: String },
        }],default: []},
        date: {type: Date,default: Date.now},
    },
    {timestamps: true}
);


const Post = mongoose.model('post', postSchema);

export default Post;

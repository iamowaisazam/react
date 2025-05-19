import Category from '../../models/category.js';
import Make from '../../models/make.js';
import Model  from '../../models/model.js';
import Version  from '../../models/version.js';
import Post  from '../../models/post.js';
import { body, param, validationResult } from "express-validator";



// ************Get all recode*******************
const List = async (req, res) => {


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    //Search
    if (req.query.search) {
        query.$or = [
            { title: { $regex: req.query.search, $options: "i" } },
            { slug: { $regex: req.query.search, $options: "i" } },
        ];
    }

    // Total Count
    const total = await Post.countDocuments(query);

    //Records
    let data = await Post.find(query)
        .select()
        .skip(skip)
        .limit(limit);

    //Pages 
    const pages = Math.ceil(total / limit);

    return res.status(200).json({
        success: true,
        data: {
            data: data,
            total: total,
            page: page,
            pages: pages,
            limit: limit,
            skip: skip,
        }
    });

};




// ************create*******************
const Create = async (req, res) => {

    await Promise.all([
        body('title').notEmpty().withMessage('Title is required').run(req),
        body('slug').notEmpty().withMessage('Slug is required').run(req),
        body('catId').notEmpty().withMessage('Select a Category').isMongoId()
        .withMessage('Invalid Category ID').run(req),
        body('makeId').notEmpty().withMessage('Select a Make').isMongoId()
        .withMessage('Invalid Make ID').run(req),
        body('modelId').notEmpty().withMessage('Select a Model').isMongoId()
        .withMessage('Invalid Model ID').run(req),
        body('verId').notEmpty().withMessage('Select a Version').isMongoId()
        .withMessage('Invalid Version ID').run(req),  
    ]);

      const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array().reduce((acc, err) => {
                acc[err.path] = err.msg;
                return acc;
            }, {})
        });
    }

    const { title, slug, verId, catId, makeId, modelId} = req.body;

    const category = await Category.find({id:req.body.catId});
    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Validation errors',
            errors: {
                catId:'Invalid Cat Id',
            }
        });
    }

    const make = await Make.find({id:req.body.makeId});
    if (!make) {
        return res.status(404).json({
            success: false,
            message: "Make not found",
            errors: {
                makeId:'Invalid Make Id',
            }
        });
    }

    const model = await Model.find({id:req.body.modelId});
    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
            errors: {
                verId:'Invalid Model Id',
            }
        });
    }

    const version = await Version.find({id:req.body.verId});
    if (!version) {
        return res.status(404).json({
            success: false,
            message: "Version not found",
            errors: {
                verId:'Invalid Model Id',
            }
        });
    }
        
    const insertMake = new Post({
         title:title,
         slug:slug, 
         catId:catId, 
         makeId:makeId,
         modelId:modelId,
         verId:verId
    });

    await insertMake.save();

    return res.status(201).json({
        success: true,
        message: "Version created successfully",
        data: insertMake,
    });

}




// ************Get Data by single*******************
const Find = async (req, res) => {

    const data = await Post.findById(req.params.id);
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "Record not found",
        })
    }

    return res.status(200).json({
        success: true,
        message: "Record Find Successfully",
        data: data,
    })

}




const Update = async (req, res) => {
   
    await Promise.all([
        body('title').notEmpty().withMessage('Title is required').run(req),
        body('slug').notEmpty().withMessage('Slug is required').run(req),
        body('catId').notEmpty().withMessage('Select a Category').isMongoId()
        .withMessage('Invalid Category ID').run(req),
        body('makeId').notEmpty().withMessage('Select a Make').isMongoId()
        .withMessage('Invalid Make ID').run(req),
        body('modelId').notEmpty().withMessage('Select a Model').isMongoId()
        .withMessage('Invalid Model ID').run(req),
        body('verId').notEmpty().withMessage('Select a Version').isMongoId()
        .withMessage('Invalid Version ID').run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array().reduce((acc, err) => {
                acc[err.path] = err.msg;
                return acc;
            }, {})
        });
    }

    const { id } = req.params;


    const category = await Model.find({id:req.body.catId});
    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Validation errors',
            errors: {
                catId:'Invalid Cat Id',
            }
        });
    }

    const make = await Make.find({id:req.body.makeId});
    if (!make) {
        return res.status(404).json({
            success: false,
            message: "Make not found",
            errors: {
                makeId:'Invalid Make Id',
            }
        });
    }

     const models = await Model.find({id:req.body.modelId});
    if (!models) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
            errors: {
                verId:'Invalid Model Id',
            }
        });
    }

    const version = await Version.find({id:req.body.verId});
    if (!version) {
        return res.status(404).json({
            success: false,
            message: "Version not found",
            errors: {
                verId:'Invalid Model Id',
            }
        });
    }


    const post = await Post.findByIdAndUpdate(id,
        { 
         title:req.body.title,
         slug:req.body.slug, 
         catId:req.body.catId, 
         makeId:req.body.makeId,
         modelId:req.body.modelId,
         verId:req.body.verId,
        },
        { new: true }
    );

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Record not found",
        });
    }


    return res.status(200).json({
        success: true,
        message: "Record Updated Successfully",
        data: post,
    });

};


const Delete = async (req, res) => {

    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Record not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Record deleted successfully",
    });
    
}

export default {
    List,
    Create,
    Find,
    Update,
    Delete
}



import Category from '../../models/category.js';
import Make from '../../models/make.js';
import Model  from '../../models/model.js';
import { body, param, validationResult } from "express-validator";
import Version from '../../models/version.js';
import Post from '../../models/post.js';



// ************Get all recode*******************
const List = async (req, res) => {


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    //Search
    if (req.query.search) {
        query.$or = [
            { name: { $regex: req.query.search, $options: "i" } },
        ];
    }

    // Total Count
    const total = await Model.countDocuments(query);

    //Records
    let data = await Model.find(query)
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
        body('name').notEmpty().withMessage('Name is required').run(req),
        body('catId').notEmpty().withMessage('Select a Category').isMongoId()
        .withMessage('Invalid Category ID').run(req),
        body('makeId').notEmpty().withMessage('Select a Make').isMongoId()
        .withMessage('Invalid Make ID').run(req),
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

    const { name, catId, makeId} = req.body;

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
    
    
    const insertMake = new Model({ name, catId, makeId});
    await insertMake.save();

    return res.status(201).json({
        success: true,
        message: "Make created successfully",
        data: insertMake,
    });

}



// ************Get Data by single*******************
const Find = async (req, res) => {

    const getmake = await Model.findById(req.params.id);
    if (!getmake) {
        return res.status(400).json({
            success: false,
            message: "Model not found",
        })
    }

    return res.status(200).json({
        success: true,
        message: "Model find successfully",
        data: getmake,
    })
}




const Update = async (req, res) => {
   
    await Promise.all([
        body('name').notEmpty().withMessage('Name is required').run(req),
        body('catId').notEmpty().withMessage('Select a Category').isMongoId()
        .withMessage('Invalid Category ID').run(req),
        body('makeId').notEmpty().withMessage('Select a Make').isMongoId()
        .withMessage('Invalid Make ID').run(req),
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
    const { name, catId,makeId} = req.body;


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



    const model = await Model.findByIdAndUpdate(id,
        { name, catId,makeId},
        { new: true }
    );

    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Make not found",
        });
    }


    return res.status(200).json({
        success: true,
        message: "Make updated successfully",
        data: model,
    });

};


const Delete = async (req, res) => {

    const { id } = req.params;
   

    const version = await Version.find({modelId:id});
    if (version) {
        return res.status(400).json({
            success: false,
            message: "Can Not Delete Model It Used In Make",
        })
    }

     const checkinProduct = await Post.find({modelId:id});
    if (checkinProduct) {
        return res.status(400).json({
            success: false,
            message: "Can Not Delete Model It Used In Post",
        })
    }
   
    const model = await Model.findByIdAndDelete(id);
    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Make not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Model deleted successfully",
    });
    
}

export default {
    List,
    Create,
    Find,
    Update,
    Delete
}



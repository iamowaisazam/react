import Category from '../../models/category.js';
import Make from '../../models/make.js';
import Model from '../../models/model.js';
import Version from '../../models/version.js';
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
            { name: { $regex: req.query.search, $options: "i" } },
        ];
    }

    // Total Count
    const total = await Version.countDocuments(query);

    //Records
    let data = await Version.find(query)
        .populate({ path: 'catId', select: 'name' })
        .populate({ path: 'makeId', select: 'name' })
        .populate({ path: 'modelId', select: 'name' })
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
        body('modelId').notEmpty().withMessage('Select a Model').isMongoId()
            .withMessage('Invalid Model ID').run(req),
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

    const { name, catId, makeId, modelId } = req.body;

    const category = await Category.find({ id: req.body.catId });
    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Validation errors',
            errors: {
                catId: 'Invalid Cat Id',
            }
        });
    }

    const make = await Make.find({ id: req.body.makeId });
    if (!make) {
        return res.status(404).json({
            success: false,
            message: "Make not found",
            errors: {
                makeId: 'Invalid Make Id',
            }
        });
    }

    const model = await Model.find({ id: req.body.modelId });
    if (!model) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
            errors: {
                verId: 'Invalid Model Id',
            }
        });
    }

    const insertMake = new Version({ name, catId, makeId, modelId });
    await insertMake.save();

    return res.status(201).json({
        success: true,
        message: "Version created successfully",
        data: insertMake,
    });

}




// ************Get Data by single*******************
const Find = async (req, res) => {

    const data = await Version.findById(req.params.id);
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "Version not found",
        })
    }

    return res.status(200).json({
        success: true,
        message: "Version Find Successfully",
        data: data,
    })

}




const Update = async (req, res) => {

    await Promise.all([
        body('name').notEmpty().withMessage('Name is required').run(req),
        body('catId').notEmpty().withMessage('Select a Category').isMongoId()
            .withMessage('Invalid Category ID').run(req),
        body('makeId').notEmpty().withMessage('Select a Make').isMongoId()
            .withMessage('Invalid Make ID').run(req),
        body('modelId').notEmpty().withMessage('Select a Model').isMongoId()
            .withMessage('Invalid Model ID').run(req),
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
    const { name, catId, makeId, modelId } = req.body;


    const category = await Model.find({ id: req.body.catId });
    if (!category) {
        return res.status(404).json({
            success: false,
            message: 'Validation errors',
            errors: {
                catId: 'Invalid Cat Id',
            }
        });
    }

    const make = await Make.find({ id: req.body.makeId });
    if (!make) {
        return res.status(404).json({
            success: false,
            message: "Make not found",
            errors: {
                makeId: 'Invalid Make Id',
            }
        });
    }

    const models = await Model.find({ id: req.body.modelId });
    if (!models) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
            errors: {
                verId: 'Invalid Model Id',
            }
        });
    }


    const version = await Version.findByIdAndUpdate(id,
        { name, catId, makeId, modelId },
        { new: true }
    );

    if (!version) {
        return res.status(404).json({
            success: false,
            message: "Version not found",
        });
    }


    return res.status(200).json({
        success: true,
        message: "Version Updated Successfully",
        data: version,
    });

};


const Delete = async (req, res) => {

    const { id } = req.params;
    const version = await Version.findByIdAndDelete(id);
    if (!version) {
        return res.status(404).json({
            success: false,
            message: "Version not found",
        });
    }

    const checkinProduct = await Post.find({ verId: id });
    if (checkinProduct) {
        return res.status(400).json({
            success: false,
            message: "Can Not Delete Version It Used In Post",
        })
    }

    return res.status(200).json({
        success: true,
        message: "Version deleted successfully",
    });

}

export default {
    List,
    Create,
    Find,
    Update,
    Delete
}



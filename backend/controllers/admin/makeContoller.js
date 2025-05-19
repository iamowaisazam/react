import { Model } from 'mongoose';
import Make from '../../models/make.js';
import make from '../../models/make.js'
import { body, param, validationResult } from "express-validator";
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
    const total = await Make.countDocuments(query);

    //Records
    let data = await Make.find(query)
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
        body('catId').notEmpty().withMessage('Select a Category').run(req),
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

    const { name, catId} = req.body;
    const insertMake = new Make({ name, catId});
    await insertMake.save();

    return res.status(201).json({
        success: true,
        message: "Make created successfully",
        data: insertMake,
    });

}


// ************Get Data by single*******************
const Find = async (req, res) => {

    const getmake = await make.findById(req.params.id);
    if (!getmake) {
        return res.status(400).json({
            success: false,
            message: "Make not found",
        })
    }

    return res.status(200).json({
        success: true,
        message: "make find successfully",
        data: getmake,
    })
}




const Update = async (req, res) => {
   
    await Promise.all([
        body('name').optional().notEmpty().withMessage('Name cannot be empty').run(req),
        body('catId').optional().notEmpty().withMessage('Select a category').run(req),
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
    const { name, catId} = req.body;
    const getMake = await make.findByIdAndUpdate(id,
        { name, catId},
        { new: true }
    );

    if (!getMake) {
        return res.status(404).json({
            success: false,
            message: "Make not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Make updated successfully",
        data: getMake,
    });

};


const Delete = async (req, res) => {

    const { id } = req.params;


    const model = await Model.find({makeId:id});
    if (model) {
        return res.status(400).json({
            success: false,
            message: "Can Not Delete Make It Used In Make",
        })
    }

      const checkinProduct = await Post.find({makeId:id});
        if (checkinProduct) {
            return res.status(400).json({
                success: false,
                message: "Can Not Delete Make It Used In Post",
            })
        }


    const getmake = await make.findByIdAndDelete(id);
    if (!getmake) {
        return res.status(404).json({
            success: false,
            message: "Make not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Make deleted successfully",
    });
    
}

export default {
    List,
    Create,
    Find,
    Update,
    Delete
}



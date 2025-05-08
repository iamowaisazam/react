import make from '../../models/make.js'
import { body, param, validationResult } from "express-validator";


// Handle a validation 
const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
};



// ************create*******************

const create = async (req, res) => {
    await Promise.all([
        body('name').notEmpty().withMessage('Name is required').run(req),
        body('catId').notEmpty().withMessage('Select a Category').run(req),
        body('status').isIn(['active', 'inactive']).withMessage('Status must be active or inactive').run(req),
    ]);

    const err = handleValidation(req, res);
    if (err) return;

    const { name, catId, status } = req.body;

    const insertMake = new make({ name, catId, status });
    await insertMake.save();

    return res.status(201).json({
        success: true,
        message: "Model created successfully",
        data: insertMake,
    });
}


// ************Get all recode*******************
const getmake = async (req, res) => {
    const getmake = await make.find();
    return res.status(200).json({
        success: true,
        data: getmake,
    })
}


// ************Get Data by single*******************
const getmakeId = async (req, res) => {
    await param('makeId').isMongoId().withMessage('invalid id to find Make').run(req);
    const err = handleValidation(req, res);
    if (err) return;
    const makeId = req.params.makeId;
    const getmake = await make.findById(makeId);
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
        param('makeId').isMongoId().withMessage('Invalid Make ID').run(req),
        body('name').optional().notEmpty().withMessage('Name cannot be empty').run(req),
        body('catId').optional().notEmpty().withMessage('Select a category').run(req),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive').run(req),
    ]);

    const err = handleValidation(req, res);
    if (err) return;

    const { makeId } = req.params;
    const { name, catId, status } = req.body;

    const getMake = await make.findByIdAndUpdate(
        makeId,
        { name, catId, status },
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

const deleteMake = async (req, res) => {
    await param('makeId').isMongoId().withMessage('invalid id to find Make').run(req);
    const err = handleValidation(req, res);
    if (err) return;


    const { makeId } = req.params;
    const getmake = await make.findByIdAndDelete(makeId);

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
    create,
    getmake,
    getmakeId,
    Update,
    deleteMake
}



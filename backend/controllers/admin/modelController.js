import Car from "../../models/model.js";
import { body, param, validationResult } from "express-validator";


const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
};

// ---------------- Create Car ----------------
const createCar = async (req, res) => {

    await Promise.all([
        body('name').notEmpty().withMessage('Name is required').run(req),
        body('catId').notEmpty().withMessage('Category ID is required').isMongoId().withMessage('Invalid Category ID').run(req),
        body('makeId').notEmpty().withMessage('Make ID is required').isMongoId().withMessage('Invalid Make ID').run(req),
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

    const { name, catId, makeId } = req.body;

    try {
        const newCar = new Car({ name, catId, makeId });
        await newCar.save();

        return res.status(201).json({
            success: true,
            message: "Model created successfully",
            data: newCar,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

// ---------------- Get All Cars ----------------
const getAllCars = async (req, res) => {
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
    const total = await Car.countDocuments(query);

    //Records
    let data = await Car.find(query)
        .select('-password')
        .populate({ path: 'catId', select: 'name' })
        .populate({ path: 'makeId', select: 'name' })
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

// ---------------- Get Car by ID ----------------
const getCarById = async (req, res) => {
    await param('carId').isMongoId().withMessage('Invalid car ID').run(req);

    const err = handleValidation(req, res);
    if (err) return;

    const { carId } = req.params;
    const car = await Car.findById(carId);

    if (!car) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: car,
    });
};

// ---------------- Update Car ----------------
const updateCar = async (req, res) => {
    await Promise.all([
        param('carId').isMongoId().withMessage('Invalid car ID').run(req),
        body('name').optional().notEmpty().withMessage('Name cannot be empty').run(req),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive').run(req),
    ]);

    const err = handleValidation(req, res);
    if (err) return;

    const { carId } = req.params;
    const { name, status } = req.body;

    const car = await Car.findByIdAndUpdate(
        carId,
        { name, status },
        { new: true }
    );

    if (!car) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Model updated successfully",
        data: car,
    });
};

// ---------------- Delete Car ----------------
const deleteCar = async (req, res) => {
    await param('carId').isMongoId().withMessage('Invalid car ID').run(req);

    const err = handleValidation(req, res);
    if (err) return;

    const { carId } = req.params;
    const car = await Car.findByIdAndDelete(carId);

    if (!car) {
        return res.status(404).json({
            success: false,
            message: "Model not found",
        });
    }

    return res.status(200).json({
        success: true,
        message: "Model deleted successfully",
    });
};

export default {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    deleteCar
}

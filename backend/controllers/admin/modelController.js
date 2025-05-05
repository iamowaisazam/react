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
        body('slug').notEmpty().withMessage('Slug is required').run(req),
        body('status').isIn(['active', 'inactive']).withMessage('Status must be active or inactive').run(req),
    ]);

    const err = handleValidation(req, res);
    if (err) return;

    const { name, slug, status } = req.body;

    const newCar = new Car({ name, slug, status });
    await newCar.save();

    return res.status(201).json({
        success: true,
        message: "Model created successfully",
        data: newCar,
    });
};

// ---------------- Get All Cars ----------------
const getAllCars = async (req, res) => {
    const cars = await Car.find();
    return res.status(200).json({
        success: true,
        data: cars,
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
        body('slug').optional().notEmpty().withMessage('Slug cannot be empty').run(req),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive').run(req),
    ]);

    const err = handleValidation(req, res);
    if (err) return;

    const { carId } = req.params;
    const { name, slug, status } = req.body;

    const car = await Car.findByIdAndUpdate(
        carId,
        { name, slug, status },
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

import Car from "../../models/model.js";


export const createCar = async (req, res) => {
    const { name, slug, status } = req.body;

    try {
        const newCar = new Car({ name, slug, status });
        await newCar.save();

        return res.status(201).json({
            success: true,
            message: "Model created successfully",
            data: newCar,
        });
    } catch (error) {
        console.error("🔥 Error creating Model:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Model. Please try again later.",
        });
    }
};


export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        return res.status(200).json({
            success: true,
            data: cars,
        });
    } catch (error) {
        console.error("🔥 Error fetching Model:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch Model. Please try again later.",
        });
    }
};


export const getCarById = async (req, res) => {
    const { carId } = req.params;

    try {
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
    } catch (error) {
        console.error("🔥 Error fetching Model:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch Model. Please try again later.",
        });
    }
};


export const updateCar = async (req, res) => {
    const { carId } = req.params;
    const { name, slug, status } = req.body;

    try {
        const car = await Car.findByIdAndUpdate(
            carId,
            { name, slug, status },
            { new: true } // Returns the updated car
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
    } catch (error) {
        console.error("🔥 Error updating Model:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update Model. Please try again later.",
        });
    }
};


export const deleteCar = async (req, res) => {
    const { carId } = req.params;

    try {
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
    } catch (error) {
        console.error("🔥 Error deleting Model:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete Model. Please try again later.",
        });
    }
};

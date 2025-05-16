import { body, validationResult } from 'express-validator';
import Category from '../../models/category.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

// Get all categories
const getAllCategories = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    //Search
    if (req.query.search) {
        query.$or = [
            { name: { $regex: req.query.search, $options: "i" } },
            { slug: { $regex: req.query.search, $options: "i" } }
        ];
    }

    // Total Count
    const total = await Category.countDocuments(query);

    //Records
    let data = await Category.find(query)
        .select('-password')
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

// Create category
export const createCategory = async (req, res) => {

    await Promise.all([
        body('name').notEmpty().withMessage('Category name is required').run(req),
        body('slug').notEmpty().withMessage('Category slug is required').run(req),

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


    const { name, slug } = req.body;
    const status = "active";

    try {
        const newCategory = new Category({ name, slug, status });
        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory
        });

    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create category. Please try again later."
        });
    }
};

// Get single category
const getSingleCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: category
        });
    } catch (error) {
        console.error("🔥 Error fetching category:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch category. Please try again later."
        });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    await Promise.all([
        // Validate categoryId from the URL params
        param('categoryId')
            .custom((value) => mongoose.Types.ObjectId.isValid(value))
            .withMessage('Invalid category ID')
            .run(req),

        // Validate body inputs
        body('name')
            .optional()
            .notEmpty()
            .withMessage('Category name cannot be empty')
            .run(req),

        body('slug')
            .optional()
            .isString()
            .withMessage('Slug must be a string')
            .run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation errors',
            errors: errors.array().reduce((acc, err) => {
                acc[err.path] = err.msg;
                return acc;
            }, {}),
        });
    }

    const { categoryId } = req.params;
    const { name, slug } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name, slug },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: updatedCategory
        });

    } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update category. Please try again later."
        });
    }
};


// Delete category
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.error("🔥 Error deleting category:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete category. Please try again later."
        });
    }
};

export default {
    getAllCategories,
    createCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory
}

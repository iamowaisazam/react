import { body, validationResult } from 'express-validator';
import Category from '../../models/category.js';
import authMiddleware from '../../middlewares/authMiddleware.js';

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error("🔥 Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch categories. Please try again later."
        });
    }
};

// Create category
export const createCategory = async (req, res) => {
    await Promise.all([
        body('name').notEmpty().withMessage('Category name is required').run(req),
        body('status').isIn(['active', 'inactive']).withMessage('Status must be either active or inactive').run(req),
        body('description').optional().isString().withMessage('Description must be a string').run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            })),
        });
    }

    const { name, status, description } = req.body;

    try {
        const newCategory = new Category({ name, status, description });
        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: newCategory
        });

    } catch (error) {
        console.error("🔥 Error creating category:", error);
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
        body('name').optional().notEmpty().withMessage('Category name cannot be empty').run(req),
        body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive').run(req),
        body('description').optional().isString().withMessage('Description must be a string').run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            })),
        });
    }

    const { categoryId } = req.params;
    const { name, status, description } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name, status, description },
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
        console.error("🔥 Error updating category:", error);
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

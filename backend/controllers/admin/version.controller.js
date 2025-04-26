import { body, validationResult } from 'express-validator';
import Version from '../../models/version.model.js';

export const createVersion = [
    // Validation rules
    body('name').notEmpty().withMessage('Name is required'),
    body('slug').notEmpty().withMessage('Slug is required'),
    body('modelId').notEmpty().withMessage('Model ID is required'),
    body('status').isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),

    // Handler
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const { name, slug, modelId, status } = req.body;

        try {
            const newVersion = new Version({ name, slug, modelId, status });
            await newVersion.save();

            return res.status(201).json({
                success: true,
                message: 'Version created successfully',
                data: newVersion,
            });
        } catch (error) {
            console.error('🔥 Error creating version:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create version. Please try again later.',
            });
        }
    }
];

export const getAllVersions = async (req, res) => {
    try {
        const versions = await Version.find().populate('modelId');
        return res.status(200).json({
            success: true,
            data: versions,
        });
    } catch (error) {
        console.error('🔥 Error fetching versions:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch versions. Please try again later.',
        });
    }
};

export const getVersionById = async (req, res) => {
    const { versionId } = req.params;

    try {
        const version = await Version.findById(versionId).populate('modelId');

        if (!version) {
            return res.status(404).json({
                success: false,
                message: 'Version not found',
            });
        }

        return res.status(200).json({
            success: true,
            data: version,
        });
    } catch (error) {
        console.error('🔥 Error fetching version:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch version. Please try again later.',
        });
    }
};

export const updateVersion = [
    // Validation rules
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('slug').optional().notEmpty().withMessage('Slug cannot be empty'),
    body('modelId').optional().notEmpty().withMessage('Model ID cannot be empty'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),

    // Handler
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }

        const { versionId } = req.params;
        const { name, slug, modelId, status } = req.body;

        try {
            const version = await Version.findByIdAndUpdate(
                versionId,
                { name, slug, modelId, status },
                { new: true }
            );

            if (!version) {
                return res.status(404).json({
                    success: false,
                    message: 'Version not found',
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Version updated successfully',
                data: version,
            });
        } catch (error) {
            console.error('🔥 Error updating version:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to update version. Please try again later.',
            });
        }
    }
];

export const deleteVersion = async (req, res) => {
    const { versionId } = req.params;

    try {
        const version = await Version.findByIdAndDelete(versionId);

        if (!version) {
            return res.status(404).json({
                success: false,
                message: 'Version not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Version deleted successfully',
        });
    } catch (error) {
        console.error('🔥 Error deleting version:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to delete version. Please try again later.',
        });
    }
};


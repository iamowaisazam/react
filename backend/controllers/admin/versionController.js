import { body, validationResult } from 'express-validator';
import Version from '../../models/version.js';

const createVersion = async (req, res) => {
    await body('name').notEmpty().withMessage('Name is required').run(req);
    await body('slug').notEmpty().withMessage('Slug is required').run(req);
    await body('modelId').notEmpty().withMessage('Model ID is required').run(req);
    await body('status').isIn(['active', 'inactive']).withMessage('Status must be either active or inactive').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, slug, modelId, status } = req.body;

    const newVersion = new Version({ name, slug, modelId, status });
    await newVersion.save();
    return res.status(201).json({
        success: true,
        message: 'Version created successfully',
        data: newVersion,
    });

};


const getAllVersions = async (req, res) => {
    try {
        const versions = await Version.find().populate('modelId');
        return res.status(200).json({ success: true, data: versions });
    } catch (error) {
        console.error('🔥 Error fetching versions:', error);
        return res.status(500).json({ success: false, message: error });
    }
};


const getVersionById = async (req, res) => {
    const { versionId } = req.params;

    const version = await Version.findById(versionId).populate('modelId');

    if (!version) {
        return res.status(404).json({ success: false, message: 'Version not found' });
    }

    return res.status(200).json({ success: true, data: version });

};


const updateVersion = async (req, res) => {
    await body('name').optional().notEmpty().withMessage('Name cannot be empty').run(req);
    await body('slug').optional().notEmpty().withMessage('Slug cannot be empty').run(req);
    await body('modelId').optional().notEmpty().withMessage('Model ID cannot be empty').run(req);
    await body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { versionId } = req.params;
    const { name, slug, modelId, status } = req.body;


    const version = await Version.findByIdAndUpdate(
        versionId,
        { name, slug, modelId, status },
        { new: true }
    );

    if (!version) {
        return res.status(404).json({ success: false, message: 'Version not found' });
    }

    return res.status(200).json({
        success: true,
        message: 'Version updated successfully',
        data: version,
    });

};


const deleteVersion = async (req, res) => {
    const { versionId } = req.params;


    const version = await Version.findByIdAndDelete(versionId);

    if (!version) {
        return res.status(404).json({ success: false, message: 'Version not found' });
    }

    return res.status(200).json({ success: true, message: 'Version deleted successfully' });

};

export default {
    createVersion,
    getAllVersions,
    getVersionById,
    updateVersion,
    deleteVersion
}

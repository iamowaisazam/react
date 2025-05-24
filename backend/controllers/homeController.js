import Post from '../models/post.js';
import Version from "../models/version.js";
import Make from "../models/make.js";
import Model from "../models/model.js";
import Category from "../models/category.js";
const BASE_PATH = process.env.BASE_PATH || '/nodejs';






// **
// Register
// **
const getProducts = async (req, res) => {


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.id) {
        query._id = req.query.id;
    }

    if (req.query.catId) {
        query.catId = req.query.catId;
    }

    if (req.query.makeId) {
        query.makeId = req.query.makeId;
    }

    if (req.query.modelId) {
        query.modelId = req.query.modelId;
    }

    if (req.query.verId) {
        query.verId = req.query.verId;
    }



    // if (req.query.id) {
    //     query.id = req.query.id;
    // }

    //Search
    if (req.query.search) {
        query.$or = [
            { title: { $regex: req.query.search, $options: "i" } },
            { slug: { $regex: req.query.search, $options: "i" } },
        ];
    }

    // Total Count
    const total = await Post.countDocuments(query);

    //Records
    let data = await Post.find(query)
        .select()
        .skip(skip)
        .limit(limit)
        .lean();

    //Pages 
    const pages = Math.ceil(total / limit);

    await data.map(async (item) => {

        item.image = `public/uploads/car-five.jpg`;
        item.images = [
            `${BASE_PATH}/public/uploads/car-five.jpg`,
            `${BASE_PATH}/public/uploads/car-five.jpg`,
            `${BASE_PATH}/public/uploads/car-five.jpg`,
            `${BASE_PATH}/public/uploads/car-five.jpg`,
            `${BASE_PATH}/public/uploads/car-five.jpg`,
        ];

        item.tags = ['A/C: Front', 'Backup Camera', 'Cruise Control', 'Navigation'];
        item.country = 'Pakistan';
        item.state = 'Sindh';
        item.city = 'Karachi';
        item.description = 'Descrition';
        item.price = 100;
        item.longitude = '123';
        item.latitude = '123';

        item.user = {
            id: 1,
            name: 'David Johnson',
            email: 'user@gmail.com',
            phone: '03112239342'
        };

        item.features = {
            body: 'Truck',
            fuel_type: 'Petrol',
            transmission: 'Automatic',
            door: 2,
            color: 'red',
            condition: 'used',
        };

        return item;

    });

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



const getModels = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.makeId) {
        query.makeId = req.query.makeId;
    }

    if (req.query.catId) {
        query.catId = req.query.catId;
    }

    if (req.query.id) {
        query.id = req.query.id;
    }

    //Search
    if (req.query.search) {
        query.$or = [
            { name: { $regex: req.query.search, $options: "i" } },
        ];
    }

    // Total Count
    const total = await Model.countDocuments(query);

    //Records
    let data = await Model.find(query)
        .select()
        .skip(skip)
        .limit(limit)
        .lean();

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




const getVersions = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.modelId) {
        query.modelId = req.query.modelId;
    }

    if (req.query.makeId) {
        query.makeId = req.query.makeId;
    }

    if (req.query.catId) {
        query.catId = req.query.catId;
    }

    if (req.query.id) {
        query.id = req.query.id;
    }

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
        .select()
        .skip(skip)
        .limit(limit)
        .lean();

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




const getMakes = async (req, res) => {


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.catId) {
        query.catId = req.query.catId;
    }

    if (req.query.id) {
        query.id = req.query.id;
    }

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
        .limit(limit)
        .lean();

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



const getCategories = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.id) {
        query.id = req.query.id;
    }

    //Search
    if (req.query.search) {
        query.$or = [
            { name: { $regex: req.query.search, $options: "i" } },
        ];
    }

    // Total Count
    const total = await Category.countDocuments(query);

    //Records
    let data = await Category.find(query)
        .select()
        .skip(skip)
        .limit(limit)
        .lean();

    //Pages 
    const pages = Math.ceil(total / limit);

    await data.map(async (item) => {
        item.image = `${BASE_PATH}/public/uploads/car-five.jpg`;
        return item;

    });


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





export default {
    getProducts,
    getCategories,
    getModels,
    getVersions,
    getMakes,
}
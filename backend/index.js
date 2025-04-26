import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DB from './database/mongodb.js';
import isAuthenticated from './middlewares/isAuthenticated.js'
import authMiddleware from './middlewares/authMiddleware.js'

import { register, login, logout, getUserProfile } from './controllers/user.controller.js';
import { adminlogin, getAllUsers, createUser, getSingleUser, updateUser, deleteUser } from './controllers/admin/login.controller.js';
import { getAllCategories, createCategory, getSingleCategory, updateCategory, deleteCategory } from './controllers/admin/category.controller.js'
import { createCar, getAllCars, getCarById, updateCar, deleteCar } from './controllers/admin/model.contoller.js';
import { createVersion, getAllVersions, getVersionById, updateVersion, deleteVersion } from './controllers/admin/version.controller.js';




dotenv.config({});


const app = express();
const PORT = process.env.PORT || 3000;

DB();

app.use(express.json());
app.use(cookieParser());







app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);
app.get('/profile', isAuthenticated, getUserProfile);



// admin penal

// login
app.post('/adminlogin', adminlogin);
app.get('/admin/users', authMiddleware, getAllUsers);
app.post('/admin/users/create', authMiddleware, createUser);
app.get('/admin/user/:userId', authMiddleware, getSingleUser);
app.put('/admin/user/:userId', authMiddleware, updateUser);
app.delete('/admin/user/:userId', authMiddleware, deleteUser);

// Categories
app.get('/admin/categories', authMiddleware, getAllCategories);
app.post('/admin/categories/create', authMiddleware, createCategory);
app.get('/admin/category/:categoryId', authMiddleware, getSingleCategory);
app.put('/admin/category/:categoryId', authMiddleware, updateCategory);
app.delete('/admin/category/:categoryId', authMiddleware, deleteCategory);


// Car Model
app.post('/admin/model/create', authMiddleware, createCar);
app.get('/admin/model', authMiddleware, getAllCars);
app.get('/admin/model/:carId', authMiddleware, getCarById);
app.put('/admin/model/:carId', authMiddleware, updateCar);
app.delete('/admin/model/:carId', authMiddleware, deleteCar);

// version
app.post('/admin/versions/create', authMiddleware, createVersion);
app.get('/admin/versions', authMiddleware, getAllVersions);
app.get('/admin/version/:versionId', authMiddleware, getVersionById);
app.put('/admin/version/:versionId', authMiddleware, updateVersion);
app.delete('/admin/version/:versionId', authMiddleware, deleteVersion);




app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
})



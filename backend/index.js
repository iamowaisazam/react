import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DB from './database/mongodb.js';
import isAuthenticated from './middlewares/isAuthenticated.js'
import authMiddleware from './middlewares/authMiddleware.js'


import userController from './controllers/userController.js';
import loginController from './controllers/admin/loginController.js';




dotenv.config({});
const app = express();

const PORT = process.env.PORT || 3000;

DB();

app.use(express.json());
app.use(cookieParser());




// User Routes
app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/logout', userController.logout);
app.get('/profile', userController.getUserProfile);



// Login Routes
app.post('/adminlogin', loginController.adminlogin);
app.get('/admin/users', authMiddleware,loginController.getAllUsers);
app.post('/admin/users/create', authMiddleware,loginController.createUser);
app.get('/admin/user/:userId', authMiddleware,loginController.getSingleUser);
app.put('/admin/user/:userId', authMiddleware,loginController.updateUser);
app.delete('/admin/user/:userId', authMiddleware,loginController.deleteUser);



// Categories
// app.get('/admin/categories', authMiddleware, getAllCategories);
// app.post('/admin/categories/create', authMiddleware, createCategory);
// app.get('/admin/category/:categoryId', authMiddleware, getSingleCategory);
// app.put('/admin/category/:categoryId', authMiddleware, updateCategory);
// app.delete('/admin/category/:categoryId', authMiddleware, deleteCategory);


// Car Model
// app.post('/admin/model/create', authMiddleware, createCar);
// app.get('/admin/model', authMiddleware, getAllCars);
// app.get('/admin/model/:carId', authMiddleware, getCarById);
// app.put('/admin/model/:carId', authMiddleware, updateCar);
// app.delete('/admin/model/:carId', authMiddleware, deleteCar);


// version
// app.post('/admin/versions/create', authMiddleware, createVersion);
// app.get('/admin/versions', authMiddleware, getAllVersions);
// app.get('/admin/version/:versionId', authMiddleware, getVersionById);
// app.put('/admin/version/:versionId', authMiddleware, updateVersion);
// app.delete('/admin/version/:versionId', authMiddleware, deleteVersion);



app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
})



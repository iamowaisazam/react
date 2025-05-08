import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DB from './database/mongodb.js';
import authMiddleware from './middlewares/authMiddleware.js'

// Controllers
import userController from './controllers/userController.js';
import loginController from './controllers/admin/loginController.js';
import Categories from './controllers/admin/categoryController.js';
import Model from './controllers/admin/modelController.js';
import Version from './controllers/admin/versionController.js';
import Make from './controllers/admin/makeContoller.js';
import cors from 'cors';

dotenv.config({});
const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

DB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// Routes ______________________________________________________________________________

const router = express.Router();
const BASE_PATH = process.env.BASE_PATH || '/nodejs';

router.get('/', (req, res) => {
  res.send('Home Page');
});


// User Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout/:token', userController.logout);
router.get('/profile/:token', userController.getUserProfile);



// Login Routes
router.post('/adminlogin', loginController.adminlogin);
router.get('/admin/users', loginController.getAllUsers);
router.post('/admin/users/create', loginController.createUser);
router.get('/admin/user/:userId', loginController.getSingleUser);
router.put('/admin/user/:userId', loginController.updateUser);
router.delete('/admin/user/:userId', loginController.deleteUser);



// Categories
app.get('/admin/categories', authMiddleware, Categories.getAllCategories);
app.post('/admin/categories/create', authMiddleware, Categories.createCategory);
app.get('/admin/category/:categoryId', authMiddleware, Categories.getSingleCategory);
app.put('/admin/category/:categoryId', authMiddleware, Categories.updateCategory);
app.delete('/admin/category/:categoryId', authMiddleware, Categories.deleteCategory);


//Make
app.post('/admin/make/create', Make.create);
app.get('/admin/make', Make.getmake);
app.get('/admin/make/:makeId', Make.getmakeId);
app.put('/admin/make/:makeId', Make.Update);
app.delete('/admin/make/:makeId', Make.deleteMake);



// Car Model
app.post('/admin/model/create', Model.createCar);
app.get('/admin/model', Model.getAllCars);
app.get('/admin/model/:carId', Model.getCarById);
app.put('/admin/model/:carId', Model.updateCar);
app.delete('/admin/model/:carId', Model.deleteCar);


// version
app.post('/admin/versions/create', authMiddleware, Version.createVersion);
app.get('/admin/versions', authMiddleware, Version.getAllVersions);
app.get('/admin/version/:versionId', authMiddleware, Version.getVersionById);
app.put('/admin/version/:versionId', authMiddleware, Version.updateVersion);
app.delete('/admin/version/:versionId', authMiddleware, Version.deleteVersion);


router.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.use(BASE_PATH, router);


app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
})

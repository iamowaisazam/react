import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DB from './database/mongodb.js';


// Controllers
import userController from './controllers/userController.js';
import loginController from './controllers/admin/loginController.js';

dotenv.config({});
const app = express();
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
// router.post('/adminlogin', loginController.adminlogin);
// router.get('/admin/users', loginController.getAllUsers);
// router.post('/admin/users/create',loginController.createUser);
// router.get('/admin/user/:userId',loginController.getSingleUser);
// router.put('/admin/user/:userId',loginController.updateUser);
// router.delete('/admin/user/:userId',loginController.deleteUser);



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


router.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.use(BASE_PATH, router);


app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
})

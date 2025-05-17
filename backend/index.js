import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DB from './database/mongodb.js';
import authMiddleware from './middlewares/authMiddleware.js'

// Controllers
import userController from './controllers/loginController.js';
import loginController from './controllers/admin/userController.js';
import Categories from './controllers/admin/categoryController.js';
import Model from './controllers/admin/modelController.js';
import Version from './controllers/admin/versionController.js';
import Make from './controllers/admin/makeContoller.js';
import cors from 'cors';

dotenv.config({});
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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


// Login Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout/:token', userController.logout);
router.get('/profile/:token', userController.getUserProfile);

// User Routes
router.get('/admin/users', loginController.getAllUsers);
router.post('/admin/users/create', loginController.createUser);
router.get('/admin/users/:userId', loginController.getSingleUser);
router.put('/admin/users/:userId', loginController.updateUser);
router.delete('/admin/users/:userId', loginController.deleteUser);


// Categories
app.get('/admin/categories', Categories.getAllCategories);
app.post('/admin/categories/create', Categories.createCategory);
app.get('/admin/categories/:id', Categories.getSingleCategory);
app.put('/admin/categories/:id', Categories.updateCategory);
app.delete('/admin/categories/:id', Categories.deleteCategory);


//Make
app.get('/admin/makes', Make.List);
app.post('/admin/makes/create', Make.Create);
app.get('/admin/makes/:id', Make.Find);
app.put('/admin/makes/:id', Make.Update);
app.delete('/admin/makes/:id', Make.Delete);



// Car Model
app.get('/admin/models', Model.List);
app.post('/admin/models/create', Model.Create);
app.get('/admin/models/:id', Model.Find);
app.put('/admin/models/:id', Model.Update);
app.delete('/admin/models/:id', Model.Delete);


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

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DB from './database/mongodb.js';
import path from 'path';
import { fileURLToPath } from 'url';
import authMiddleware from './middlewares/authMiddleware.js'

// Controllers
import loginController from './controllers/loginController.js';
import userController from './controllers/admin/userController.js';
import Categories from './controllers/admin/categoryController.js';
import Model from './controllers/admin/modelController.js';
import Version from './controllers/admin/versionController.js';
import Make from './controllers/admin/makeContoller.js';
import cors from 'cors';
import Post from "./controllers/admin/postController.js";
import Website from './controllers/homeController.js';

dotenv.config({});
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public', express.static(path.join(__dirname, 'public')));


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
router.post('/register', loginController.register);
router.post('/login', loginController.login);
router.get('/logout/:token', loginController.logout);
router.get('/profile/:token', loginController.getUserProfile);

// User Routes
router.get('/admin/users', userController.getAllUsers);
router.post('/admin/users/create', userController.createUser);
router.get('/admin/users/:userId', userController.getSingleUser);
router.put('/admin/users/:userId', userController.updateUser);
router.delete('/admin/users/:userId', userController.deleteUser);

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

// Model
app.get('/admin/models', Model.List);
app.post('/admin/models/create', Model.Create);
app.get('/admin/models/:id', Model.Find);
app.put('/admin/models/:id', Model.Update);
app.delete('/admin/models/:id', Model.Delete);


// Version
app.get('/admin/versions',Version.List);
app.post('/admin/versions/create', Version.Create);
app.get('/admin/versions/:id', Version.Find);
app.put('/admin/versions/:id', Version.Update);
app.delete('/admin/versions/:id', Version.Delete);


// Car
app.get('/admin/posts',Post.List);
app.post('/admin/posts/create', Post.Create);
app.get('/admin/posts/:id', Post.Find);
app.put('/admin/posts/:id', Post.Update);
app.delete('/admin/posts/:id', Post.Delete);



//Website
app.get('/posts',Website.getProducts);
app.get('/makes',Website.getMakes);
app.get('/models',Website.getModels);
app.get('/versions',Website.getVersions);
app.get('/categories',Website.getCategories);


router.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.use(BASE_PATH, router);


app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
})

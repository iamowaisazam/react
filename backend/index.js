import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DB from './database/mongodb.js';
import { register, login, logout } from './controllers/user.controller.js';

dotenv.config({});


const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cookieParser());







app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);








app.listen(PORT, () => {
  console.log(`Server listen at port ${PORT}`);
})



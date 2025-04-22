import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DB from './database/mongodb.js';
import {register} from './controllers/user.controller.js';

dotenv.config({});


const app = express();
const PORT = process.env.PORT || 3000;


// default middleware
app.use(express.json());
app.use(cookieParser());



// Routes
app.get('/register', register);  // 👈 direct controller call









  // app.get('/register', async (req, res) => {

  //       try {

  //           let db = await DB();  
  //           const result = await db.collection('users').insertOne({
  //             name:'black',
  //             email:'iamowaisazam@gmail.com',
  //             password:'owais123',
  //             status:1,
  //             role:'admin',
  //             permission:'',
  //             created_At:new Date(),
  //           })

  //           res.status(201).json({ message: 'User added', id: result.insertedId })
  //       } catch (err) {
  //           res.status(500).json({ error: 'Insert failed', details: err.message })
  //       }
  // })
  





  // app.get('/api', (req, res) => {
  //   res.json({ message: 'API is working' })
  // })






app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`);
})



import { MongoClient } from 'mongodb'
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {

    if (!db) {

            await client.connect();
            db = client.db(); // Connects to 'myapp' as per URI
            console.log('✅ MongoDB connected');

    }

    return db;

}

export default connectDB;

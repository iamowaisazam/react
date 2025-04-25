import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db();
        console.log('✅ MongoDB connected');
    }
    return db;
}

export default connectDB;

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error('MONGODB_URI is missing in .env file');
        }

        const conn = await mongoose.connect(mongoURI); // No need for deprecated options
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;

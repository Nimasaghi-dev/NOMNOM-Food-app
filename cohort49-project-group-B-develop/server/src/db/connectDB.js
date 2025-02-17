import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = () => mongoose.connect(process.env.MONGODB_URL);

export default connectDB;

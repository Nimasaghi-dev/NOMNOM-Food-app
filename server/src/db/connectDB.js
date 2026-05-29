import dotenv from "dotenv";
import mongoose from "mongoose";
import { logInfo, logError } from "../util/logging.js";

dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error(
      "MONGODB_URL is not set. Did you create a .env file in the server folder?",
    );
  }

  await mongoose.connect(process.env.MONGODB_URL);
  logInfo(`MongoDB connected: ${mongoose.connection.host}`);
};

export default connectDB;

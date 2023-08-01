import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const connectDbUri: string = process.env.DATABASE_URI as string;
  try {
    await mongoose.connect(connectDbUri);
    console.log("DB connected");
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;

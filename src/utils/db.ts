import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let isConnected: boolean;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  try {
    const conn = await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log(`MongoDB connected Successfully ${conn.connection.host}`);
  } catch (error: unknown) {
    console.log("MongoDb connection error", error);
    throw new Error("Could not connected to MongoDB");
  }
};

export default connectDB;

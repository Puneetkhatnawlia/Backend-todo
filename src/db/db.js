//db.js file
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
export const connectDb = async () => {
  mongoose.connect(MONGO_URI).then((con) => {
    console.log("Connected to MongoDB", con.connection.host);
  });
};

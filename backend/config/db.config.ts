import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = () => {
  // Assures TS that mongodbUri is a string
  const mongodbUri: string = process.env.MONGODBURI!;
  mongoose.connect(mongodbUri);
  const db = mongoose.connection;
  db.on("connected", () => {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
  });
};

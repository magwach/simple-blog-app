import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to Mongoose"))
  .catch((e) =>
    console.log("An error occurred while connecting to Mongoose", e)
  );

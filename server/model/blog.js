import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Blog", blogSchema);
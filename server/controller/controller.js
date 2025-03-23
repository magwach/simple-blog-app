import mongoose from "mongoose";

import blog from "../model/blog.js";

export const fetchBlogs = async (req, res) => {
  let blogList;

  try {
    blogList = await blog.find();
  } catch (e) {
    console.log(e);
  }

  return res.status(200).json({ blogList });
};


export const addBlog = async (req, res) => {
  const { title, description } = req.body;

  const newBlog = new blog({ title, description });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await newBlog.save({ session });
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ newBlog });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ message: "Failed to add blog", error: e.message });
  }
};

export const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const foundBlog = await blog.findByIdAndDelete(id, { session });

    if (!foundBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ message: "Failed to delete blog", error: e.message });
  }
};


export const updateBlog = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  let updatedBlog;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    updatedBlog = await blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true, session }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ updatedBlog });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(500)
      .json({ message: "Failed to update blog", error: e.message });
  }
};

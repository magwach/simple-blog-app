import express from "express";
const router = express.Router();

import { fetchBlogs, addBlog, deleteBlog, updateBlog } from "../controller/controller.js";

router.get("/", fetchBlogs);
router.post("/add", addBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;

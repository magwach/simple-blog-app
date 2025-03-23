import express from "express";
import cors from "cors";
import "./db/index.js";
import router from "./route/route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/blogs", router);

app.use((req, res, next) => {
    res.status(404).json({ message: "Oops! The page you're looking for does not exist." });
    next();
  });
app.listen(5000, () => console.log("listening on port 5000"));

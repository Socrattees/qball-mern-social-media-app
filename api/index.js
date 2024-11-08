import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";
import helmet from "helmet";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url"; //function converts file URL to URL path

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to mongoDB");
}); //ip is localhost, but needed in this format

//below variables needed to be created as they are not available in ES6 by default
const __filename = fileURLToPath(import.meta.url); //arg contains URL of current module and converst to file path
const __dirname = path.dirname(__filename); //extracts directory from the file path
app.use("/images", express.static(path.join(__dirname, "public/images"))); 

//middleware
app.use(express.json()); //ensures json requests can be parsed into requests
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.listen(8800, () => {
  console.log("api server is running...");
});
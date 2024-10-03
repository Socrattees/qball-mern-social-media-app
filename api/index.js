import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";
import helmet from "helmet";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to mongoDB");
}); //ip is localhost, but needed in this format

//middleware

app.use(express.json()); //ensures json requests can be parsed into requests
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Welcome to home page");
})

app.listen(8800, () => {
  console.log("api server is running...");
});
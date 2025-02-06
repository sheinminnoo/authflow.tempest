import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { Application } from "express";
import mongoose from "mongoose";
import { Request, Response } from "express";

const app: Application = express();
dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URL!;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "status 200 , working" });
});

import authRouter from "./routes/routes.auths/authRoutes";
app.use("/api/auth", authRouter);

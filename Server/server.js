import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";

import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
connectDB();

const port = process.env.PORT || 4000;

const allowedOrigins = ["http://localhost:5173"];

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowedOrigins })); // ✅ Important: add origin here

// Routes
app.get("/", (req, res) => {
  res.send("Tere LoL");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

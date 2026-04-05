import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import messageRouter from "./router/messageRouter.js";


import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();

// ✅ CORS FIX
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// 🔥 VERY IMPORTANT LINE
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/hospitals", hospitalRoutes);
// ROUTES
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/message", messageRouter);



export default app;
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import messageRouter from "./router/messageRouter.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();

// ✅ FIXED CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.options("*", cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.use("/api/v1/hospitals", hospitalRoutes);
app.use("/api/v1/feedback", feedbackRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/message", messageRouter);

export default app;
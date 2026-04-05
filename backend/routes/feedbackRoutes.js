import express from "express";
import { sendFeedback ,getAllFeedbacks } from "../controller/feedbackController.js";

const router = express.Router();

router.post("/send", sendFeedback);

router.get("/all", getAllFeedbacks); 

export default router;
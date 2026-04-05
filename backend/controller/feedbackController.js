import Feedback from "../models/feedbackModel.js";

export const sendFeedback = async (req, res) => {
  try {
    // ✅ ADD THIS LINE HERE
    console.log("DATA RECEIVED:", req.body);

    const { type, firstName, lastName, phone, email, hospital, message } = req.body;

    if (!type || !firstName || !lastName || !phone || !email || !hospital || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const feedback = await Feedback.create({
      type,
      firstName,
      lastName,
      phone,
      email,
      hospital,
      message,
    });

    // ✅ ALSO ADD THIS (VERY IMPORTANT)
    console.log("SAVED FEEDBACK:", feedback);

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });

  } catch (error) {
    console.log("ERROR:", error); // 👈 keep this
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      feedbacks,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedbacks",
    });
  }
};
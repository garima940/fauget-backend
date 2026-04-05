

import { sendEmail } from "../utils/sendEmail.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";


export const postAppointment = async (req, res) => {
  console.log("📥 Incoming data:", req.body);

  try {
    const {
      firstName,
      lastName,
      email,
      appointment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      address
    } = req.body;

    // ✅ SAVE TO DATABASE
    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      appointment_date,
      department,
      doctor: `${doctor_firstName} ${doctor_lastName}`,
      address,
    });

    console.log("✅ Appointment saved");

    // ⚠️ TEMPORARILY DISABLE EMAIL (IMPORTANT)
    /*
    await sendEmail(
      email,
      "Appointment Confirmation",
      `<h2>Appointment Confirmed</h2>`
    );
    */

    // ✅ ALWAYS RETURN RESPONSE
    return res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    console.log("❌ Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

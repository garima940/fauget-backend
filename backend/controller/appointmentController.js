import { sendEmail } from "../utils/sendEmail.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

// ✅ CREATE APPOINTMENT
export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  console.log("📥 Incoming Data:", req.body);

  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;

  // ✅ VALIDATION
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  // ✅ FIND DOCTOR
  const doctors = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (doctors.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (doctors.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Support!",
        400
      )
    );
  }

  const doctorId = doctors[0]._id;

  // ⚠️ SAFE USER CHECK
  const patientId = req.user ? req.user._id : null;

  const appointmentId = "APT" + Date.now();

  // ✅ CREATE APPOINTMENT
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
    appointmentId,
  });

  console.log("✅ Appointment saved");

  // ✅ NON-BLOCKING EMAIL (WILL NOT BREAK API)
  sendEmail(
    email,
    "Appointment Confirmation",
    `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Fauget Hospital</h2>
      <h3 style="color: green;">Appointment Confirmed</h3>

      <p><b>Appointment ID:</b> ${appointmentId}</p>
      <p><b>Patient:</b> ${firstName} ${lastName}</p>
      <p><b>Doctor:</b> ${doctor_firstName} ${doctor_lastName}</p>
      <p><b>Date:</b> ${appointment_date}</p>
      <p><b>Department:</b> ${department}</p>

      <hr/>
      <p>Please arrive 10 minutes early.</p>
    </div>
    `
  ).catch((err) => {
    console.log("❌ Email failed:", err.message);
  });

  // ✅ ALWAYS RETURN RESPONSE (IMPORTANT)
  return res.status(200).json({
    success: true,
    message: "Appointment booked successfully",
    appointment,
  });
});


// ✅ GET ALL APPOINTMENTS
export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();

  return res.status(200).json({
    success: true,
    appointments,
  });
});


// ✅ UPDATE APPOINTMENT STATUS
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;

    let appointment = await Appointment.findById(id);

    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
      appointment,
    });
  }
);


// ✅ DELETE APPOINTMENT
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }

  await appointment.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});
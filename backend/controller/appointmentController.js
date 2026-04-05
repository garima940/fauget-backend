

import { sendEmail } from "../utils/sendEmail.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
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
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "Doctors Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
const appointmentId = "APT" + Date.now();

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

 // ✅ 🔥 ADD EMAIL HERE
 await sendEmail(
  email,
  "Appointment Confirmation",
  `
  <div style="font-family: Arial; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 500px; margin: auto;">
    
    <h2 style="color: #2c3e50; text-align: center;">
      Fauget Hospital
    </h2>
    
    <h3 style="color: green; text-align: center;">
      Appointment Confirmed
    </h3>

    <p>
      <img src="https://img.icons8.com/ios-filled/20/000000/ticket.png"/>
      <strong> Appointment ID:</strong> ${appointmentId}
    </p>

    <p>
      <img src="https://img.icons8.com/ios-filled/20/000000/user.png"/>
      <strong> Patient:</strong> ${firstName} ${lastName}
    </p>

    <p>
      <img src="https://img.icons8.com/ios-filled/20/000000/stethoscope.png"/>
      <strong> Doctor:</strong> ${doctor_firstName} ${doctor_lastName}
    </p>

    <p>
      <img src="https://img.icons8.com/ios-filled/20/000000/calendar.png"/>
      <strong> Date:</strong> ${appointment_date}
    </p>

    <p>
      <img src="https://img.icons8.com/ios-filled/20/000000/hospital.png"/>
      <strong> Department:</strong> ${department}
    </p>

    <hr/>

    <p style="color: #555; text-align: center;">
      Please arrive 10 minutes early.<br/>
      Thank you for choosing us.
    </p>

  </div>
  `
);








  
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send!",
  });

});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});
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
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);
export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});

import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userSchema.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const addDoctor = async () => {
  const doctor = await User.create({
    firstName: "Rahul",
    lastName: "Mehta",
    email: "rahul@gmail.com",
    phone: "9876543212",
    nic: "1234567890789",
    dob: "1992-04-10",
    gender: "Male",
    password: "12345678", // will auto-hash if schema has middleware
    role: "Doctor",
    doctorDepartment: "Cardiology",
     hospital: hospitalName,
  });

  console.log("Doctor Added:", doctor);
  process.exit();
};

addDoctor("Fortis Escorts Heart Institute");
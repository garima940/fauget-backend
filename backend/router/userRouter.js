/**kjkjkjkj */
import { getDoctorsByHospital } from "../controller/userController.js";
import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
  sendOtp,
  getAllHospitals,
  verifyOtp,
   getDoctorsByDepartment 
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.get("/hospitals", getAllHospitals);

router.get("/doctors/hospital/:name", getDoctorsByHospital);
router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);
router.get("/doctors", getAllDoctors);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/logout", logoutPatient);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get(
  "/doctors/department/:department",
  getDoctorsByDepartment
);
export default router;

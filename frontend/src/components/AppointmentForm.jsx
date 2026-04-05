import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation ,useNavigate} from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentForm = ({ doctorId }) => {
  const location = useLocation();
const navigate = useNavigate();
  const [timeSlot, setTimeSlot] = useState("");

  // ✅ Patient Details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  // ✅ Appointment Details
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const [doctors, setDoctors] = useState([]);

  // ✅ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://fauget-backend-production.up.railway.app/api/v1/user/doctors"
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Auto-fill from DoctorProfile
  useEffect(() => {
    if (location.state) {
      setDoctorFirstName(location.state.doctorFirstName || "");
      setDoctorLastName(location.state.doctorLastName || "");
      setDepartment(location.state.department || "");
    }
  }, [location.state]);

  // ✅ Auto-select doctor using doctorId
  useEffect(() => {
    if (doctorId && doctors.length > 0) {
      const selectedDoctor = doctors.find((doc) => doc._id === doctorId);

      if (selectedDoctor) {
        setDepartment(selectedDoctor.doctorDepartment);
        setDoctorFirstName(selectedDoctor.firstName);
        setDoctorLastName(selectedDoctor.lastName);
      }
    }
  }, [doctorId, doctors]);

  // ✅ Submit appointment
  const handleAppointment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

if (!token) {
  toast.error("Please log in first");

  setTimeout(() => {
    navigate("/login");
  }, 1500);

  return;
}

const { data } = await axios.post(
  "https://fauget-backend-production.up.railway.app/api/v1/appointment/post",
  {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date: appointmentDate,
    timeSlot,
    department,
    doctor_firstName: doctorFirstName,
    doctor_lastName: doctorLastName,
    hasVisited,
    address,
  },
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
);
      toast.success(data.message);

      // ✅ Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setTimeSlot("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error booking appointment");
    }
  };

  return (
    <div className="appointment-form">
      <h2 className="form-title">Book an Appointment</h2>
      <p className="form-subtitle">
        Fill the form below to schedule your visit
      </p>

      <form onSubmit={handleAppointment} className="appointment-grid">
        {/* 👤 PATIENT INFO */}
        <h3 className="form-section">Patient Information</h3>

        <div className="form-group">
          <label>First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>NIC</label>
          <input
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* 🏥 APPOINTMENT DETAILS */}
        <h3 className="form-section">Appointment Details</h3>

        <div className="form-group">
          <label>Appointment Date</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input value={department} disabled />
        </div>

        <div className="form-group">
          <label>Doctor</label>
          <input
            value={`${doctorFirstName} ${doctorLastName}`}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Time Slot</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            <option value="">Select Time</option>
            <option>10:00 AM</option>
            <option>11:00 AM</option>
            <option>12:00 PM</option>
            <option>2:00 PM</option>
            <option>4:00 PM</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Address</label>
          <textarea
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="checkbox-row full-width">
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
          />
          <label>Have you visited before?</label>
        </div>

        {/* ✅ FIXED BUTTON */}
        <button type="submit" className="submit-btn full-width">
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
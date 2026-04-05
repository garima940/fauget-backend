import Contact from "./Pages/Contact";
import About from "./Pages/About";
import SpecialityPage from "./Pages/SpecialityPage";
import axios from "axios";
import DoctorProfile from "./Pages/DoctorProfile";
import React, { useContext, useEffect } from "react";
import "./App.css";
import Hospitallist from "./Pages/HospitalList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import AddDoctor from "./Pages/AddDoctor";
import DoctorsList from "./Pages/DoctorsList";
import Home from "./Pages/Home";
import HospitalDetails from "./Pages/HospitalDetails";
import Appointment from "./Pages/Appointment";
import HospitalList from "./Pages/HospitalDetails";
import Register from "./Pages/Register";
import Departments from "./components/Departments";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Context } from "./main";
import Login from "./Pages/Login";

const App = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(
        "https://fauget-backend-production.up.railway.app/api/v1/user/patient/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

   setUser(res.data.user);
setIsAuthenticated(true);

// also store in localStorage
localStorage.setItem("user", JSON.stringify(res.data.user));

    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
    }
  };

  fetchUser();
}, []);

  return (
    <Router>
      <Navbar />

      <Routes>
<Route path="/hospitals" element={<Hospitallist />} />
        <Route path="/hospital/:name" element={<HospitalDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
       <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
<Route path="/hospital/:name" element={<HospitalDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-doctor" element={<AddDoctor />} />
      <Route path="/about" element={<About />} />
<Route path="/speciality/:speciality" element={<SpecialityPage />} />
        <Route path="/doctors" element={<DoctorsList />} />
      </Routes>

      <Footer />
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
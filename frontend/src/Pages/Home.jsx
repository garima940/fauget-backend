import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorsList from "./DoctorsList";

<DoctorsList />
const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
 const navigate = useNavigate();
  const toggleMenu = () => {
    document.getElementById("navLinks").classList.toggle("active");
  };

  return (
    <>
      

      {/* ===== FORTIS HERO SECTION ===== */}
      <div className="fortis-section">

  {/* TEXT */}
  
</div>



    {/* CARDS */}
    <div className="fortis-cards">

  {/* BOOK APPOINTMENT */}
  <div 
    className="fortis-card"
    onClick={() => navigate("/doctors")}
    style={{ cursor: "pointer" }}
  >
    <h3>Book an Appointment</h3>
    <p>With country's leading experts</p>
  </div>

  {/* HOSPITALS */}
<div
  className="fortis-card"
  onClick={() => navigate("/hospitals")}
  style={{ cursor: "pointer" }}
>
    <h3>Hospitals</h3>
    <p>Health needs under one roof</p>
  </div>

  {/* SPECIALITIES */}
  <div
  className="fortis-card"
  onClick={() => navigate("/hospitals")}
  style={{ cursor: "pointer" }}
>
    <h3>Specialities</h3>
    <p>Our expertise in healthcare</p>
  </div>

  {/* DOCTORS */}
  <div 
    className="fortis-card"
    onClick={() => navigate("/doctors")}
    style={{ cursor: "pointer" }}
  >
    <h3>Doctors</h3>
    <p>Top experts for your health</p>
  </div>

</div>

      {/* EXTRA CARDS (OPTIONAL) */}
      <div className="cards">
        <div className="card">Book Appointment</div>
        <div className="card">Find Hospital</div>
        <div className="card">Consult Online</div>
      </div>

      {/* ===== LOGIN MODAL ===== */}
      {showLogin && (
        <div className="login-overlay">
          <div className="login-box">
            {/* LEFT PANEL */}
            <div className="login-left">
              <div className="feature">
                <div className="icon">👤</div>
                <p>Access your health records in one place</p>
              </div>

              <div className="feature">
                <div className="icon">📋</div>
                <p>Track appointments and visits</p>
              </div>

              <div className="feature">
                <div className="icon">🧪</div>
                <p>View lab reports and results</p>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="login-right">
              <span
                className="close-btn"
                onClick={() => setShowLogin(false)}
              >
                ✖
              </span>

              <h2>Login / Register</h2>

              <div className="login-tabs">
                <button className="active">Mobile</button>
                <button>Email</button>
              </div>

              <label>Mobile Number*</label>

              <div className="phone-input">
                <span>+91</span>
                <input type="text" placeholder="Enter Phone no." />
              </div>

              <div className="terms">
                <input type="checkbox" />
                <p>I agree to Terms & Privacy Policy</p>
              </div>

              <button className="otp-btn">Get OTP</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
import { useState } from "react";
import "./Login.css";
import { FaUserAlt, FaClipboardList, FaVial, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";


const Login = ({ onClose }) => {
  
  // STATES
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const [errors, setErrors] = useState({});
  // form | otp

  // VALIDATION
 const validate = () => {
  let newErrors = {};

  if (!email) newErrors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Invalid email";
  }

  if (!password) newErrors.password = "Password is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // HANDLE SUBMIT
 const handleSubmit = async () => {
  if (!validate()) return;

  try {
    const res = await axios.post(
      "https://fauget-backend-production.up.railway.app/api/v1/user/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
toast.success(
  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    
    Welcome back, {res.data.user.firstName}!
  </span>
);

    setTimeout(() => {
      window.location.href = "/";
      onClose();
    }, 1500);
  } catch (err) {
      console.log(err.response); // 👈 ADD THIS
    toast.error(
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      "Something went wrong"
    );
  }
};

  

  

  return (
    <div className="login-overlay">
      <div className="login-container">
        {/* LEFT PANEL */}
        <div className="left">
          <div className="left-content">
            <div className="item">
              <div className="circle"><FaUserAlt size={20} /></div>
              <p>Access your health records in one place</p>
            </div>

            <div className="item">
              <div className="circle"><FaClipboardList size={20} /></div>
              <p>Keep a track of appointments and doctor visits</p>
            </div>

            <div className="item">
              <div className="circle"><FaVial size={20} /></div>
              <p>View your medical records and lab reports</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right">
          <button className="close" onClick={onClose}>×</button>

          <h2 className="title">Login / Register Account</h2>

          

          {/* FORM STEP */}
        <>
  <label>Email*</label>
  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter Email"
  />
  {errors.email && <p className="error">{errors.email}</p>}

  <label>Password*</label>
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter Password"
  />
  {errors.password && <p className="error">{errors.password}</p>}

  <button className="btn" onClick={handleSubmit}>
    Login
  </button>

  <p style={{ marginTop: "12px", textAlign: "center" }}>
    Don't have an account?{" "}
    <span
      onClick={() => (window.location.href = "/register")}
      style={{ color: "#007bff", cursor: "pointer", fontWeight: "600" }}
    >
      Register
    </span>
  </p>
</>

        </div>
      </div>
    </div>
  );
};

export default Login;
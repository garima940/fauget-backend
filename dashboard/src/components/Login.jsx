import { useState } from "react";
import "./Login.css";
import { FaUserAlt, FaClipboardList, FaVial } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ onClose }) => {
  // ✅ STATES (ONLY EMAIL LOGIN)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!agreed) newErrors.terms = "Please accept terms";

    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ HANDLE LOGIN
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(`Welcome back, ${res.data.user.firstName}! 🎉`);

      setTimeout(() => {
        window.location.href = "/";
        onClose();
      }, 1500);

    } catch (err) {
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

          {/* EMAIL LOGIN ONLY */}
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

          <div className="terms">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
            />
            <span>I agree to Terms & Privacy</span>
          </div>
          {errors.terms && <p className="error">{errors.terms}</p>}

          <button className="btn" onClick={handleSubmit}>
            Login
          </button>

          {/* REGISTER LINK */}
          <p style={{ marginTop: "12px", textAlign: "center" }}>
            Don't have an account?{" "}
            <span
              onClick={() => window.location.href = "/register"}
              style={{ color: "#007bff", cursor: "pointer", fontWeight: "600" }}
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
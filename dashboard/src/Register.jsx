import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    nic: "",
    dob: "",
    gender: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
  if (!validate()) return;

  try {
    const res = await axios.post(
      "http://localhost:5000/api/v1/user/patient/register",
      form
    );

    // ✅ SUCCESS MESSAGE
    alert(res.data.message);

    // redirect to login
    window.location.href = "/login";

  } catch (err) {
    // ❌ ERROR MESSAGE
   toast.success("Registered successfully!");
toast.error("User already exists");
  }
};

  return (
    <div className="register-overlay">
      <div className="register-container">
        <button className="close-btn" onClick={onClose}>×</button>
      <h2>Register</h2>


      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="nic" placeholder="NIC" onChange={handleChange} />
      <input name="dob" type="date" onChange={handleChange} />

      <select name="gender" onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} style={{ color: "blue", cursor: "pointer" }}>
          Login
        </span>
      </p>
    </div></div>
  );
};

export default Register;
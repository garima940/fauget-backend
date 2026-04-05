import { useState } from "react";
import "./Register.css";
import axios from "axios";




const Register = () => {
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

  const [errors, setErrors] = useState({});

 const handleChange = (e) => {
  console.log(e.target.name, e.target.value); // 👈 ADD THIS

  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

  // ✅ VALIDATION
  const validate = () => {
    let err = {};

 if (!form.nic) err.nic = "NIC required";
else if (!/^\d{13}$/.test(form.nic))
  err.nic = "NIC must be exactly 13 digits";

    if (!form.firstName) err.firstName = "First name required";
    if (!form.lastName) err.lastName = "Last name required";

    if (!form.email) err.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Invalid email";

    if (!form.phone) err.phone = "Phone required";
    else if (!/^[6-9]\d{9}$/.test(form.phone))
      err.phone = "Invalid phone";

    if (!form.password) err.password = "Password required";
    else if (form.password.length < 8)
      err.password = "Minimum 8 characters";

    if (!form.nic) err.nic = "NIC required";
    if (!form.dob) err.dob = "DOB required";
    if (!form.gender) err.gender = "Select gender";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleRegister = async () => {
     const currentForm = { ...form };   // ⭐ TAKE SNAPSHOT
  console.log("FINAL DATA:", form);

  if (!validate()) {
    console.log("Validation errors:", errors);
    return;
  }

    try {
      await axios.post(
        "https://fauget-backend-production.up.railway.app/api/v1/user/patient/register",
         currentForm   // ⭐ USE THIS
      );

      alert("Registered Successfully!");
      window.location.href = "/login";

    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

 return (
  <div className="register-overlay">
    <div className="register-container">

      {/* LEFT PANEL */}
      <div className="left">
        <div className="left-content">
          <h2>Welcome!</h2>
          <p>Create your account to continue</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right">

        {/* ✅ FIXED CLOSE BUTTON */}
        <button 
          className="close-btn" 
          onClick={() => window.location.href = "/"}
        >
          ×
        </button>

        <h2 className="title">Register</h2>

        <input name="firstName" value={form.firstName} placeholder="First Name" onChange={handleChange}/>
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <input name="lastName" value={form.lastName} placeholder="Last Name" onChange={handleChange}/>
        {errors.lastName && <p className="error">{errors.lastName}</p>}

        <input name="email" value={form.email} placeholder="Email" onChange={handleChange}/>
        {errors.email && <p className="error">{errors.email}</p>}

        <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange}/>
        {errors.phone && <p className="error">{errors.phone}</p>}

        <input type="password" name="password" value={form.password} placeholder="Password" onChange={handleChange}/>
        {errors.password && <p className="error">{errors.password}</p>}

        <input name="nic" value={form.nic} placeholder="NIC" onChange={handleChange}/>
        {errors.nic && <p className="error">{errors.nic}</p>}

        <input type="date" name="dob" value={form.dob} onChange={handleChange}/>
        {errors.dob && <p className="error">{errors.dob}</p>}

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        {errors.gender && <p className="error">{errors.gender}</p>}

        <button className="btn" onClick={handleRegister}>
          Register
        </button>

      </div>
    </div>
  </div>
);
};

export default Register;
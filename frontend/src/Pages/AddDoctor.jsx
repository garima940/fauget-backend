import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddDoctor = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    doctorDepartment: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/doctor/addnew",
        form,
        { withCredentials: true }
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h2>Add Doctor</h2>

      <form onSubmit={handleAddDoctor}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="nic" placeholder="NIC" onChange={handleChange} />
        <input type="date" name="dob" onChange={handleChange} />

        <select name="gender" onChange={handleChange}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input name="password" placeholder="Password" onChange={handleChange} />

        <select name="doctorDepartment" onChange={handleChange}>
          <option value="">Department</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Cardiology">Cardiology</option>
        </select>

        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctor;
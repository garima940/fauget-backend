import React, { useEffect, useState } from "react";
import axios from "axios";

const Departments = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/user/doctors"
        );
        setDoctors(res.data.doctors);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Departments & Doctors</h1>

      <div className="doctor-grid">
        {doctors.map((doc) => (
          <div key={doc._id} className="doctor-card">

            {/* ✅ FALLBACK IMAGE FIX HERE */}
            <img
              src={doc.docAvatar?.url || "https://via.placeholder.com/200"}
              alt="doctor"
            />

            <h3>{doc.firstName} {doc.lastName}</h3>

            <p><b>Department:</b> {doc.doctorDepartment}</p>
            <p><b>Email:</b> {doc.email}</p>
            <p><b>Phone:</b> {doc.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
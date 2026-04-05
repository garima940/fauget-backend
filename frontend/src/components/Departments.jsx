import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Departments = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const navigate = useNavigate();

const handleClick = (dept) => {
  navigate(`/speciality/${dept.toLowerCase()}`);
};

  // ✅ Fetch doctors from backend
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

  const departmentsArray = [
    { name: "Pediatrics", imageUrl: "/departments/pedia.jpg" },
    { name: "Orthopedics", imageUrl: "/departments/ortho.jpg" },
    { name: "Cardiology", imageUrl: "/departments/cardio.jpg" },
    { name: "Neurology", imageUrl: "/departments/neuro.jpg" },
    { name: "Oncology", imageUrl: "/departments/onco.jpg" },
    { name: "Radiology", imageUrl: "/departments/radio.jpg" },
    { name: "Physical Therapy", imageUrl: "/departments/therapy.jpg" },
    { name: "Dermatology", imageUrl: "/departments/derma.jpg" },
    { name: "ENT", imageUrl: "/departments/ent.jpg" },
  ];

  return (
    <div className="container departments">

      {/* ✅ SHOW DEPARTMENTS */}
      {selectedDept === "" && (
        <>
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            Departments
          </h2>

          <div className="departments-grid">
            {departmentsArray.map((depart, index) => (
              <div
                key={index}
                className="department-card"
                onClick={() => setSelectedDept(depart.name)}
                style={{ cursor: "pointer" }}
              >
                <img src={depart.imageUrl} alt={depart.name} />
                <div className="department-name">{depart.name}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ✅ SHOW DOCTORS */}
      {selectedDept !== "" && (
        <>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            {selectedDept} Specialists
          </h2>

          {/* 🔙 Back Button */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={() => setSelectedDept("")}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                background: "#0077b6",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ← Back to Departments
            </button>
          </div>

          {/* 👨‍⚕️ Doctor Cards */}
          <div className="doctor-grid">
            {doctors
              .filter((doc) => doc.doctorDepartment === selectedDept)
              .map((doc) => (
                <div
                  key={doc._id}
                  className="doctor-card"
                  onClick={() =>
                    navigate(`/doctor/${doc._id}`,)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={
                      doc.docAvatar?.url ||
                      "https://i.pravatar.cc/150?img=3"
                    }
                    alt="doctor"
                  />

                  <h3>
                    {doc.firstName} {doc.lastName}
                  </h3>

                  <p>
                    <b>Department:</b> {doc.doctorDepartment}
                  </p>
                  <p>
                    <b>Email:</b> {doc.email}
                  </p>
                  <p>
                    <b>Phone:</b> {doc.phone}
                  </p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Departments;
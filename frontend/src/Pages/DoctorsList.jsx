import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";

const doctorImages = [
  "/doctors/doctor1.jpg",
  "/doctors/doctor2.jpg",
  "/doctors/doctor3.jpg",
  "/doctors/doctor4.jpg",
];

const DoctorsList = ({ doctors: propDoctors }) => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [hospital, setHospital] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch Doctors
  useEffect(() => {
    if (!propDoctors) {
      const fetchDoctors = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:5000/api/v1/user/doctors"
          );
          setDoctors(data.doctors);
        } catch (error) {
          console.log(error);
        }
      };
      fetchDoctors();
    } else {
      setDoctors(propDoctors);
    }
  }, [propDoctors]);

  const departmentList = [
    ...new Set(doctors.map((doc) => doc.doctorDepartment).filter(Boolean)),
  ];

  const hospitalList = [
    ...new Set(doctors.map((doc) => doc.hospital).filter(Boolean)),
  ];

  // ✅ Filter Logic
  const filteredDoctors = doctors.filter((doc) => {
    return (
      (doc.firstName.toLowerCase().includes(search.toLowerCase()) ||
        doc.lastName.toLowerCase().includes(search.toLowerCase())) &&
      (department ? doc.doctorDepartment === department : true) &&
      (hospital ? doc.hospital === hospital : true)
    );
  });

  return (
    <div className="doctors-page">
      {/* 🔍 SEARCH */}
      <div className="doctor-top-bar">
        <input
          type="text"
          placeholder="Search doctor..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {departmentList.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select onChange={(e) => setHospital(e.target.value)}>
          <option value="">All Hospitals</option>
          {hospitalList.map((hosp, index) => (
            <option key={index} value={hosp}>
              {hosp}
            </option>
          ))}
        </select>
      </div>

      {/* 👩‍⚕️ DOCTOR CARDS */}
      <div className="doctor-grid">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc, index) => (
            <div className="doctor-card" key={doc._id}>
              
              {/* IMAGE */}
              <img
                src={doctorImages[index % doctorImages.length]}
                alt="doctor"
                className="doctor-img"
              />

              {/* NAME */}
              <h3>
                Dr. {doc.firstName} {doc.lastName}
              </h3>

              {/* DEPARTMENT */}
              <p className="department">{doc.doctorDepartment}</p>

              {/* HOSPITAL */}
              <p className="hospital">
                {doc.hospitalName || "Fauget Medical Centre"}
              </p>

              {/* ✅ NEW INFO SECTION */}
              <div className="doctor-info-row">
                
                {/* EXPERIENCE */}
                <div className="info-box">
                  <FaRegCalendarAlt className="icon" />
                  <div>
                    <p className="value">
                      {doc.experience || "10 years"} 
                    </p>
                    <p className="label">Experience</p>
                  </div>
                </div>

                {/* FEES */}
                <div className="info-box">
                  
                  <div>
                    <p className="value">
                      ₹ {doc.fees || "1000"}
                    </p>
                    <p className="label">Fees</p>
                  </div>
                </div>

              </div>

              {/* BUTTON */}
              <button
                onClick={() =>
                  navigate("/appointment", {
                    state: {
                      doctorId: doc._id,
                      doctorFirstName: doc.firstName,
                      doctorLastName: doc.lastName,
                      department: doc.doctorDepartment,
                    },
                  })
                }
              >
                Book Appointment
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No doctors found
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
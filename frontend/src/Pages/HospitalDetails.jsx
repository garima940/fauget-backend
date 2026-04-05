import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegCalendarAlt } from "react-icons/fa";

const doctorImages = [
  "/doctors/doctor1.jpg",
  "/doctors/doctor2.jpg",
  "/doctors/doctor3.jpg",
  "/doctors/doctor4.jpg",
];

const HospitalDetails = () => {
  const navigate = useNavigate();
  const { name } = useParams();

  // ✅ FIX: correct decoding
  const decodedName = decodeURIComponent(name);

  const [doctorLoading, setDoctorLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  // ✅ FETCH DOCTORS
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log("Fetching doctors for:", decodedName);

        const { data } = await axios.get(
          `https://fauget-backend-production.up.railway.app/api/v1/user/doctors/hospital/${encodeURIComponent(decodedName)}`
        );

        setDoctors(data.doctors || []);
      } catch (error) {
        console.log("Doctor fetch error:", error);
      } finally {
        setDoctorLoading(false);
      }
    };

    fetchDoctors();
  }, [decodedName]);

  const hospitalImages = {
    "Fauget Heart Institute,Defence Colony,New Delhi": "/hospitals/delhi1.jpg",
    "Fauget Medical Centre,Chirag Enclave,New Delhi": "/hospitals/delhi2.jpg",
    "Fauget Medical Centre, Mohali": "/hospitals/mohali.jpg",
"Fauget La Femme,Shalimar Bagh,New Delhi": "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    "Fauget Hospital Mall Road, Ludhiana": "/hospitals/ludhiana.jpg",
    "Fauget Medical Centre, Bathinda": "/hospitals/bathinda.jpg",
    "Fauget Medical Centre, Gurgaon": "/hospitals/gurgaon.jpg",
    "Fauget Hospital, Faridabad": "/hospitals/faridabad.png",
    "Fauget Medical Centre, Panipat": "/hospitals/panipat.jpg",
  };

  return (
    <div className="hospital-page">
      {/* HERO */}
     <div className="hero-section">

    <img
      src={hospitalImages[decodedName] || "/hospitals/default.jpg"}
      alt="hospital"
      className="hospital-img"
    />
  </div>


      {/* TITLE */}
      <div className="hospital-title">
        <h1>{decodedName}</h1>
      </div>

      {/* STATS */}
      <div className="hospital-stats">
        <div className="stat-card beds">
          <h2>259</h2>
          <p>Hospital Beds</p>
        </div>

        <div className="stat-card ot">
          <h2>6</h2>
          <p>OTs</p>
        </div>

        <div className="stat-card icu">
          <h2>8</h2>
          <p>ICUs</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container">
        <p className="description">
          This is a multi-speciality hospital providing top healthcare services.
        </p>

        {/* BANNERS */}
        <div className="banner-row">
          <img src="https://via.placeholder.com/300x150" alt="" />
          <img src="https://via.placeholder.com/300x150" alt="" />
          <img src="https://via.placeholder.com/300x150" alt="" />
        </div>

        {/* DOCTORS */}
        <h2>Our Team of Experts</h2>

        <div className="doctor-grid">
          {doctorLoading ? (
            <p>Loading doctors...</p>
          ) : doctors.length === 0 ? (
            <p>No doctors found</p>
          ) : (
            doctors.map((doc, index) => (
              <div className="doctor-card" key={doc._id}>
                <img
                  src={doctorImages[index % doctorImages.length]}
                  alt="doctor"
                  className="doctor-img"
                />

                <h3>
                  Dr. {doc.firstName} {doc.lastName}
                </h3>

                <p className="department">{doc.doctorDepartment}</p>

                {/* ✅ FIXED HERE */}
                <p className="hospital">{decodedName}</p>

 <FaRegCalendarAlt className="icon" />
                <div className="doctor-info">
                  <span>{doc.experience || "10"}  </span>
                  <span>₹ {doc.fees || "1000"}</span>
                </div>

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
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
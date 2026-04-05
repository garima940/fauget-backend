import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ correct place

  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/user/doctors"
        );

        const foundDoctor = res.data.doctors.find(
          (doc) => doc._id === id
        );

        setDoctor(foundDoctor);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) return <h2>Loading...</h2>;

  return (
    <div className="container doctor-profile-container">
      <div className="doctor-profile-card">

        {/* LEFT SIDE IMAGE */}
        <div className="doctor-image">
          <img
            src={doctor.docAvatar?.url || "https://i.pravatar.cc/150"}
            alt="doctor"
          />
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="doctor-details">
          <h1>
            Dr. {doctor.firstName} {doctor.lastName}
          </h1>

          <p><b>Department:</b> {doctor.doctorDepartment}</p>
          <p><b>Email:</b> {doctor.email}</p>
          <p><b>Phone:</b> {doctor.phone}</p>
          <p><b>Gender:</b> {doctor.gender}</p>

          {/* ✅ FIXED BUTTON */}
          <button
            className="btn appointment-btn"
            onClick={() =>
              navigate("/appointment", {
                state: {
                  doctorFirstName: doctor.firstName,
                  doctorLastName: doctor.lastName,
                  department: doctor.doctorDepartment,
                },
              })
            }
          >
            Book Appointment
          </button>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;
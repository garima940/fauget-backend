




//Optimized filtering performance

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoctorsList from "./DoctorsList";
const SpecialityPage = () => {
  const { speciality } = useParams();
  const [doctors, setDoctors] = useState([]);

  // 🔥 Images
  const specialityImages = {
    dermatology: "/specialities/dermatology.jpg",
    cardiology: "/specialities/cardiology.jpg",
    neurology: "/specialities/neurology.jpg",
    orthopedics: "/specialities/orthopedics.jpg",
    ent: "/specialities/ent.jpg",
    oncology: "/specialities/oncology.jpg",
    pediatrics: "/specialities/pediatrics.jpg",
    radiology: "/specialities/radiology.jpg",
  };

  // 🔥 FETCH DOCTORS BY SPECIALITY
  useEffect(() => {
    if (!speciality) return;

    // Fix case issue (cardiology → Cardiology)
    const formattedSpeciality =
      speciality.charAt(0).toUpperCase() + speciality.slice(1);

    fetch(
      `http://localhost:5000/api/v1/user/doctors/department/${formattedSpeciality}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data.doctors || []);
      })
      .catch((err) => console.log(err));
  }, [speciality]);

  return (
    <div className="speciality-page">
      {/* 🔥 HERO IMAGE */}
      <div className="speciality-hero">
        <img
          src={specialityImages[speciality] || "/specialities/default.jpg"}
          alt="speciality"
        />

        <div className="speciality-overlay">
          <h2>{speciality.toUpperCase()}</h2>
          <p>Comprehensive treatment and expert care</p>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="container">
        <h1>Best {speciality} Hospitals in India</h1>
        <p>
          We provide top quality treatment with experienced doctors in{" "}
          {speciality}.
        </p>

        <h2>Our Team of Experts</h2>
<DoctorsList doctors={doctors} />

       
      </div>
    </div>
  );
};

export default SpecialityPage;
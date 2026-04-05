


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Added validation for feedback form
const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/hospitals/Delhi") // you can change state
      .then((res) => res.json())
      .then((data) => setHospitals(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hospitals</h2>

      {hospitals.map((hospital, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px 0",
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(`/hospital/${encodeURIComponent(hospital.name)}`)
          }
        >
          <h3>{hospital.name}</h3>
          <p>{hospital.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HospitalList;
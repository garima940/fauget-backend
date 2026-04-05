import React from "react";
import { FaHospital, FaBed, FaUserMd, FaBuilding,FaClinicMedical ,FaBullseye, FaGlobe } from "react-icons/fa";
const About = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
    <div className="about-hero">
  <div className="overlay">
    <div className="hero-text">
      <h2>Fauget Medical Centre</h2>
      <p>Leading Integrated Healthcare Services Provider in India</p>
    </div>
  </div>
</div>

      {/* STATS */}
     <div className="about-stats">
<div className="stat-box purple">
  <div className="icon-circle">
    <FaHospital />
  </div>
  <div>
    <h4>4 JCI & 33 NABH</h4>
    <p>ACCREDITED HOSPITALS</p>
  </div>
</div>

<div className="stat-box yellow">
  <div className="icon-circle">
    <FaClinicMedical />
  </div>
  <div>
    <h4>33</h4>
    <p>Healthcare Facilities</p>
  </div>
</div>

<div className="stat-box blue">
  <div className="icon-circle">
    <FaBed />
  </div>
  <div>
    <h4>6,000+</h4>
    <p>Operational Beds</p>
  </div>
</div>

<div className="stat-box pink">
  <div className="icon-circle">
    <FaUserMd />
  </div>
  <div>
    <h4>17,900+</h4>
    <p>Healthcare Professionals</p>
  </div>
</div>

</div>

      {/* ABOUT TEXT */}
      <div className="about-content">
        <h3>About Us</h3>
        <p>
          Fauget Medical Centre Limited is a leading integrated healthcare delivery
          service provider in India. The healthcare verticals of the company
          primarily comprise hospitals, diagnostics, and day care specialty
          facilities.
        </p>
      </div>

      {/* VISION & MISSION */}
    <div className="about-cards">

  <div className="card">
    <FaBullseye className="card-icon" />
    <h4>Vision</h4>
    <p>
      To create a world-class integrated healthcare delivery system in
      India, entailing the finest medical skills combined with
      compassionate patient care.
    </p>
  </div>

  <div className="card">
    <FaGlobe className="card-icon" />
    <h4>Mission</h4>
    <p>
      To be a globally respected healthcare organisation known for
      Clinical Excellence and Distinctive Patient Care.
    </p>
  </div>

</div>

    </div>
  );
};

export default About;
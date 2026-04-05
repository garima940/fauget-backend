import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      {/* ===== TOP GRID ===== */}
      <div className="footer-top">

        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/appointment">Appointment</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
        </div>

        <div className="footer-col">
          <h4>Specialities</h4>
          <p>Cardiology</p>
          <p>Neurology</p>
          <p>Orthopedics</p>
          <p>Dermatology</p>
        </div>

        <div className="footer-col">
          <h4>Our Hospital</h4>
          <p>Fauget Medical Centre</p>
          <p>Delhi NCR</p>
          <p>Maharashtra</p>
          <p>Bangalore</p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>📞 +91 999-999-9999</p>
          <p>✉️ support@fauget.com</p>
          <p>📍 India</p>
        </div>

      </div>

      {/* ===== MIDDLE ===== */}
      <div className="footer-middle">

        <img src="/fauget.webp" alt="logo" className="footer-logo" />

        <p className="stay">STAY IN TOUCH</p>

        <div className="social-icons">
          <FaInstagram />
          <FaFacebookF />
          <FaTwitter />
          <FaYoutube />
        </div>

        <div className="store-buttons">
          <div className="store-btn">
            <span>Download on the</span>
            <h4>App Store</h4>
          </div>

          <div className="store-btn">
            <span>Get it on</span>
            <h4>Google Play</h4>
          </div>
        </div>

      </div>

      {/* ===== BOTTOM ===== */}
      <div className="footer-bottom">
        © 2026 Fauget Medical Centre. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import Login from "../Pages/Login";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
const Navbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
const handleClick = (dept) => {
  navigate(`/speciality/${dept.toLowerCase()}`);
};
  const [activeState, setActiveState] = useState("Delhi");
  const [hospitals, setHospitals] = useState([]);

  const dropdownRef = useRef();

  // ✅ FETCH HOSPITALS FROM BACKEND
useEffect(() => {
 fetch(`http://localhost:5000/api/v1/hospitals/${activeState}`)
    .then((res) => res.json())
    .then((data) => {
      setHospitals(data); // ✅ direct array
    })
    .catch((err) => console.log(err));
}, [activeState]);

  // ✅ LOGIN CHECK
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    window.addEventListener("storage", () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setUser(updatedUser);
    });
  }, []);

  // ✅ CLICK OUTSIDE DROPDOWN
 useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenMenu(null); // ✅ close hospital/special menus also
      setShowDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

const handleLogout = async () => {
  try {
    await axios.get("http://localhost:5000/api/v1/user/patient/logout");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    toast.success("Logged out successfully");

    navigate("/login");

  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
     <button onClick={() => navigate("/doctors")}>
  Find a Doctor
</button>
        <button onClick={() => navigate("/about")}>
  About us
</button>
       <Link to="/contact">Contact us</Link>
      </div>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-left">
          <img src="/fauget.webp" alt="logo" />
        </div>

        {/* CENTER MENU */}
      <div className="nav-center" ref={dropdownRef}>
          <Link to="/">Home</Link>

          {/* HOSPITALS MENU */}
         <div className="mega-parent">
  <div
    className="nav-item"
    onClick={() =>
      setOpenMenu(openMenu === "hospital" ? null : "hospital")
    }
  >
    Hospitals <FaChevronDown className="arrow-icon" />
  </div>

  {openMenu === "hospital" && (
 <div className="mega-menu hospital-menu">
      <div className="mega-left">
        {["Delhi", "Punjab", "Haryana"].map((state) => (
          <p
            key={state}
            className={activeState === state ? "active" : ""}
            onClick={() => setActiveState(state)}
          >
            {state}
          </p>
        ))}
      </div>

      <div className="mega-right">
        {hospitals.length > 0 ? (
hospitals.map((hospital, index) => (
  <Link
    key={index}
    to={`/hospital/${encodeURIComponent(hospital.name)}`}
    className="hospital-link"
  >
    {hospital.name}
  </Link>
))
) : (
  <p>Loading hospitals...</p>
)}
      </div>
    </div>
  )}
</div>
          {/* SPECIALITIES */}
      <div className="mega-parent">
  <div
    className="nav-item"
    onClick={() =>
      setOpenMenu(openMenu === "special" ? null : "special")
    }
  >
    Specialities <FaChevronDown className="arrow-icon" />
  </div>

  {openMenu === "special" && (
    <div className="mega-menu special-menu">
      <div className="grid">
        <li onClick={() => handleClick("Dermatology")}>Dermatology</li>
        <li onClick={() => handleClick("Cardiology")}>Cardiology</li>
        <li onClick={() => handleClick("Orthopedics")}>Orthopedics</li>
        <li onClick={() => handleClick("Radiology")}>Radiology</li>
        <li onClick={() => handleClick("ENT")}>ENT</li>
        <li onClick={() => handleClick("Oncology")}>Oncology</li>
        <li onClick={() => navigate("/speciality/pediatrics")}>Pediatrics</li>
        <li onClick={() => handleClick("Neurology")}>Neurology</li>
      </div>
    </div>
  )}
</div>
        

          <Link to="#">Services</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">
          {user ? (
            <div ref={dropdownRef}>
              <div
                className="avatar"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="avatar-img" />
                ) : (
                  user.firstName?.charAt(0)
                )}
              </div>

              <div className={`dropdown ${showDropdown ? "show" : ""}`}>
                <p className="user-name">
                  <FaUserCircle style={{ marginRight: "6px" }} />
                  {user.firstName} {user.lastName}
                </p>

                <p className="email">{user.email}</p>
                <hr />

                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)}>Login</button>
          )}
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="action-bar">
     <button onClick={() => navigate("/doctors")}>
  📅 Book Appointment
</button>
      </div>

      {/* LOGIN MODAL */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;
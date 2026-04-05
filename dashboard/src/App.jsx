import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { Context } from "./main";
import Register from "./Register";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Departments from "./components/Departments";
import AddDoctor from "./components/AddDoctor";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import AdminLogin from "./Pages/AdminLogin";
import "./App.css";
import HospitalDetails from "./Pages/HospitalDetails";

import Appointment from "./Pages/Appointment";



// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};


// ✅ Wrapper to control Sidebar visibility
const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {/* ❌ Hide Sidebar on login page */}
      {location.pathname !== "/admin/login" && <Sidebar />}
      {children}
    </>
  );
};

import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {/* other routes */}
    </>
  );
}
const App = () => {
  const { setIsAuthenticated, setAdmin } = useContext(Context);

  // ✅ FIXED: runs only once
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(
        "http://localhost:5000/api/v1/user/patient/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User data:", res.data);

    } catch (error) {
      console.log("User fetch error:", error.response?.data || error.message);
    }
  };

  fetchUser();
}, []);
  return (
    <Router>
      <Layout>
        <Routes>

          {/* ✅ PUBLIC ROUTE */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ✅ PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
<Route path="/hospital/:name" element={<HospitalDetails />} />
          <Route
            path="/departments"
            element={
              <ProtectedRoute>
                <Departments />
              </ProtectedRoute>
            }
          />
<Route path="/appointment" element={<Appointment />} />
          <Route
            path="/doctor/addnew"
            element={
              <ProtectedRoute>
                <AddNewDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-doctor"
            element={
              <ProtectedRoute>
                <AddDoctor />
              </ProtectedRoute>
            }
          />
<Route path="/register" element={<Register />} />
          <Route
            path="/admin/addnew"
            element={
              <ProtectedRoute>
                <AddNewAdmin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

<Route path="/speciality/:speciality" element={<Speciality />} />

          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>

      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/admin/add-doctor">Add Doctor</Link>
        <Link to="/doctors">View Doctors</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/messages">Messages</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
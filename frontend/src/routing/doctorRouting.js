// DoctorRouting.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DoctorDashboard from "../pages/doctors/dashboard";
import DoctorProfile from "../pages/doctors/profile/profile";
import Appointment from "../pages/doctors/appointment/appointment";
import Payment from "../pages/doctors/payment/payment";

function DoctorRouting() {
  return (
    <Routes>
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="profile" element={<DoctorProfile />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path="payment" element={<Payment />} />
      {/* Add more doctor-specific routes as needed */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default DoctorRouting;

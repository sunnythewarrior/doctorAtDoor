import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/signup/registration";
import Login from "./pages/login/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorRouting from "./routing/doctorRouting";

function App() {
  // Retrieve userRole from local storage
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  // Extract userRole from userData
  const userRole = userData ? userData?.userRole : null;
  console.log("userRole", userRole);

  return (
    <Router>
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Login />} />
        {userRole !== undefined &&
        userRole !== null &&
        userRole !== "" &&
        userRole === "doctor" ? (
          <Route path="/doctor/*" element={<DoctorRouting />} />
        ) : null}
        {/* Add more routes for other user roles if needed */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;

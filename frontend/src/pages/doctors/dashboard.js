import React from "react";
import { useState, useEffect } from "react";
import { Typography, Button, TextField, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import "../../assets/css/customm.css";
import dashboardImg from "../../assets/images/doctor_dashboard.png";
import SideBar from "../../components/Sidebars/doctorSidebar";
const dashboard = () => {
  return (
    <Grid container="main">
      <SideBar />
      <Grid item xs={12}>
        <img
          src={dashboardImg}
          alt="dashboard"
          style={{ width: "1250px", height: "900px" }}
        />
      </Grid>
    </Grid>
  );
};

export default dashboard;

import React from "react";
import { useSpring, animated } from "react-spring";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import "../../../assets/css/customm.css";
import SideBar from "../../../components/Sidebars/doctorSidebar";
import * as Yup from "yup";
import { Signin } from "../../../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Appointment = () => {
  // Define the fade-in animation
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  return (
    <div>
      <SideBar />
      <animated.div style={fadeIn}>
        <Typography
          variant="h5"
          align="center"
          style={{ color: "skyBlue", marginTop: "90px" }}
        >
          Appointment Page
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" align="center">
          In progress...
        </Typography>
        {/* The rest of your Appointment component code goes here */}
      </animated.div>
    </div>
  );
};

export default Appointment;

import React from "react";
import { useState, useEffect } from "react";
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
import "../../assets/css/customm.css";
import * as Yup from "yup";
import { Signin } from "../../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  useEffect(() => {
    const importAll = (r) => r.keys().map(r);
    const imageFiles = importAll(
      require.context("../../assets/images", false, /\.(jpg)$/)
    );

    const filteredImages = imageFiles.filter((image) => {
      const img = new Image();
      img.src = image;
      return img.width % 2 === 0 && img.height % 2 === 0;
    });

    setImages(filteredImages);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, images]);

  const saveToLocalStorage = (key, value, expirationInMinutes) => {
    const expirationMS = expirationInMinutes * 60 * 60 * 1000; // Convert minutes to milliseconds
    const expirationTime = new Date().getTime() + expirationMS;

    const item = {
      value: value,
      expirationTime: expirationTime,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  const getFromLocalStorage = (key) => {
    const itemString = localStorage.getItem(key);

    if (!itemString) {
      return null;
    }

    const item = JSON.parse(itemString);
    const currentTime = new Date().getTime();

    if (currentTime > item.expirationTime) {
      // Item has expired, remove it from localStorage
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(Signin, values);
        const { token, userId, userRole } = response.data;

        if (response.data.success == true) {
          const userData = {
            userId: userId,
            userRole: userRole,
          };

          // Save userData object to local storage
          localStorage.setItem("userData", JSON.stringify(userData));

          // Save token to local storage with expiration time of 30 minutes
          saveToLocalStorage("token", token, 30);

          toast.success("Login successful!", {
            position: toast.POSITION.TOP_RIGHT,
          });

          setTimeout(() => {
            console.log("hello routing");
            navigate("/doctor/dashboard");
          }, 2000);
        }
      } catch (error) {
        // Show error toast
        toast.error("Login failed. Please check your credentials.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <img
          src={images.length > 0 ? images[currentIndex] : ""}
          alt={`Slideshow Image`}
          onError={(e) => {
            e.target.src = "defaultImage.jpg";
          }}
          className="registration-banner"
        />
      </Grid>
      <Grid item xs={6}>
        <Paper className="paper">
          <Typography
            variant="h5"
            align="center"
            className="registration-title"
          >
            Welcome to Doctor At Door
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Email</Typography>
                <TextField
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Password</Typography>
                <TextField
                  name="password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              className="submit-button"
              fullWidth
            >
              LOGIN
            </Button>
          </form>
          <Link to="/registration" className="regisration-link">
            Don't Have Account?
          </Link>
        </Paper>
      </Grid>
      <ToastContainer autoClose={3000} />
    </Grid>
  );
};

export default Login;

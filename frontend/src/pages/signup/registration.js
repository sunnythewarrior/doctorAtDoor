import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../assets/css/customm.css";
import { ToastContainer, toast } from "react-toastify";
import { Signup } from "../../api";

function Registration() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
    password: Yup.string().required("Password is required"),
    userType: Yup.string().required("User Type is required"),
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

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      userType: "", // Add userType to initialValues
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(Signup, values);
        console.log("response.data.success", response.data.success);
        if (response.data.success == true) {
          toast.success("Registration successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
          });
        }
      } catch (error) {
        console.error("Error during signup:", error);
        toast.error("Internal Server Error", {
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
            Registration Page
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>User Type</Typography>
                <Autocomplete
                  name="userType"
                  options={["Doctor", "Patient"]}
                  getOptionLabel={(option) => option}
                  value={formik.values.userType}
                  onChange={(e, value) =>
                    formik.setFieldValue("userType", value)
                  }
                  onBlur={formik.handleBlur}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      error={
                        formik.touched.userType &&
                        Boolean(formik.errors.userType)
                      }
                      helperText={
                        formik.touched.userType && formik.errors.userType
                      }
                      placeholder="Select User Type"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>First Name</Typography>
                <TextField
                  name="firstName"
                  placeholder="Enter First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Typography>Last Name</Typography>
                <TextField
                  name="lastName"
                  placeholder="Enter Last Name"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <Typography>Mobile Number</Typography>
                <TextField
                  name="mobileNumber"
                  placeholder="Enter Mobile Number"
                  type="text"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNumber}
                  error={
                    formik.touched.mobileNumber &&
                    Boolean(formik.errors.mobileNumber)
                  }
                  helperText={
                    formik.touched.mobileNumber && formik.errors.mobileNumber
                  }
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
              Register
            </Button>
          </form>
          <Link to="/" className="regisration-link">
            Do You Have Account?
          </Link>
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
}

export default Registration;

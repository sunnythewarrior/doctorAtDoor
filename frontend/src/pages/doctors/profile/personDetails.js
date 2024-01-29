import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { Grid, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import SideBar from "../../../components/Sidebars/doctorSidebar";
import * as Yup from "yup";
import "../../../assets/css/customm.css";
import { Link } from "react-router-dom";
import { updateUserDetailsById, getAllStates } from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const PersonalDetails = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [stateList, setStateList] = useState([]);

  // Fetch the state list on component mount
  const getAllStatesData = async () => {
    try {
      const response = await axios.get(getAllStates);
      return response.data.data; // Simplify response handling
    } catch (error) {
      console.error("Error fetching states:", error);
      throw error;
    }
  };

  // Fetch the state list on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const states = await getAllStatesData();
        console.log("states", states);
        setStateList(states);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  // Define the fade-in animation
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 500 },
  });

  const formik = useFormik({
    initialValues: {
      firstName: props.userData?.firstName || "",
      lastName: props.userData?.lastName || "",
      email: props.userData?.email || "",
      phoneNumber: props.userData?.mobileNumber || "",
      addressLine1: props.userData?.address?.addressLine1 || "",
      addressLine2: props.userData?.address?.addressLine2 || "",
      city: props.userData?.address?.city || "",
      state: props.userData?.address?.state || "",
      pinCode: props.userData?.address?.pinCode || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      addressLine1: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pinCode: Yup.string().required("Pin Code is required"),
    }),
    onSubmit: async (values) => {
      try {
        let postData = {
          firstName: values?.firstName,
          lastName: values?.lastName,
          email: values?.email,
          phoneNumber: values?.phoneNumber,
          address: {
            addressLine1: values?.addressLine1,
            addressLine2: values?.addressLine2,
            state: values?.state,
            city: values?.city,
            pinCode: values?.pinCode,
          },
        };
        const response = await axios.put(
          `${updateUserDetailsById}/${props?.userData?._id}`,
          postData
        );
        console.log("Update successful:", response.data);
        toast.success("User Data Updated Successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleChange(null, activeTab);
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Failed to update data", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    },
  });

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <SideBar />
      <animated.div style={fadeIn}>
        <Typography
          variant="h5"
          align="center"
          style={{ color: "skyBlue", marginTop: "1px" }}
        >
          Personal Details
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography>
                First Name <span style={{ color: "red " }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter First Name"
                variant="outlined"
                margin="normal"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                Last Name <span style={{ color: "red " }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Last Name"
                variant="outlined"
                margin="normal"
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Email <span style={{ color: "red " }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Email"
                variant="outlined"
                margin="normal"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Mobile Number <span style={{ color: "red " }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Mobile Number"
                variant="outlined"
                margin="normal"
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Address Line 1 <span style={{ color: "red " }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Address Line 1"
                variant="outlined"
                margin="normal"
                name="addressLine1"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressLine1}
                error={
                  formik.touched.addressLine1 &&
                  Boolean(formik.errors.addressLine1)
                }
                helperText={
                  formik.touched.addressLine1 && formik.errors.addressLine1
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>Address Line 2</Typography>
              <TextField
                fullWidth
                placeholder="Enter Address Line 2"
                variant="outlined"
                margin="normal"
                name="addressLine2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addressLine2}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>
                City <span style={{ color: "red " }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter City"
                variant="outlined"
                margin="normal"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>
                State <span style={{ color: "red " }}>*</span>
              </Typography>
              <TextField
                fullWidth
                select
                placeholder="Select State"
                variant="outlined"
                margin="normal"
                name="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              >
                {stateList?.map((state) => (
                  <MenuItem key={state?._id} value={state?._id}>
                    {state?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>
                Pin Code <span style={{ color: "red " }}>*</span>
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter Pin Code"
                variant="outlined"
                margin="normal"
                name="pinCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pinCode}
                error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                helperText={formik.touched.pinCode && formik.errors.pinCode}
              />
            </Grid>
            {/* Other form fields ... */}
            &nbsp; &nbsp;
          </Grid>
          <Grid item xs={12} style={{ marginLeft: "350px" }}>
            <Link
              to="/doctor/dashboard"
              underline="none"
              color="inherit"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "grey",
                  color: "white",
                  width: "10rem",
                  height: "3rem",
                }}
              >
                Cancel
              </Button>
            </Link>
            &nbsp;
            <Button
              type="submit"
              variant="contained"
              className="submit-button"
              style={{ width: "10rem", height: "3rem" }}
            >
              Save
            </Button>
          </Grid>
        </form>
      </animated.div>
    </div>
  );
};

export default PersonalDetails;

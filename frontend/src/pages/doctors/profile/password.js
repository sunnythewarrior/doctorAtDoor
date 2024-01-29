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
import { useFormik } from "formik";
import * as Yup from "yup";
import SideBar from "../../../components/Sidebars/doctorSidebar";

const Password = () => {
  // Define the fade-in animation
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  // Formik for the password change form
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required("Current Password is required"),
      newPassword: Yup.string()
        .required("New Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      // Handle password change submission (API call, etc.)
      console.log(values);
    },
  });

  return (
    <div>
      <SideBar />
      <animated.div style={fadeIn}>
        <Typography
          variant="h5"
          align="center"
          style={{ color: "skyBlue", marginTop: "15px" }}
        >
          Password
        </Typography>

        {/* <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}> */}
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Current Password"
                variant="outlined"
                fullWidth
                type="password"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.currentPassword &&
                  Boolean(formik.errors.currentPassword)
                }
                helperText={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="New Password"
                variant="outlined"
                fullWidth
                type="password"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "20px" }}
          >
            Change Password
          </Button>
        </form>
        {/* </Paper> */}
      </animated.div>
    </div>
  );
};

export default Password;

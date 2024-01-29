import React from "react";
import { useSpring, animated } from "react-spring";
import { Grid, Typography, TextField, Button } from "@mui/material";
import SideBar from "../../../components/Sidebars/doctorSidebar";
import { useFormik } from "formik";
import * as Yup from "yup";

const EducationalDetails = () => {
  // Define the fade-in animation
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  // Initial values
  const initialValues = {
    university: "",
    degree: "",
    yearOfPassing: "",
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    university: Yup.string().required("University/College is required"),
    degree: Yup.string().required("Degree is required"),
    yearOfPassing: Yup.number()
      .required("Year of Passing is required")
      .positive("Year of Passing must be a positive number"),
  });

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
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
          Educational Details
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">University/College</Typography>
              <TextField
                placeholder="Enter University/College"
                variant="outlined"
                fullWidth
                name="university"
                value={formik.values.university}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.university && Boolean(formik.errors.university)
                }
                helperText={
                  formik.touched.university && formik.errors.university
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Degree</Typography>
              <TextField
                placeholder="Enter Degree"
                variant="outlined"
                fullWidth
                name="degree"
                value={formik.values.degree}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.degree && Boolean(formik.errors.degree)}
                helperText={formik.touched.degree && formik.errors.degree}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">Year of Passing</Typography>
              <TextField
                placeholder="Enter Year of Passing"
                variant="outlined"
                fullWidth
                type="number"
                name="yearOfPassing"
                value={formik.values.yearOfPassing}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.yearOfPassing &&
                  Boolean(formik.errors.yearOfPassing)
                }
                helperText={
                  formik.touched.yearOfPassing && formik.errors.yearOfPassing
                }
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "20px" }}
          >
            Save
          </Button>
        </form>
      </animated.div>
    </div>
  );
};

export default EducationalDetails;

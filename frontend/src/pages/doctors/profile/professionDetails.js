import React from "react";
import { useSpring, animated } from "react-spring";
import { Grid, Typography, TextField, Button } from "@mui/material";
import SideBar from "../../../components/Sidebars/doctorSidebar";
import * as Yup from "yup";
import { useFormik } from "formik";

const ProfessionalDetails = () => {
  // Define the fade-in animation
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  // Initial values
  const initialValues = {
    specialization: "",
    experience: "",
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    specialization: Yup.string().required("Specialization is required"),
    experience: Yup.number()
      .required("Experience is required")
      .positive("Experience must be a positive number"),
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
          Professional Details
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">Specialization</Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="specialization"
                value={formik.values.specialization}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.specialization &&
                  Boolean(formik.errors.specialization)
                }
                helperText={
                  formik.touched.specialization && formik.errors.specialization
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Experience (in years)</Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="number"
                name="experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.experience && Boolean(formik.errors.experience)
                }
                helperText={
                  formik.touched.experience && formik.errors.experience
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

export default ProfessionalDetails;

import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import SideBar from "../../../components/Sidebars/doctorSidebar";
import { getUserDetailsById, updateUserBankDetails } from "../../../api";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const BankDetails = (props) => {
  console.log("props", props?.userData?.bankDetails);
  const [activeTab, setActiveTab] = useState(0);
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  // Existing bank accounts
  const bankAccountsData = props?.userData?.bankDetails;

  // Formik for the new bank account form
  const formik = useFormik({
    initialValues: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountType: "",
      isPrimary: false,
    },
    validationSchema: Yup.object().shape({
      bankName: Yup.string().required("Bank Name is required"),
      accountNumber: Yup.string().required("Account Number is required"),
      ifscCode: Yup.string().required("IFSC Code is required"),
      accountType: Yup.string().required("Account Type is required"),
    }),
    onSubmit: async (values) => {
      try {
        let postData = {
          bankDetails: [
            {
              bankName: values?.bankName,
              accountNumber: values?.accountNumber,
              ifscCode: values?.ifscCode,
              accountType: values?.accountType,
              isPrimary: values?.isPrimary,
            },
          ],
        };
        const response = await axios.put(
          `${updateUserBankDetails}/${props?.userData?._id}`,
          postData
        );
        console.log("Update successful:", response.data);
        toast.success("Bank Details Updated Successful!", {
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
          style={{ color: "skyBlue", marginTop: "15px" }}
        >
          Bank Details
        </Typography>

        {/* Existing bank account list */}
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bank Name</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>IFSC Code</TableCell>
                <TableCell>Account Type</TableCell>
                <TableCell>Primary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bankAccountsData !== undefined &&
              bankAccountsData !== null &&
              bankAccountsData.length > 0
                ? bankAccountsData?.map((account) => (
                    <TableRow key={account?.id}>
                      <TableCell>{account?.bankName}</TableCell>
                      <TableCell>{account?.accountNumber}</TableCell>
                      <TableCell>{account?.ifscCode}</TableCell>
                      <TableCell>{account?.accountType}</TableCell>
                      <TableCell>
                        {account?.isPrimary == true ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  ))
                : "No Bank Details Found"}
            </TableBody>
          </Table>
        </TableContainer>

        {/* New bank account form */}
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Add New Bank Account
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>Bank Name</Typography>
                <TextField
                  placeholder="Enter Bank Name"
                  variant="outlined"
                  fullWidth
                  name="bankName"
                  value={formik.values.bankName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.bankName && Boolean(formik.errors.bankName)
                  }
                  helperText={formik.touched.bankName && formik.errors.bankName}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Account Number</Typography>
                <TextField
                  placeholder="Enter Account Number"
                  variant="outlined"
                  fullWidth
                  name="accountNumber"
                  value={formik.values.accountNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.accountNumber &&
                    Boolean(formik.errors.accountNumber)
                  }
                  helperText={
                    formik.touched.accountNumber && formik.errors.accountNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>IFSC Code</Typography>
                <TextField
                  placeholder="Enter IFSC Code"
                  variant="outlined"
                  fullWidth
                  name="ifscCode"
                  value={formik.values.ifscCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.ifscCode && Boolean(formik.errors.ifscCode)
                  }
                  helperText={formik.touched.ifscCode && formik.errors.ifscCode}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Account Type</Typography>
                <TextField
                  placeholder="Enter Account Type"
                  variant="outlined"
                  fullWidth
                  name="accountType"
                  value={formik.values.accountType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.accountType &&
                    Boolean(formik.errors.accountType)
                  }
                  helperText={
                    formik.touched.accountType && formik.errors.accountType
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isPrimary"
                      checked={formik.values.isPrimary}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Primary Account"
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
        </Paper>
      </animated.div>
    </div>
  );
};

export default BankDetails;

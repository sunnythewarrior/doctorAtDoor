import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PersonalDetails from "./personDetails";
import EducationalDetails from "./educationalDetails";
import ProfessionalDetails from "./professionDetails";
import Documents from "./document";
import BankDetails from "./bankDetails";
import Password from "./password";
import { TabPanel } from "./tabPanel";
import SideBar from "../../../components/Sidebars/doctorSidebar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { getUserDetailsById } from "../../../api";
import Header from "../../../components/header/header";
const ProfileTabs = () => {
  const userDataString = localStorage.getItem("userData");
  const userDetails = userDataString ? JSON.parse(userDataString) : null;

  // Extract userRole from userData
  const userId = userDetails ? userDetails.userId : null;
  const userRole = userDetails ? userDetails.userRole : null;
  console.log("userRole", userRole);
  const [value, setValue] = useState(0);
  const [userData, setUserData] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabName = (index) => {
    switch (index) {
      case 0:
        return "Personal Details";
      case 1:
        return "Documents";
      case 2:
        return "Professional Details";
      case 3:
        return "Educational Details";
      case 4:
        return "Bank Details";
      case 5:
        return "Password";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace 'getUserDetailsEndpoint' with the actual endpoint for fetching user details
        const response = await axios.get(`${getUserDetailsById}/${userId}`);
        console.log("response.data.data", response?.data?.data);
        setUserData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <SideBar />

      <Box sx={{ width: "100%", marginTop: "15px" }}>
        <Typography
          variant="h6"
          className="profile-heading"
          style={{ marginBottom: "2px" }}
        >
          Profile
          <ArrowForwardIosIcon />
          {getTabName(value)}
        </Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ paddingLeft: 2, paddingTop: 2 }}
        >
          <Tab label="Personal Details" />
          <Tab label="Documents" />
          <Tab label="Professional Details" />
          <Tab label="Educational Details" />
          <Tab label="Bank Details" />
          <Tab label="Password" />
        </Tabs>

        <TabPanel value={value} index={0}>
          {userData && <PersonalDetails userData={userData} />}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {userData && <Documents userData={userData} />}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {userData && <ProfessionalDetails userData={userData} />}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {userData && <EducationalDetails userData={userData} />}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {userData && <BankDetails userData={userData} />}
        </TabPanel>
        <TabPanel value={value} index={5}>
          {userData && <Password userData={userData} />}
        </TabPanel>
      </Box>
    </Box>
  );
};

export default ProfileTabs;

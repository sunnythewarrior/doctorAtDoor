import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#87CEEB", // Sky blue background color
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {[
            {
              text: "Dashboard",
              icon: <DashboardIcon />,
              link: "/doctor/dashboard",
            },
            { text: "Payment", icon: <PaymentIcon />, link: "/doctor/payment" },
            {
              text: "Appointments",
              icon: <EventIcon />,
              link: "/doctor/appointment",
            },
            { text: "Profile", icon: <PersonIcon />, link: "/doctor/profile" },
            { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
            {
              text: "Logout",
              icon: <LogoutIcon />,
              onClick: handleLogout,
            },
          ].map(({ text, icon, onClick, link }) => (
            <ListItem key={text} disablePadding>
              {link ? (
                <ListItemButton component={Link} to={link}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              ) : (
                <ListItemButton onClick={onClick}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

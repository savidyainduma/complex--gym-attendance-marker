import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AttendanceViewer from "./AttendanceViewer";
import AllMembersViewer from "./AllMemebersViewer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [currentRoute, setCurrentRoute] = useState("home");

  useEffect(() => {
    axios
      .get("http://localhost:8081/getAllCount")
      .then((res) => {
        if (res.status === 200) {
          console.log("number2: ", res.data.count);
          animateCount(res.data.count, setNumber2);
        } else {
          alert("No record existed.");
        }
      })
      .catch((err) => {
        console.error("Error fetching count:", err);
        alert("Failed to fetch data.");
      });
  }, []);

  const animateCount = (target, setter) => {
    const interval = setInterval(() => {
      setter((prev) => {
        if (prev < target) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 30);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/getActiveCount")
      .then((res) => {
        if (res.status === 200) {
          console.log("number2: ", res.data.count);
          animateCount(res.data.count, setNumber1);
        } else {
          alert("No record existed.");
        }
      })
      .catch((err) => {
        console.error("Error fetching count:", err);
        alert("Failed to fetch data.");
      });
  }, []);

  return (
    <>
      <div className="header" style={{ display: "flex" }}>
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
          <Toolbar>
            <img
              src="../logo.png"
              style={{ width: "40px", marginRight: "4px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                marginLeft: "20px",
                fontSize: "25px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              COMPLEX
            </Typography>

            {/* Notifications Icon */}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* User Account Icon */}
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>

      <div className="sidebar">
        <Box
          sx={{
            width: 240,
            height: "90vh",
            bgcolor: "background.paper",
            position: "fixed",
            top: "10vh",
            left: 0,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#2E2E2E",
            color: "white",
          }}
        >
          <IconButton
            color="inherit"
            sx={{ marginTop: "50px", padding: 2, color: "white" }}
          >
            <AccountCircle sx={{ fontSize: 70 }} />
          </IconButton>
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold", color: "white" }}
          >
            Thushara Dilshan
          </Typography>
          <Typography sx={{ textAlign: "center", color: "white" }}>
            Gym Coach
          </Typography>

          <List sx={{ marginTop: "30px" }}>
            <ListItem
              button
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#ff2d2e",
                  color: "white",
                },
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
            <ListItem
              button
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#ff2d2e",
                  color: "white",
                },
              }}
              onClick={() => setCurrentRoute("home")}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#ff2d2e",
                  color: "white",
                },
              }}
              onClick={() => setCurrentRoute("allmembers")}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="All Members" />
            </ListItem>
            <ListItem
              button
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#ff2d2e",
                  color: "white",
                },
              }}
              onClick={() => setCurrentRoute("attendance")}
            >
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="All Attendance" />
            </ListItem>
            <ListItem
              button
              onClick={() => navigate("/admin/addmember")}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#ff2d2e",
                  color: "white",
                },
              }}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add New member" />
            </ListItem>
          </List>
        </Box>
      </div>
      <div className="paper">
        <Paper
          sx={{
            position: "absolute",
            top: "12vh",
            right: "1vw",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80vw",
            height: "85vh",
            backgroundColor: "#2E2E2E",
          }}
        >
          {currentRoute === "home" ? (
            <div style={{ display: "flex", gap: "4vw" }}>
              <div style={{ marginTop: "20vh" }}>
                <Typography
                  variant="h2"
                  sx={{ marginBottom: 2, textAlign: "center", color: "white" }}
                >
                  {number1}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ marginBottom: 2, color: "white" }}
                >
                  Active members
                </Typography>
              </div>
              <div style={{ marginTop: "20vh" }}>
                <Typography
                  variant="h2"
                  sx={{ marginBottom: 2, textAlign: "center", color: "white" }}
                >
                  {number2}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ marginBottom: 2, color: "white" }}
                >
                  Total members
                </Typography>
              </div>
            </div>
          ) : currentRoute === "attendance" ? (
            <AttendanceViewer />
          ) : (
            <AllMembersViewer />
          )}
        </Paper>
      </div>
    </>
  );
};

export default AdminDashboard;

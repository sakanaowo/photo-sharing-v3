import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
// import models from "../../modelData/models";

import "./styles.css";
import { userStore } from "../../store/userStore";
import { authStore } from "../../store/authStore";

function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  const { selectedUser } = userStore();
  const { authUser, logout } = authStore();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    // const userId = pathParts[pathParts.length - 1];

    if (pathParts.includes("photos")) {
      let user = selectedUser;
      if (user) {
        setContextText(`Photos of ${user.first_name} ${user.last_name}`);
      } else {
        setContextText("");
      }
    } else if (pathParts.includes("users")) {
      let user = selectedUser;
      if (user) {
        setContextText(`${user.first_name} ${user.last_name}`);
      } else {
        setContextText("");
      }
    } else {
      setContextText("User List");
    }
  }, [location, selectedUser]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h5" className="topbar-title" color="inherit">
          Hi {authUser.first_name + " " + authUser.last_name}
        </Typography>
        <Typography variant="h6" className="topbar-context" color="inherit">
          {contextText}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className="topbar-button"
          onClick={logout}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

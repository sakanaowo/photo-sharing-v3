import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import { userStore } from "../../store/userStore";
import { authStore } from "../../store/authStore";

function UserDetail() {
  const { selectedUser } = userStore();
  const { authUser } = authStore();
  let user = selectedUser;
  if (selectedUser === undefined) {
    user = authUser;
  }

  console.log("Selected User:", selectedUser);
  console.log("Auth User:", authUser);
  if (!user) {
    return <Typography variant="h4">User not found</Typography>;
  }

  return (
    <Card className="user-detail-card">
      <CardContent>
        <div className="user-detail-header">
          <Typography variant="h4" gutterBottom>
            {user.first_name} {user.last_name}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {user.occupation}
          </Typography>
        </div>
        <Typography variant="body1" className="user-detail-location">
          Location: {user.location}
        </Typography>
        <Typography variant="body1" className="user-detail-description">
          {user.description}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/photos/${user._id}`}
          color="primary"
          className="photos-button"
        >
          View Photos
        </Button>
        {/* {authUser._id === selectedUser._id ? (
          <Button
            variant="contained"
            component={Link}
            to={`/edit/${authUser._id}`}
            color="primary"
            className="photos-button"
            style={{ marginLeft: "10px" }}
          >
            Update Profile
          </Button>
        ) : null} */}
      </CardContent>
    </Card>
  );
}

export default UserDetail;

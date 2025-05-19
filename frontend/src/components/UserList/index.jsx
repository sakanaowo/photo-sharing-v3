import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
// import models from "../../modelData/models";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  // const users = models.userListModel();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchModel("http://localhost:8081/api/user/list")
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="user-list">
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem disablePadding className="user-list-item">
              <ListItemButton component={Link} to={`/users/${user._id}`}>
                <ListItemText
                  primary={`${user.first_name} ${user.last_name}`}
                  secondary={user.occupation}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;

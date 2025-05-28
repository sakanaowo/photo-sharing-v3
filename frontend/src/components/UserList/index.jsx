import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import { userStore } from "../../store/userStore";

function UserList() {
  const { users, getUsers, setSelectedUser } = userStore();
  // console.log("users from userlist", users);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="user-list">
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem disablePadding className="user-list-item">
              <ListItemButton
                onClick={() => setSelectedUser(user)}
                component={Link}
                to={`/users/${user._id}`}
              >
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

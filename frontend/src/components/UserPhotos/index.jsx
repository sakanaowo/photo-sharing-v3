import React, { useEffect } from "react";
import { Typography, Card, CardContent, CardMedia, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { userStore } from "../../store/userStore";

import "./styles.css";
import { photoStore } from "../../store/photoStore";

function UserPhotos() {
  const { selectedUser } = userStore();
  console.log("Selected User from user photo:", selectedUser);
  const { photos, setPhotos } = photoStore();
  let user = selectedUser;

  useEffect(() => {
    setPhotos(user);
  }, [user, setPhotos]);

  if (photos.length === 0) {
    return (
      <Typography variant="h4">
        {user.first_name + " " + user.last_name} does not have any photos.
      </Typography>
    );
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="photo-container">
      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card">
          <CardMedia
            component="img"
            image={`/images/${photo.file_name}`}
            alt={`Photo by ${user.first_name}`}
            className="photo-image"
            loading="lazy"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Posted on {formatDate(photo.date_time)}
            </Typography>
            <div className="comment-section">
              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              {photo.comments &&
                photo.comments.map((comment) => (
                  <Card key={comment._id} className="comment-card">
                    <Typography variant="body2" color="textSecondary">
                      {formatDate(comment.date_time)} -
                      <Link
                        component={RouterLink}
                        to={`/users/${comment.user._id}`}
                        color="primary"
                        sx={{ ml: 1 }}
                      >
                        {comment.user.first_name} {comment.user.last_name}
                      </Link>
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {comment.comment}
                    </Typography>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;

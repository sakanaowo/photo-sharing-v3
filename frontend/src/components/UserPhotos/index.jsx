import React, { useEffect, useNavigate } from "react";
import { Typography, Card, CardContent, CardMedia, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import "./styles.css";
import { userStore } from "../../store/userStore";
import { photoStore } from "../../store/photoStore";
import { authStore } from "../../store/authStore";
import { useCommentStore } from "../../store/commentStore";
import CommentSection from "./commentSection";
import DeletePostButton from "../lib/DeletePostButton";
import CommentItem from "../lib/CommentItem";

function UserPhotos() {
  // const nagivate = useNavigate();

  const { selectedUser } = userStore();
  const { photos, setPhotos, deletePhoto } = photoStore();
  const { deleteComment } = useCommentStore();
  const { authUser } = authStore();
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
            {/* {authUser._id === selectedUser._id ? (
              <DeletePostButton onDelete={() => deletePhoto(photo._id)} />
            ) : null} */}
            <div className="comment-section">
              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              {photo.comments &&
                photo.comments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    onDelete={(commentId) => {
                      deleteComment(commentId);
                    }}
                  />
                ))}
            </div>
          </CardContent>
          <CommentSection
            photoId={photo._id}
            onSuccess={() => {
              setPhotos(user);
              // nagivate(`/photos/${user._id}`);
            }}
          />
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;

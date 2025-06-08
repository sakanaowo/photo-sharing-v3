import React, { useState } from "react";
import { Card, Typography, Link, Button, TextField } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { authStore } from "../../store/authStore";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const CommentItem = ({ comment, onDelete }) => {
  const { authUser } = authStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);

  const handleEditSubmit = async () => {
    try {
      await axiosInstance.put(`/comment/${comment._id}`, {
        comment: editedComment,
      });
      toast.success("Comment updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  return (
    <Card className="comment-card" sx={{ mb: 1 }}>
      <Typography variant="body2" color="textSecondary">
        {formatDate(comment.date_time)} -{" "}
        <Link
          component={RouterLink}
          to={`/users/${comment.user._id}`}
          color="primary"
          sx={{ ml: 1 }}
        >
          {comment.user.first_name} {comment.user.last_name}
        </Link>
      </Typography>

      {isEditing ? (
        <TextField
          fullWidth
          multiline
          variant="outlined"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
          sx={{ mt: 1 }}
        />
      ) : (
        <Typography variant="body1" sx={{ mt: 1 }}>
          {comment.comment}
        </Typography>
      )}

      {/* {authUser._id === comment.user._id && (
        <div style={{ marginTop: "8px" }}>
          {isEditing ? (
            <>
              <Button size="small" onClick={handleEditSubmit} color="primary">
                Save
              </Button>
              <Button
                size="small"
                onClick={() => setIsEditing(false)}
                color="secondary"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                size="small"
                onClick={() => setIsEditing(true)}
                color="primary"
              >
                Edit
              </Button>
              <Button
                size="small"
                onClick={() => onDelete(comment._id)}
                color="error"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      )} */}
    </Card>
  );
};

export default CommentItem;

import { Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { commentStore } from "../../store/commentStore";

const DeleteCommentButton = ({ commentId, photoId }) => {
  const navigate = useNavigate();
  const { deleteComment } = commentStore();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={async () => {
        await deleteComment(commentId, photoId);
        navigate(`/photos/${photoId}`);
      }}
    >
      Delete Comment
    </Button>
  );
}

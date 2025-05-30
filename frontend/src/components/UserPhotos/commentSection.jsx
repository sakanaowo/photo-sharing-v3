import { TextField, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useCommentStore } from "../../store/commentStore";

function CommentSection({ photoId, onSuccess }) {
  const { comment, setComment, sendComment } = useCommentStore();
  const handleSend = async () => {
    if (comment.trim() === "") return;
    const s = await sendComment(photoId, comment);
    if (s) {
      onSuccess();
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        margin: "16px",
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        InputProps={{ disableUnderline: true }}
      />
      <IconButton color="primary" onClick={handleSend}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
export default CommentSection;

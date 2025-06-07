import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";

const DeletePostButton = ({ onDelete }) => {
  const navigate = useNavigate();
  const { selectedUser } = userStore();

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={async () => {
        await onDelete();
        navigate(`/photo/${selectedUser._id}`);
      }}
      //   style={{ bottom: "30px", left: "240px" }}
    >
      Delete
    </Button>
  );
};

export default DeletePostButton;

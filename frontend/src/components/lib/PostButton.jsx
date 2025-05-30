import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { userStore } from "../../store/userStore";
import { authStore } from "../../store/authStore";

const NavigateButton = () => {
  const navigate = useNavigate();
  const { setSelectedUser } = userStore();
  const { authUser } = authStore();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        navigate("/photos/new");
        setSelectedUser(authUser);
      }}
      style={{ position: "absolute", bottom: "30px", left: "240px" }}
    >
      Post
    </Button>
  );
};

export default NavigateButton;

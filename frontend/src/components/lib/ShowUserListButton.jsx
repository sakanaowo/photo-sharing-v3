import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NavigateButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate("/users")}
      style={{ position: "absolute", bottom: "30px", left: "20px" }}
    >
      Show User List
    </Button>
  );
};

export default NavigateButton;

import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";
import "./index.css";

function EditProfilePage() {
  const navigate = useNavigate();
  const { authUser, updateProfile } = authStore();
  const [formData, setFormData] = useState({
    first_name: authUser.first_name || "",
    last_name: authUser.last_name || "",
    location: authUser.location || "",
    description: authUser.description || "",
    occupation: authUser.occupation || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    navigate(`/users/${authUser._id}`);
  };
  return (
    <div id="login-form">
      <h1>Update Profile</h1>
      <form>
        <label>First Name:</label>
        <input
          type="text"
          id="text"
          name="text"
          value={formData.first_name}
          onChange={(e) => {
            setFormData({ ...formData, first_name: e.target.value });
          }}
        />
        <label>Last Name:</label>
        <input
          type="text"
          id="text"
          name="text"
          value={formData.last_name}
          onChange={(e) => {
            setFormData({ ...formData, last_name: e.target.value });
          }}
        />
        <label>Location:</label>
        <input
          type="text"
          id="text"
          name="text"
          value={formData.location}
          onChange={(e) => {
            setFormData({ ...formData, location: e.target.value });
          }}
        />
        <label>Description:</label>
        <input
          type="text"
          id="text"
          name="text"
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
        />
        <label>Occupation:</label>
        <input
          type="text"
          id="text"
          name="text"
          value={formData.occupation}
          onChange={(e) => {
            setFormData({ ...formData, occupation: e.target.value });
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "5px auto",
          }}
        >
          Update
        </Button>
      </form>
    </div>
  );
}

export default EditProfilePage;

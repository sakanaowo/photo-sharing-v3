import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";
import "./index.css";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();

  const { register } = authStore();
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
    first_name: "",
    last_name: "",
    location: "",
    description: "",
    occupation: "",
  });

  const validateForm = () => {
    if (!formData.login_name.trim())
      return toast.error("Username is required.");
    if (!formData.password.trim()) return toast.error("Password is required.");
    if (!formData.first_name.trim())
      return toast.error("First name is required.");
    if (!formData.last_name.trim())
      return toast.error("Last name is required.");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      await register(formData);
      navigate("/");
    }
  };

  return (
    <div id="login-form">
      <h1>Register</h1>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.login_name}
          onChange={(e) => {
            setFormData({ ...formData, login_name: e.target.value });
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
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
          Register
        </Button>
        <p style={{ textAlign: "center" }}>
          Have an account?{" "}
          <a href="/login" className="link link-primary">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;

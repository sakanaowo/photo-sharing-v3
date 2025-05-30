import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";
import "./LoginForm.css";
import { Button } from "@mui/material";

function LoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = authStore();
  const [formData, setFormData] = useState({
    login_name: "",
    // password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // login(formData);
    const user = await adminLogin(formData);
    console.log("User logged in:", user);
    console.log("User ID:", user?._id || user?.user?._id);
    const userId = user?._id || user?.user?._id;

    if (userId) {
      navigate(`/users/${userId}`);
    }
  };

  return (
    <div id="login-form">
      <h1>Login</h1>
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
          Login
        </Button>
        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <a href="/register" className="link link-primary">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;

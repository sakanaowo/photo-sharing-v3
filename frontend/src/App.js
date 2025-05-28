import './App.css';
import { Grid, Paper, Button } from "@mui/material";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';

import { authStore } from "./store/authStore";
import { useEffect } from 'react';

const NavigateButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/users')}
      style={{ position: 'absolute', bottom: '30px', left: '30px' }}
    >
      Show User List
    </Button>
  );
}

const Applayout = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <div className="main-topbar-buffer" />
        <Grid item xs={12}>
          <NavigateButton />
        </Grid>
        <Grid item sm={3}>
          <Paper className="main-grid-item">
            <UserList />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className="main-grid-item">
            <Routes>
              <Route
                path="users/:userId"
                element={<UserDetail />}
              />
              <Route
                path="photos/:userId"
                element={<UserPhotos />}
              />
              <Route path="users" element={<UserList />} />
            </Routes>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const App = () => {
  const { authUser, checkAuth } = authStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth User:", authUser);

  return (
    <>
      <Routes>
        <Route path="/*" element={authUser ? <Applayout /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

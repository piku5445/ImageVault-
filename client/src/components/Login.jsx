import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const error = () => {
    toast.error("All feilds are required", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const success = () => {
    toast.success("Login successful", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'user') {
      setUser(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    console.log(user, password);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!user || !password) {
        error();
    } else {
      success();
    }
    console.log("Login data:", {
      user,
      password,
    });
    // Add logic to handle form submission here
    try{
      const url="http://localhost:3000/api/website/user/login";
      const response=await fetch(url,{
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({username:user,password})

      })
      const data=await response.json();
      console.log(data);

    }catch(e){
console.log(e);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="login"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="username"
              variant="outlined"
              fullWidth
              margin="normal"
              name="user"
              value={user}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              name="password"
              margin="normal"
              value={password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link to="/register">Register</Link>
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              <a href="#" onClick={() => navigate('/forget')}>Forget Password?</a>
            </Typography>
          </form>
        </Box>
      </CardContent>
      <ToastContainer /> {/* Add ToastContainer here */}
    </Container>
  );
}

export default LoginPage;

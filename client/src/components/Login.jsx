import GoogleIcon from "@mui/icons-material/Google";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function LoginPage() {

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const error = (msg) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 4000,
    });
  };

  const success = (msg) => {
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "user") {
      setUser(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !password) {
      error("All fields are required");
      return;
    }



try {

  const url = "http://localhost:3000/auth/login";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: user,
      password: password,
    }),
  });

  const data = await response.json();

  // HANDLE BACKEND ERRORS
  if (!response.ok) {

    if (data.isEmailVerified === false) {
      error("Please verify your email before logging in");
    } 
    else {
      error(data.message || "Login failed");
    }

    return;
  }

  // SUCCESS CASE
  if (data.accessToken) {

    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);

    success("Login successful");

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  }

} catch (err) {
  console.log(err);
  error("Server error");
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
              label="Email"
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
              margin="normal"
              name="password"
              value={password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>

          <Button
  variant="outlined"
  startIcon={<GoogleIcon />}
  fullWidth
  sx={{ mt: 2 }}
  onClick={() =>
    (window.location.href = "http://localhost:3000/auth/google")
  }
>
  Continue with Google
</Button>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account? <Link to="/register">Register</Link>
            </Typography>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              <Link to="/forgot">Forgot Password?</Link>
            </Typography>

          </form>

        </Box>

      </CardContent>

      <ToastContainer />

    </Container>
  );
}

export default LoginPage;


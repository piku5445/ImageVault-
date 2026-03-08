import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Typography
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {

  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelChange = (e) => {

    const { name, value } = e.target;

    if (name === "Name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!Name || !email || !password) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {

      const url = "http://localhost:3000/auth/register";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: Name,
          email,
          password
        })
      });

      const data = await response.json();
      console.log(data);

      // SUCCESS
      if (response.status === 201) {

  // store name in localStorage
localStorage.setItem("user", JSON.stringify(data.user));

  toast.success("Registration successful! Please verify your email 📧", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
  });

  setTimeout(() => {
    navigate("/login");
  }, 3500);
}

      // ERROR
      else {
        toast.error(data.message || "Registration failed", {
          position: "top-center",
          autoClose: 3000,
        });
      }

    } catch (e) {
      console.log(e);
      toast.error("Server error", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >

      <FormControl
        sx={{
          width: "400px",
          padding: "20px",
          backgroundColor: "#f7f7f7",
          borderRadius: "15px",
          border: "2px solid rgba(102, 40, 40, 0.1)"
        }}
      >

        <FormLabel sx={{ mb: 2 }}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        </FormLabel>

        <FormGroup>

          <TextField
            required
            label="Name"
            name="Name"
            value={Name}
            onChange={handelChange}
            sx={{ mb: 2 }}
          />

          <TextField
            required
            label="Email Address"
            name="email"
            value={email}
            onChange={handelChange}
            sx={{ mb: 2 }}
          />

          <TextField
            required
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handelChange}
            sx={{ mb: 2 }}
          />

        </FormGroup>

        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          size="small"
        >
          Register
        </Button>

        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>

      </FormControl>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
      />

    </Box>
  );
}

export default Register;
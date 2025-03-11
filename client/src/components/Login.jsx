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
import { Link ,useNavigate} from "react-router-dom";
import "./Login.css";
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    // Add your authentication logic here
  };

  return (
    <Container
     maxWidth="xs" sx={{ mt: 8 }}
     >
    
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
               <a href="#"  onClick={()=>navigate('/forget')}>forgetPassword?</a>
              </Typography>
            </form>
          </Box>
        </CardContent>
      
    </Container>
  );
}

export default LoginPage;

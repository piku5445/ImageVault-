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
import { Link } from "react-router-dom";

const Forget = () => {

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();
      alert(data.message);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card>
        <CardContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >

            <Typography variant="h4">
              Forgot Password
            </Typography>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Enter your email to receive a password reset link
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>

              <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Send Reset Link
              </Button>

            </form>

            <Typography variant="body2" sx={{ mt: 2 }}>
              <Link to="/login">
                Back to Login
              </Link>
            </Typography>

          </Box>

        </CardContent>
      </Card>
    </Container>
  );
};

export default Forget;
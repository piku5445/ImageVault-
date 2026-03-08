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
import { useSearchParams, useNavigate, Link } from "react-router-dom";

function ResetPassword() {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await res.json();

      alert(data.message);

      if (res.ok) {
        // wait 2 seconds then redirect
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Card elevation={4}>
        <CardContent>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >

            <Typography variant="h4" gutterBottom>
              Reset Password
            </Typography>

            <Typography
              variant="body2"
              sx={{ mb: 2 }}
              color="text.secondary"
            >
              Enter your new password below
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: "100%" }}>

              <TextField
                type="password"
                label="New Password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                disabled={loading || !password}
              >
                {loading ? "Updating..." : "Reset Password"}
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
}

export default ResetPassword;
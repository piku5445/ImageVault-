import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, FormGroup, FormControlLabel, FormLabel ,Typography} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', {
      firstName,
      lastName,
      email,
      password,
    });
    // Add logic to handle form submission here
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FormControl sx={{ width: '400px', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '10px' }}>
        <FormLabel sx={{ mb: 2 }}>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        </FormLabel>
        <FormGroup>
         
          <TextField
            required
            id="name"
            label=" Name"
            name="Name"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
        </FormGroup>
        <Button type="submit" variant="contained" color="success" onClick={handleSubmit} size="small">
          Register
        </Button>
        <p>Already have an account?   <Link to="/login">Login</Link></p>
      </FormControl>
     
    </Box>

  );
}

export default Register;

import React, { useState } from 'react';
import { Box, TextField, Button, FormControl, FormGroup, FormControlLabel, FormLabel ,Typography} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
 const navigate=useNavigate()
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handelChange=(e)=>{
  const {name,value}=e.target
  if(name==='Name'){
    setName(value)
  }
  if(name==='email'){
    setEmail(value)
  }
  if(name==='password'){
    setPassword(value)
  }
  console.log(Name,email,password)
}
  const handleSubmit = async(e) => {
    e.preventDefault();
   if(!Name || !email || !password){
     alert('All fields are required')
   }else{
    navigate('/')
   }
    // Add logic to handle form submission here
    try{
      const url="http://localhost:3000/api/website/user/register"
      const response=await fetch(url,{
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({username:Name,email,password})
      })
      const data=await response.json();
      console.log(data)
      const {status,message,err}=data;
      if(status){
        alert('User registered successfully')
        navigate('/login')
      }
      else if(err){
        const detail=err.details[0].message
        console.log(detail)
        alert(detail)
    
      }

    }
    catch(e){
      console.log(e)
    }
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FormControl
      sx={{ width: '400px', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '15px', border: '2px solid rgba(102, 40, 40, 0.1)', color: 'rgb(0,0,0) bold'
        
       }}>
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
            value={Name}
            onChange={ handelChange}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handelChange}
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
            onChange={handelChange}
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

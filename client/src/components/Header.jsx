import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import  logo  from '../assets/logo.png'
import ButtonGroup from "@mui/material/ButtonGroup";
import './header.css'
const Header = () => {
   const [login,setLoggedin]=useState('')
    // const[images,setImages]=useState([])
   
    const navigate=useNavigate()
    useEffect(()=>{
      setLoggedin(localStorage.getItem('name'))
    },[])
  
    const handelLoggedout=()=>{
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      setTimeout(()=>{
        alert('Logged out successfully')
         navigate('/login')
      },1000)
    
    }
  return (
    <div >
      <div className='header'>


        <div>
          <h1 className='logo' ><img src={logo} height="50px" width="50px"/></h1>
        </div>
        <ButtonGroup variant="contained" aria-label="Basic button group" className='button1'>
          <Button>
            <Link to="/login" style={{ color: "black" }}>
              <label>Login</label>
            </Link>
          </Button>
          <Button>
            <Link to="/register" style={{ color: "black" }}>
              <label>Register</label>
            </Link>
          </Button>
          <Button  variant="contained" className='logout' onClick={handelLoggedout}>Logout</Button>
        </ButtonGroup>
      </div>

    </div>
  )
}

export default Header
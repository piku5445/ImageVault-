import React from 'react'
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import  logo  from '../assets/logo.png'
import ButtonGroup from "@mui/material/ButtonGroup";
import './header.css'
const Header = () => {
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
        </ButtonGroup>
      </div>

    </div>
  )
}

export default Header
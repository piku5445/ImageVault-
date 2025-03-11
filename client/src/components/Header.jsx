import React from 'react'
import { Link } from 'react-router-dom'
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
const Header = () => {
  return (
    <div>
         <ButtonGroup variant="contained" aria-label="Basic button group">
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
  )
}

export default Header
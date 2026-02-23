import React, { useState, useEffect } from 'react';
import ImageUpload from './Image';
import img1 from '../assets/img1.jpg';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const Home = () => {
  const [login, setLoggedin] = useState('');
  const[images,setImages]=useState([])

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedin(localStorage.getItem('name'));
  }, []);

  return (
    <div>
      <div className="home">
        <div className="welcome">
          <h1>Welcome to Home Page {login}</h1>
        </div>

        <div>
          <ImageUpload />
        </div>

        {/* <Button  variant="contained" className='logout' onClick={handelLoggedout}>Logout</Button> */}
      </div>
    </div>
  );
};

export default Home;

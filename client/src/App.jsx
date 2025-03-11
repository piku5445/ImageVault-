// import { useState } from 'react';

// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import './App.css';
// import axios from 'axios';
// import {BrowserRouter as Router, Route, Link, BrowserRouter,Routes} from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/register';
// import Home from './components/Home';
// import Layout from './components/Layout';
// function App() {
//   // const[images,setImages]=useState([])
//   // axios.get('/api/website/image/get')
//   // .then(response => setImages(response.data))
//   // .catch(error => console.error(error));
//   return (<>
//   {/* <div>
//      {
//       images.map((image)=>{
//          <img src={image} alt="Preview" width={200} />
//       })
//     } 
//   </div> */}
//   <div>
//     {/* <BrowserRouter>
//     <Routes>
//     <Route path="/login" element={<Login/>} />
//     <Route path="/register" element={<Register/>} />
//     </Routes>
//     </BrowserRouter>
    
//    */}
   
//    <Router>
//    <ButtonGroup variant="contained" aria-label="Basic button group" >
//   <Button><Link to="/login" style={{color:'black'}}><label htmlFor="">login</label></Link></Button>
//   <Button><Link to="/register" style={{color:'black'}}><label htmlFor="">Register</label></Link></Button>
 
// </ButtonGroup>
   
//      <Routes>
//       <Route path="/" element={<Layout/>} />
//       <Route index element={<Home/>} />
//        <Route path="/login" element={<Login/>} />
//        <Route path="/register" element={<Register/>} />
//      </Routes>
//    </Router>
   
//   </div>
 
    
//     </>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Register from './components/register';
import Home from "./components/Home";
import Layout from "./components/Layout";
import Header from "./components/Header";

function BasicExample() {
  return (
    <Router>
      {/* Navigation Buttons */}
      {/* <ButtonGroup variant="contained" aria-label="Basic button group">
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
      </ButtonGroup> */}
      <Header />

      {/* Routes Setup */}
      <Routes>
        {/* Parent Route with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default BasicExample;

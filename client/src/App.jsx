import { useState } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, BrowserRouter,Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/register';
function BasicExample() {
  // const[images,setImages]=useState([])
  // axios.get('/api/website/image/get')
  // .then(response => setImages(response.data))
  // .catch(error => console.error(error));
  return (<>
  {/* <div>
     {
      images.map((image)=>{
         <img src={image} alt="Preview" width={200} />
      })
    } 
  </div> */}
  <div>
    {/* <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    </Routes>
    </BrowserRouter>
    
   */}
   <Router>
     <Link to="/login">Login</Link>
     <Link to="/register">Register</Link>
     <Routes>
       <Route path="/login" element={<Login/>} />
       <Route path="/register" element={<Register/>} />
     </Routes>
   </Router>
  </div>
 
    
    </>
  );
}

export default BasicExample;
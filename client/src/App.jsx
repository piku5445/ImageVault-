import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Register from './components/Register';
import Home from "./components/Home";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Forget from "./components/forget";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Landing from "./components/Landing"
import ImageView from "./components/ImageViwer";
function App() {
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
          <Route index element={<Landing />} />
          <Route path="home" element={
            <PrivateRoute>
               <Home />
            </PrivateRoute>
          } />
          <Route path="landing" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget" element={<Forget />} />
          <Route path="photo/:id" element={<ImageView/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import "./App.css";
// import Login from "./components/Login";
// import Register from './components/register';
// import Home from "./components/Home";
// import Layout from "./components/Layout";
// import Header from "./components/Header";
// import Forget from "./components/forget";
// import PrivateRoute from "./components/PrivateRoute.jsx"; // Import PrivateRoute
// import Landing from "./components/landing"; 
// function App() {
//   return (
//     <Router>
//       <Header />
      
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/landing" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forget" element={<Forget />} />

//         {/* Private Routes */}
//         <Route path="/home" element={
//           <PrivateRoute>
//             <Home />
//           </PrivateRoute>
//         } />

//         {/* Catch-all route to redirect to landing if no match */}
//         <Route path="*" element={<Navigate to="/landing" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

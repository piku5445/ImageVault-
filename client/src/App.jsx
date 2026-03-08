import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Register from './components/Register';
import Home from "./components/Home";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Forget from "./components/forget";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Landing from "./components/landing"
import ImageView from "./components/ImageViwer";
import Google from "./components/Google";
import ResetPassword from "./components/ResetPassword.jsx";
function App() {
  return (
    <Router>

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
          <Route path="forgot" element={<Forget />} />
          <Route path="photo/:id" element={<ImageView/>} />
          <Route path="google" element={<Google />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Google = () => {
    const [params] = useSearchParams();
  const navigate = useNavigate();

 useEffect(() => {
  const token = params.get("token");

  console.log("Google token:", token); // debugging

  if (token) {
    localStorage.setItem("token", token);
    navigate("/home");
  }
}, [params, navigate]);

  return (
     <div>Logging you in...</div>
  )
}

export default Google
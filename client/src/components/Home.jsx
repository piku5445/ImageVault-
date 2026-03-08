import React, { useState } from 'react'
import ImageUpload from './Image'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

const Home = () => {
const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate()

  return (
    <div>

      <div className='home'> 
        
        <div className='welcome'>
          <h1>Welcome {user?.name}</h1>
        </div>
        
        <div>
          <ImageUpload/>
        </div>

      </div>

    </div>
  )
}

export default Home
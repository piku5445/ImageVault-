// import React, { useState } from 'react'
// import ImageUpload from './Image'
// import { useNavigate } from 'react-router-dom'
// import "./Home.css"

// const Home = () => {
// const user = JSON.parse(localStorage.getItem("user"));

//   const navigate = useNavigate()

//   return (
//     <div>

//       <div className='home'> 
        
//         <div className='welcome'>
//           <h1>Welcome {user?.name}</h1>
//         </div>
        
//         <div>
//           <ImageUpload/>
//         </div>

//       </div>

//     </div>
//   )
// }

// export default Home


import React from 'react'
import ImageUpload from './Image'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="home">

      {/* ── Welcome Banner ── */}
      <div className="welcome">
        <span className="welcome-eyebrow">✦ Image Gallery</span>
        <h1>
          Welcome back,{' '}
          <span>{firstName}</span>
        </h1>
        <p className="welcome-subtitle">
          Manage and explore your uploaded images below
        </p>

        <div className="divider">
          <span className="divider-line" />
          <span className="divider-icon">✦</span>
          <span className="divider-line" />
        </div>
      </div>

      {/* ── Quick Stats ── */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">∞</div>
          <div className="stat-label">Storage</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" id="img-count">—</div>
          <div className="stat-label">Images</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">🌿</div>
          <div className="stat-label">Gallery</div>
        </div>
      </div>

      {/* ── Image Upload & Grid ── */}
      <div className="image-grid-wrapper">
        <div className="section-header">
          <h2>Uploaded Images</h2>
        </div>
        <ImageUpload />
      </div>

    </div>
  )
}

export default Home
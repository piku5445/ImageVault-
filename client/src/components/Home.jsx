import React, { useState ,useEffect} from 'react'
import ImageUpload from './Image'
import img1 from '../assets/img1.jpg'
import { useNavigate } from 'react-router-dom'
import "./Home.css"
const Home = () => {
  const cards = [
    { title: 'Card 1', description: 'This is the description for card 1.' },
    { title: 'Card 2', description: 'This is the description for card 2.' },
    { title: 'Card 3', description: 'This is the description for card 3.' },
    { title: 'Card 4', description: 'This is the description for card 4.' },
  ];


  const [login,setLoggedin]=useState('')
  const[images,setImages]=useState([])
  const[upload,setUpload]=useState("")
  const navigate=useNavigate()
  useEffect(()=>{
    setLoggedin(localStorage.getItem('name'))
  },[])


  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3000/api/website/image/get"; // Ensure this matches your backend route
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
  
      if (result.success) {
        setImages(result.data);
      } else {
        console.log("Failed to fetch images:", result.message);
      }
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };
  
  useEffect(()=>{
    fetchProducts()
  },[])
  const handelLoggedout=()=>{
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    setTimeout(()=>{
      alert('Logged out successfully')
       navigate('/login')
    },1000)
  
  }
  return (
    <div>
      <div>
        <h1>Welcome to Home Page</h1>
        <div className='images'>
         <ImageUpload/>

        </div>
        <div className="card-container">
      {cards.map((card, index) => (
        <div key={index} className="card">
          <h2 className="card-title">{card.title}</h2>
          <p className="card-description">{card.description}</p>
        </div>
      ))}
    </div>
        <h1>{login}</h1>
        <button onClick={handelLoggedout}>Logout</button>
        <div>{
          images.map((item,key)=>{
            return (<div key={key}>
              <img src={item.url} alt="Preview" width={200} />
              </div>)
          })          }

        </div>

      
      </div>
    </div>
  )
}

export default Home
import React, { useState ,useEffect} from 'react'
import ImageUpload from './Image'
import img1 from '../assets/img1.jpg'
import { useNavigate } from 'react-router-dom'
import "./Home.css"
const Home = () => {

  const [login,setLoggedin]=useState('')
  const[images,setImages]=useState([])
  const[upload,setUpload]=useState("")
  const navigate=useNavigate()
  useEffect(()=>{
    setLoggedin(localStorage.getItem('name'))
  },[])

  const uploadImag=async()=>{

    try{
      const url="http://localhost:3000/api/website/image/upload"
      const response=await fetch(url,{
        method:"POST",
         headers:{
          "Content-type":"application/json"
         } 
      })
      


    }catch(e){
        alert(e)


    }
  }


  const fetchProducts=async()=>{
    try{



      const url="http://localhost:3000/api/website/image/get"
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`, // Add 'Bearer ' prefix
          "Content-Type": "application/json",
        },
        body:JSON.stringify({username:Name,email,password})
      });
      
      
      const result=await response.json()
      console.log(result)
      setImages(result.data)

    }catch(err){
      console.log(err)
    }
  }
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
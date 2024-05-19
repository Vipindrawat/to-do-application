import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate=useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
  },[])
  
  return (
    <div>
      this is about of my app
    </div>
  )
}

export default About

import React, { useState } from 'react'
import usercontext from "./Usercontext";


const Userstate = (props) => {
//State and functions related to signup component:
  const host = "http://localhost:5000/api/user"
  const [signupcred, setsignupcred] = useState({ name: "", email: "" });
  const [password,setpassword]=useState({password:"",cpassword:""})

  const creatinguser = async (name, email, password) => {
    const response = await fetch(`${host}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json();
    console.log(json);
    console.log("2nd check");
    return json;
  }

  //State and functions related to Log in components:
  const [credential,setcredential]=useState({lname:"",lemail:"",lpassword:""});

  const loginuser=async(email,password)=>{
     const response=await fetch(`${host}/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
     })
     const json=await response.json();
     return json;
  }

  return (
    <usercontext.Provider value={{ signupcred, creatinguser, setsignupcred,password,setpassword,credential,setcredential,loginuser }}>
      {props.children}
    </usercontext.Provider>
  )
}

export default Userstate;

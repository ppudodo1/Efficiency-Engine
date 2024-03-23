import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from "axios";


import "./Login.css"

function Login() {
  const [credentials,setCredentials] = useState({
    username:undefined,
    password:undefined,
  });
  const {user,loading,error,dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange= (e)=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}));
  }
  const handleClick = async (e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      //console.log("credentials: ", credentials);
        const res = await axios.post("http://localhost:4000/api/auth/login",credentials);
        dispatch({type:"LOGIN_SUCCESS",payload:res.data});
        navigate("/");
    } catch (error) {
      console.log("Invalid username or password");
      //console.log("fail");

      dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
    }

  }
  const handleRegisterButtonClick = async (e) =>{
      navigate("/register");
  }
 
  return (
    <div className='loginOption'>
     <input type="text" placeholder='username' id='username' name='username' onChange={handleChange}/>
     <br />
     <input type="text" placeholder='password' id='password' name='password' onChange={handleChange}/>
     <button onClick={handleClick} className='loginButton'>Log in</button>
     <button className='newAccount' onClick={handleRegisterButtonClick}>Or Create New Account</button>
    </div>
  )
}

export default Login

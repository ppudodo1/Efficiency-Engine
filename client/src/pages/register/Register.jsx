import React, { useContext, useState } from 'react'
import "./register.css";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Register() {
  const{user,loading,error,dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials,setCredentials] = useState({
    username:undefined,
    password:undefined,
  });
  const handleChange = (e)=>{
    setCredentials(prev=>({...prev,[e.target.id]:e.target.value}));
  }
  const handleClick = async(e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try {
      
      const reg = await axios.post("https://deploy-mern-82v2cgx2d-dodos-projects-c4168a69.vercel.app/api/auth/register",credentials);
      const log = await axios.post("https://deploy-mern-82v2cgx2d-dodos-projects-c4168a69.vercel.app/api/auth/login",credentials);
        dispatch({type:"LOGIN_SUCCESS",payload:log.data});
        navigate("/");
      
    } catch (error) {
     // console.log("fail")
      dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
    }
  }

  return (
    <div className='registerOption'>
        <input type="text" id='username' placeholder='Enter name for new Account' onChange={handleChange}/>
        <input type="text" id='password' placeholder='Enter password for new Account' onChange={handleChange}/>
        <button onClick={handleClick}>Register</button>
    </div>
  )
}

export default Register

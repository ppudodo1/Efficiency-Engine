import React, { useEffect, useState } from 'react'
import "./home.css"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faChartLine, faStar,faArrowRightToBracket}  from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Pending from '../Pending/Pending'
import Login from '../Login/login'
import Completed from '../Completed/Completed'
import NewTask from '../../components/newTask/NewTask'
import Satisfatcion from '../../components/satisfaction/Satisfatcion'
import Dashboard from '../Dashboard/Dashboard'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Register from '../register/Register'
function Home() {
  const {user,loading,error,dispatch} = useContext(AuthContext);
  const [showButtons,setShowButtons] = useState(true);
  const[showAddButton,setShowAddButton] = useState(true);
  const navigate = useNavigate();  
  console.log("Home renderanje");
  const userId = user ? user._id : null;
 
  
 
  let location = useLocation();
  const handleLogout = async (e)=>{
    e.preventDefault();
   // dispatch({type:"LOGOUT"})
   try {
      dispatch({type:"LOGOUT"});
      localStorage.removeItem("user");
     // console.log("Pokusali smo maknuti usera");
      navigate("/login");
   } catch (error) {
      throw error;
   }
  }
 // console.log("Lokacija",location.pathname.slice(0,8));
  useEffect(()=>{
    if(location.pathname=="/dashboard" || location.pathname.slice(0,8)=="/newTask" || location.pathname=="/completed"){
      setShowAddButton(false);
    }else if(location.pathname=="/"){
      setShowAddButton(true);
    }
    if(user == null){
      navigate("/login");
    }
    
   
  },[location.pathname])
  
  if(userId===null){
    return (<Login></Login>);
  
  }
  return (
    <div className='home'>
    
      <div className="sideBar">
      <h1>Efficiency Engine</h1>
        
         
          <Link to={"/"}><button className='first' onClick={()=>setShowAddButton(true)}> <FontAwesomeIcon icon={faHouse}/>Home</button></Link>
          <Link to={"/dashboard"}><button onClick={()=>setShowAddButton(false)}> <FontAwesomeIcon icon={faChartLine}/> Dashboard</button></Link>
          <button>Settings</button>
          <button> <FontAwesomeIcon icon={faStar}/>Premium</button>
          <Link to={"/login"}><button className='last' onClick={handleLogout}> <FontAwesomeIcon icon={faArrowRightToBracket}  />Log out</button></Link>    
        
           
      </div>
      <div className="mainBar">
       
        <div className="pending">
            {
                <Routes>
                  <Route path='/completed' element={<Completed></Completed>}/>  
                  <Route path='/' element={<Pending></Pending>}/>
                  <Route path='/newTask/:id' element={<NewTask></NewTask>}/>
                  <Route path='/satis' element={<Satisfatcion></Satisfatcion>}/>
                  <Route path='/dashboard' element={<Dashboard></Dashboard>}/>
              
                </Routes>
            }
            <div className='in'>
              {
                showAddButton&&
                <Link to={`/newTask/${user._id}`}onClick={()=>{setShowButtons(false); }}><button className='addButton'>+</button></Link> 
              }
              
            </div>            
        </div>
            
      </div>
      
    </div>
  )
}

export default Home

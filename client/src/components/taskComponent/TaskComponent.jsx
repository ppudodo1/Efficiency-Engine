import React, { useState } from 'react'
import "./taskComponent.css"
import useFetch from '../../hooks/useFetch';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Satisfatcion from '../satisfaction/Satisfatcion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash,faCheck}  from '@fortawesome/free-solid-svg-icons'
function TaskComponent({
  taskTitle,
  taskDesc,
  firstTime,
  secondTime,
  completed,
}) {
  const {user} = useContext(AuthContext);
  const id = user._id
  const {data} = useFetch(`http://localhost:4000/api/user/getAllTasks/${id}`)
  const[finito,setFinito] = useState(false);
  let location = useLocation();
  let index = data.findIndex(task => task.title === taskTitle);
  const completedTask = ()=>{
    axios.post(`http://localhost:4000/api/user/changeTask/${id}/${index}`)

   //window.location.reload();
  }
  const deleteTask = ()=>{
    axios.delete(`http://localhost:4000/api/user/removeTaskByIndex/${id}/${index}`)
    window.location.reload();
  }
  //console.log("Task component: ",location.pathname)
  return (
    <>
    {
      !finito?
        <div className='comp'>
        <div className="fin">
        <h2>{taskTitle}</h2>
        {
          location.pathname!="/completed"&&
          <div className="btns-container">
            <button onClick={()=>{completedTask();setFinito(true)}} className='finished'><FontAwesomeIcon icon={faCheck}/></button>
            <button className='finished'
              onClick={()=>deleteTask()}
            >
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          </div>

        }
          
        </div>
        <p>{taskDesc}</p>
        <hr />
        <p>{firstTime}-{secondTime}</p>
        
      </div>:
      <div>
        <Satisfatcion index={index}></Satisfatcion>
      </div>
    }
     
    </>
    
  )
}

export default TaskComponent

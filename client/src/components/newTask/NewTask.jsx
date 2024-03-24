import React, { useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "./newTask.css"
function NewTask() {
  const {user}= useContext(AuthContext);
  const navigate = useNavigate();
  const id = user._id;
  const d = new Date();

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    //const seconds = date.getSeconds().toString().padStart(2, '0');
    // Format the date as you desire
    const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return formattedDate;
  }
  const [formData,setFormData]=useState({
      title:'',
      desc:'',
      firstTime:'',
      secondTime:'',
      category:'',
      date:formatDate(d),
      completed:false
  });

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.put(`https://deploy-mern-82v2cgx2d-dodos-projects-c4168a69.vercel.app/api/user/tasks/${id}`,
      {
        tasks:formData
      });
      if(res.status===200){
        console.log("Proslo je")
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  }
  const handleChange = (e)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value,
    });
  }
  const handleClick = (e)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value,
    });
  }
 
  return (
    <div className='newTask'>
      <h1>New Task</h1>
      <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      className='taskName' 
      placeholder='Add task name'
      name='title'
      value={formData.title}
      onChange={handleChange}
      />
      <h4 className='pCat'>Category</h4>
      <div className="cat">
        <button
        name='category'
        value='Important'
        onClick={handleClick}
        type='button'
        >Important</button>
        <button
         name='category'
         value='Important'
         type='button'
         onClick={handleClick}>Medium</button>
        <button
         name='category'
         value='Important'
         type='button'
         onClick={handleClick}>Easy</button>
      </div>
      
      <h4>Description</h4>
      <textarea id="" cols="30" rows="10" 
      className='txt'
      placeholder='Add Description...'
      name='desc'
      value={formData.desc}
      onChange={handleChange}
      >

      </textarea>
      <div className="around">
        
        <div className="tim">
          <p>First time</p>
          <input type="time" 
          name='firstTime'
          value={formData.firstTime}
          onChange={handleChange}
          />
        </div>
        <div className="tim">
          <p>Second time</p>
          <input type="time" 
          name='secondTime'
          value={formData.secondTime}
          onChange={handleChange}
          />
        </div>
      </div>
      <div className="moreBtns"> 
        <Link to={"/"}><button className='cancel' type='button'>Cancel</button></Link>
        <button className='create' type='submit'>Create</button>
        
      </div>
      </form>
      
     
    </div>
  )
}

export default NewTask

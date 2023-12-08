import React from 'react'
import TaskComponent from '../../components/taskComponent/TaskComponent'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react'
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import "./pending.css"
function Pending() {
  const {user} = useContext(AuthContext);
  const id = user._id
 
  const {data,loading,err,reFetch}=useFetch(`http://localhost:4000/api/user/pending/${id}`)
 
  if (loading) {
    return <p>Loading...</p>;
  }
  if (err) {
    return <p>Error: {err.message}</p>;
  }
  return (
    <div className='pen'>
       <div className="buttons">
        <Link to={"/"} ><button className='finBtn'>Pending</button></Link> 
        <Link to={"/completed"}><button className='finBtn'>Completed</button></Link> 
      </div>
      {data.map((item)=>(
        <div key={item._id}>
        <TaskComponent 
        taskTitle ={item.title}
        taskDesc = {item.desc}
        firstTime = {item.firstTime}
        secondTime = {item.secondTime}
        completed = {item.completed}
        
        />
        </div>
      ))}
      
      
    </div>
  )
}

export default Pending

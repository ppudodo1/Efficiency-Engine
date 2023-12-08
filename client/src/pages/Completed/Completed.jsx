import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch';
import TaskComponent from '../../components/taskComponent/TaskComponent';
import { Link } from 'react-router-dom';
import "./completed.css"
function Completed() {

    const {user}= useContext(AuthContext);
    const id = user._id;
    const {data,loading,err,reFetch} = useFetch(`http://localhost:4000/api/user/completed/${id}`);

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
     
   
      {data.map(item=>(
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

export default Completed

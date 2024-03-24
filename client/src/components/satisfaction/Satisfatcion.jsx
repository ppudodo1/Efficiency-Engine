import React, { useContext, useState } from 'react'
import "./satisfatcion.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
function Satisfatcion({index}) {
    const [satiNumber,setSatiNumber]=useState(0);
    let points = 0;
    const {user} = useContext(AuthContext);
    const d = new Date();

// Custom date formatting function
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
    const calculate= async ()=>{
        let data = await axios.get(`https://deploy-mern-82v2cgx2d-dodos-projects-c4168a69.vercel.app/api/user/getTaskByIndex/${user._id}/${index}`)
        let dif;
        console.log("Data: ",data.data.firstTime);
        const [hours,minutes]= data.data.firstTime.split(":").map(Number);
        const [secHours,secMinutes] = data.data.secondTime.split(":").map(Number);
        let firstSec = hours*3600 + minutes*60;
        let secondSec = secHours*3600+secMinutes*60;
        //console.log("Hours and minutes and sec: ",hours,minutes,sec);
        if(data.data.category==="Important"){
            dif=3;
        }else if(data.data.category==="Medium"){
          dif=2;
        }else if(data.data.category==="Easy"){
          dif = 1;
        }
        if(firstSec>secondSec){
            let time = (86400-firstSec);
            points = (((time+secondSec)*dif)/10000)*satiNumber;
        }else{
          points = (((secondSec-firstSec)*dif)/10000)*satiNumber;
        }
       
        const formattedDate = formatDate(d);
        try {
            const res = await axios.put(`https://deploy-mern-82v2cgx2d-dodos-projects-c4168a69.vercel.app/api/user/points/${user._id}`,{
              acquiredPoints:{
                points:points,
                time:formattedDate
              }
            })
        } catch (error) {
          throw error;
        }
        window.location.reload();
    }
    const changeNumber= (e) =>{
        setSatiNumber(e.target.value);
    }

  return (
    <div className='satis'>
      <h2>How satisfied were you with this task?</h2>
      <input type="number" min={1} max={10} onChange={changeNumber}/>
      <Link to={"/"}><button onClick={()=>{calculate();}}>Confirm</button></Link>
    </div>
  )
}

export default Satisfatcion

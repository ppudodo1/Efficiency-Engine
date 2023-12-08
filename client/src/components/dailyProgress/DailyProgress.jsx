import React, { useEffect, useState } from 'react'
import "./dailyProgress.css";
function DailyProgress({progressData}) {
  if (progressData==[] || progressData.length==0) {
    //console.log("Nema podataka ovdje u daily progressu");
    return <p>No data available for chart.</p>;
  }
  
  let perc;
  const getDailyProgressData = ()=>{
    if(progressData!=[] || progressData.length!=0){
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${day}.${month}.${year}`;
      
      //let onlyDate = progressData.tasks[8].date;
     
      let today = progressData.tasks.filter((item)=>{
        return item.date.slice(0, 10) === formattedDate;
      });
      let counter = 0;
     
      for(let i = 0;i<today.length;i++){
        if(today[i].completed ==true){
          
          counter++;
        }
      }
  
      if(counter==0){
        perc = 0;
      }else{
        perc = (counter/today.length)*100; 
      }
    }
     
  }
  
    getDailyProgressData();
  
  
  return (
    <div className='progress-container'>
      <h1>Current daily progress:</h1>
     <h1>{perc.toFixed(2)}%</h1>
    </div>
  )
}

export default DailyProgress

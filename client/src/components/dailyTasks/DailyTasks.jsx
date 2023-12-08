import React, { useEffect, useState } from 'react'
import "./dailyTasks.css";
import ScatterChart from '../scatterChart/ScatterChart';
function DailyTasks({dataForChart}) {
  const [chartData, setChartData] = useState({
    type: "scatter",
    data: {
        labels: [],
        datasets: [{
            label: "Points",
            data: [{
              x:10,
              y:20
            }],
            borderColor: 'rgb(175, 144, 235)',
            borderWidth: 4,
            fill: false,
            tension: 0.2
        }]
    }
});
  if(dataForChart==[] || dataForChart.length ==0){
    return <p>No data available for chart.</p>
  }
  
 
  const getDailyProgressData = ()=>{
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}.${month}.${year}`;
    
    let onlyDate = dataForChart.tasks[8].date;
   
    let today = dataForChart.tasks.filter((item)=>{
      return item.date.slice(0, 10) === formattedDate;
    });
    //console.log("Today: ",today[0].firstTime);
    const newChartData = JSON.parse(JSON.stringify(chartData));
    newChartData.data.labels = today.map(dat => dat.firstTime);
    newChartData.data.datasets[0].data = today.map((dat,index) => index);
   
    //setChartData(newChartData);
    console.log(newChartData)
  }
  
  
 
  return (
    <div className='tasks-container'>
      DailyTasks
      <button onClick={()=>getDailyProgressData()}>Click me</button>
      <ScatterChart chartData={chartData}></ScatterChart>
    </div>
  )
}

export default DailyTasks

import React, { useContext, useEffect, useRef, useState } from 'react'
import "./dashboard.css"
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context/AuthContext'
import Chart from "chart.js/auto";
import { CategoryScale } from 'chart.js/auto';
import LineChart from '../../components/lineChart/LineChart';
import DailyTasks from '../../components/dailyTasks/DailyTasks';
import DailyProgress from '../../components/dailyProgress/DailyProgress';
import BarC from '../../components/barC/BarC.jsx';

Chart.register(CategoryScale);

function Dashboard() {
    const { user } = useContext(AuthContext);
    const { data, loading, err, reFetch } = useFetch(`https://deploy-mern-82v2cgx2d-dodos-projects-c4168a69.vercel.app/api/user/data/${user._id}`);
    const [next,setNext] = useState(false);
    const [checkMonthly,setCheckMonthly] = useState(false);
    const[selectedMonth,setSelectedMonth] = useState('nothing');
    const [dataManipulated, setDataManipulated] = useState(false);
    const[test,setTest] = useState(false);

   const monthlyData = [[],[],[],[],[],[],[],[],[],[],[],[]];

    //console.log("Renderanje");    
    //console.log("Originalni podatci",data);
    const [chartData, setChartData] = useState({
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Points",
                data: [],
                borderColor: 'rgb(175, 144, 235)',
                borderWidth: 4,
                fill: false,
                tension: 0.2
            }]
        }
    }); 
    
   
    //ovdje kao prvo treba inicijalizirati array odmah od 12 elemenata a ne ici u hodu i onda incijalizirati
    const getMonthlyData = (dataForMonths)=>{
        let first = 1;
        // Initialize the first sub-array
        for (let i = 0; i < dataForMonths.length; i++) {
            first = dataForMonths[i].time[4];
            let second = dataForMonths[i].time[3];
            if (second == 1) {
                let drugo = "" + dataForMonths[i].time[3] + first;
                monthlyData[drugo - 1].push(dataForMonths[i]);
            } else {
                monthlyData[first - 1].push(dataForMonths[i]);
            }
        }
        //console.log("Je li manipuliran: ",dataManipulated);
       
       
              
    }
   
 
    const manipulateChartData = (e) => {
        const selectedValue = e.target.value;
        setSelectedMonth(selectedValue);
        getMonthlyData(data.acquiredPoints);
        if(selectedValue === "nothing"){
            setCheckMonthly(false);
        } else {
            const newChartData = JSON.parse(JSON.stringify(chartData));
            newChartData.data.labels = monthlyData[Number(selectedValue)].map(dat => dat.time);
            newChartData.data.datasets[0].data = monthlyData[Number(selectedValue)].map(dat => dat.points);
           setChartData(newChartData)
        }
    };
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!loading && data && data.acquiredPoints) {
        if(checkMonthly!=true){
            //console.log("Usli smo");
            chartData.data.labels = data.acquiredPoints.map(dat => dat.time);
            chartData.data.datasets[0].data = data.acquiredPoints.map(dat => dat.points);
        }
    }
    if (err) {
        return <p>Error: {err.message}</p>;
    }
   
  return (
    <div>
        {
            !next?
            <LineChart chartData={chartData}/>:
            <BarC chartData={chartData}/>
        }
        <div className="resBtn">
            <button onClick={()=>setNext(!next)} className='next'>Next</button>
            <select name="months" id="months" onChange={(e)=>{setCheckMonthly(true);manipulateChartData(e);}}>
                <option value="nothing">Sort by month</option>
                <option value={0}>January</option>
                <option value={1}>February</option>
                <option value={2}>March</option>
                <option value={3}>April</option>
                <option value={4}>May</option>
                <option value={5}>June</option>
                <option value={6}>July</option>
                <option value={7}>August</option>
                <option value={8}>September</option>
                <option value={9}>October</option>
                <option value={10}>November</option>
                <option value={11}>December</option>
               
            </select>
        </div>
        <div className="daily">
            {data.length==0? <></>: <DailyProgress progressData = {data}></DailyProgress>}
            
        </div>
    </div>
  )
}

export default Dashboard

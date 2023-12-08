import React from 'react';
import { Line } from 'react-chartjs-2';
import "./lineChart.css"

function LineChart({ chartData }) {
  if (!chartData || !chartData.data || !chartData.data.labels || !chartData.data.datasets[0]?.data) {
    return <p>No data available for chart.</p>;
  }

  return (
    <div className='outside'>
        <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      
      <Line
        className='lin'
        data={chartData.data}
        options={
          
          {
          plugins: {
            title: {
              display: true,
              text: "Points graph"
            }
          },
          responsive: true,
        maintainAspectRatio: false
          
        }}
      />
    </div>
    
    </div>
    
  );
}

export default LineChart;
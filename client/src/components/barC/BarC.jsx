import React from 'react'
import { Bar } from 'react-chartjs-2'
function BarC({chartData}) {
    if (!chartData || !chartData.data || !chartData.data.labels || !chartData.data.datasets[0]?.data) {
        return <p>No data available for chart.</p>;
      }
  return (
    <div className='outside'>
        <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      
      <Bar
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
  )
}

export default BarC

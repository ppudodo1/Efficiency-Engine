import React from 'react'
import "./scatterChart.css"
import { Scatter } from 'react-chartjs-2'

function ScatterChart({chartData}) {

 
  return (
    <div className='chartContainer'>
        <Scatter
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
  )
}

export default ScatterChart

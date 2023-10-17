import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'



const BarChart = ({ datas }) => {

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: [
          'Veda',
          'Vyoma',
          'Jwala',
          'Tatva'
        ],
        datasets: [{
          label:"",
          borderRadius:6,
          barThickness: 60,
          maxBarThickness: 80,
          minBarLength: 10,
          data:datas,
          backgroundColor: [
            '#99B080', '#DA0C81', '#98E4FF', '#FFF5E0'
          ],
          color:"white"
        }
        ]

      }, options: {
        
        scales: {
          x: {
            color: 'white', // Set x-axis label color to white
            ticks: {
              color: 'white', // Set x-axis ticks color to white
            },
          },
          y: {
            color: 'black', // Set y-axis label color to white
            ticks: {
              color: 'white', // Set y-axis ticks color to white
            },
          },
        },
      },

    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    }
  }, [])
  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  )
}

export default BarChart

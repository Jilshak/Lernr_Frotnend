import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart() {
  const data = {
    labels: ['Number of Courses', 'Courses Uploaded'],
    datasets: [
      {
        data: [15, 10],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', 
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutChart;

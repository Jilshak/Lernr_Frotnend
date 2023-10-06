import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

function ProfitChart(props) {
  const { title } = props;
  const [isYearly, setIsYearly] = useState(false);

  const monthlyLineColors = 'rgba(75, 192, 192, 1)';
  const yearlyLineColors = 'rgba(75, 192, 192, 0.6)';

  const monthlyData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: `${title} (Monthly)`,
        backgroundColor: monthlyLineColors,
        borderColor: monthlyLineColors,
        borderWidth: 2,
        fill: false,
        data: [200, 300, 400, 350, 500, 600, 700, 800, 750, 900, 1000, 1100],
      },
    ],
  };

  const yearlyData = {
    labels: ['2021', '2022', '2023'],
    datasets: [
      {
        label: `${title} (Yearly)`,
        backgroundColor: yearlyLineColors,
        borderColor: yearlyLineColors,
        borderWidth: 2,
        fill: false,
        data: [5000, 6000, 7000],
      },
    ],
  };

  const data = isYearly ? yearlyData : monthlyData;

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Profit',
        },
      },
    },
  };

  return (
    <div>
      <div className='flex items-center justify-end'>
        <button onClick={() => setIsYearly(!isYearly)} className="badge badge-outline mx-3 relative bottom-8">
          {isYearly ? 'Monthly' : 'Yearly'}
        </button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default ProfitChart;

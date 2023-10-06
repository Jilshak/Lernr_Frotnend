import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

function InstructorProfitChart(props) {
  const { title, count } = props;
  const [isYearly, setIsYearly] = useState(false);

  const monthlyLineColors = 'rgba(255, 99, 132, 1)';
  const yearlyLineColors = 'rgba(255, 99, 132, 0.6)';

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
        data: count?.monthlyProfit,
      },
    ],
  };

  const yearlyData = {
    labels: ['2023', '2022', '2021'],
    datasets: [
      {
        label: `${title} (Yearly)`,
        backgroundColor: yearlyLineColors,
        borderColor: yearlyLineColors,
        borderWidth: 2,
        fill: false,
        data: count?.yearlyProfit,
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
        <h1 className='text-sm relative left-16 font-bold'>Total: {count?.totalProfit}</h1>
        <button onClick={() => setIsYearly(!isYearly)} className="badge badge-outline mx-3 relative bottom-8">
          {isYearly ? 'Monthly' : 'Yearly'}
        </button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default InstructorProfitChart;

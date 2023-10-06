import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

function ProfitChart(props) {
  const { title, count } = props;
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
        data: count.monthlyProfits,
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
        data: count.yearlyProfits,
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

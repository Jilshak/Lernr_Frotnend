import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function LineChart(props) {
    const { title } = props;
    const [isYearly, setIsYearly] = useState(false);

    const monthlyLineColors = 'rgba(75, 192, 192, 1)';
    const yearlyLineColors = 'rgba(255, 99, 132, 1)';

    const monthlyData = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: `${title} (Monthly)`,
                borderColor: monthlyLineColors, // Use monthly line color
                borderWidth: 2,
                fill: false, // Do not fill the area under the line
                data: [200, 300, 400, 350, 500, 600, 700, 800, 750, 900, 1000, 1100],
            },
        ],
    };

    const yearlyData = {
        labels: ['2021', '2022', '2023'],
        datasets: [
            {
                label: `${title} (Yearly)`,
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
            y: {
                beginAtZero: true,
            },
            x: {
                title: {
                    display: true,
                    text: isYearly ? 'Year' : 'Month',
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

export default LineChart;

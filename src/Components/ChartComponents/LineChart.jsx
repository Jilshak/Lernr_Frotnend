import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function LineChart(props) {
    const { title, count } = props;
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
                borderColor: monthlyLineColors,
                borderWidth: 2,
                fill: false, 
                data: count.monthlyCounts,
            },
        ],
    };

    const yearlyData = {
        labels: ['2023', '2022', '2021'],
        datasets: [
            {
                label: `${title} (Yearly)`,
                borderColor: yearlyLineColors, 
                borderWidth: 2,
                fill: false,
                data: count.yearlyCounts,
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

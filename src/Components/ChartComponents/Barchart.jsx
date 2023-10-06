import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'

function Barchart(props) {
    const { title, count } = props;
    const [isYearly, setIsYearly] = useState(false);

    const monthlyBarColors = [
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(75, 192, 192, 1)',
        'rgba(0, 0, 255, 0.2)',
        'rgba(255, 0, 0, 0.2)',
        'rgba(255, 165, 0, 0.2)',
        'rgba(255, 255, 0, 0.2)',
        'rgba(0, 128, 0, 0.2)',
        'rgba(0, 0, 255, 0.4)',
        'rgba(128, 0, 128, 0.2)',

    ];

    const yearlyBarColors = [
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(75, 192, 192, 1)',
        'rgba(0, 0, 255, 0.2)',
        'rgba(255, 0, 0, 0.2)',
        'rgba(255, 165, 0, 0.2)',
        'rgba(255, 255, 0, 0.2)',
        'rgba(0, 128, 0, 0.2)',
        'rgba(0, 0, 255, 0.4)',
        'rgba(128, 0, 128, 0.2)',
    ];

    const monthlyData = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: `${title} Gained (Monthly)`,
                backgroundColor: monthlyBarColors, 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: count?.monthlyCounts,
            },
        ],
    };

    const yearlyData = {
        labels: ['2023', '2022', '2021'],
        datasets: [
            {
                label: `${title} Gained (Yearly)`,
                backgroundColor: yearlyBarColors, 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: count?.yearlyCounts,
            },
        ],
    };

    const data = isYearly ? yearlyData : monthlyData;

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                stacked: true,
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
            <Bar data={data} options={options} />
        </div>
    );
}

export default Barchart;

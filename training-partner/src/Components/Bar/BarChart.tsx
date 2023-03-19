//Library
import React from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';
import {Chart as ChartJS,  CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './BarChart.css';

function BarChart(){
    ChartJS.register(CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,);
    const reglage={
        indexAxis : 'y' as const,
        scales: {
            x: {
                display: true,
                color:'green',
                grid:{display:true,color:'black'},
                suggestedMin: 0,
                suggestedMax: 10,
            },
            y:{
                display : true,
                tick : {
                    reverse : false
                }
            }
        }
    };
    const donnee={
        labels: ['Vitesse', 'Force', 'Difficulté','Ressenti'],
    datasets: [
      {
        label: 'Bar Chart',
        data:[4, 9, 2,6],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'DDDDDD',
        borderWidth: 1,
      },
    ],
    };
    return <div className='barChart'><Bar data={donnee} options={reglage}/></div>;
}

export default BarChart;
//Library
import React from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';
import {Chart as ChartJS,RadialLinearScale,PointElement,LineElement,Tooltip,Legend,} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import './SpiderChart.css';
import '../../Containers/Formulaire/Formulaire';
import Formulaire from '../../Containers/Formulaire/Formulaire';

//Components

function SpiderChart(){
    ChartJS.register(RadialLinearScale,PointElement,LineElement,Tooltip,Legend);
    const reglage ={
        scales: {
            r: {
                angleLines: {display: true,color:'green'},
                grid:{display:true,color:'black'},
                suggestedMin: 0,
                suggestedMax: 15
            }
        }
    };
  //Pour test préremplie.
  //Fonction recupérant les donné en cours de réalisation.
  const donnee = {
    labels: ['Vitesse', 'Force', 'Difficulté','Ressenti'],
    datasets: [
      {
        label: 'Spider Chart',
        data:[4, 9, 2,6],
        backgroundColor: 'white',
        borderColor: 'DDDDDD',
        borderWidth: 3,
      },
    ],
  };
  return (
  <div className='spiderChart'><Radar data={donnee} options={reglage}/></div>
  );
}
export default SpiderChart;
//Library
import React from 'react';
import './App.css';



//Components
<<<<<<< HEAD
import Formulaire from '../../Containers/Formulaire/Formulaire';
import { Bar } from 'react-chartjs-2';
import BarChart from '../Bar/BarChart';
import Tab_bord from '../Elements_fixe/tableau_de_bord/tab_bord';
import Header from '../Elements_fixe/barre_top/head';
import HomeChart from '../Pages/page_chart/page_chart';
function App() {    
 return(
  <div className='App'>
    <Header/>
    <Tab_bord/>
    <HomeChart/>
=======



import ChartCreate from '../Pages/ChartCreate/ChartCreate';



function App() {    
 return(
  <div className='App'>
    <ChartCreate/>
>>>>>>> b7a78870117e8be7e448a790c137a6da68e0cd91
  </div>
 );
}

export default App;

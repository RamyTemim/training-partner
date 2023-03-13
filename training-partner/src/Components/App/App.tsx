//Library
import React, { useState } from 'react';
import './App.css';



//Components
import Formulaire from '../../Containers/Formulaire/Formulaire';
import { Bar } from 'react-chartjs-2';
import BarChart from '../Bar/BarChart';
import Tab_bord from '../ElementsFixe/TableauDeBord/TabBord';
import Header from '../ElementsFixe/barreTop/head';
function App() {    
 return(
  <div className='App'>
    <Header/>
    <Tab_bord/>
  </div>
 );
}

export default App;

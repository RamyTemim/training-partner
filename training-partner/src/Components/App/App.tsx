//Library
import React, { useState } from 'react';
import './App.css';



//Components
import Formulaire from '../../Containers/Formulaire/Formulaire';
import { Bar } from 'react-chartjs-2';
import BarChart from '../Bar/BarChart';
import Tab_bord from '../Elements_fixe/tableau_de_bord /tab_bord';
function App() {    
 return(
  <div className='App'>

    <Tab_bord/>
  </div>
 );
}

export default App;

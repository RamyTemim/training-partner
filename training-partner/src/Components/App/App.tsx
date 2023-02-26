//Library
import React, { useState } from 'react';
import './App.css';
import '../../Containers/Formulaire/Formulaire';
import Tab_bord  from '../Elements_fixe/tableau_de_bord /tab_bord';


//Components
import Formulaire from '../../Containers/Formulaire/Formulaire';

function App() {    
 return(
  <div className='App'>
    <Formulaire/>  
    <div>
      <Tab_bord/>
  </div>
  </div>
  
 );
}

export default App;

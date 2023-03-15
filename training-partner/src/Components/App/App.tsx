//Library
import React from 'react';
import './App.css';



//Components



import ChartCreate from '../Pages/ChartCreate/ChartCreate';
import ChartVisu from '../Pages/ChartVisu/ChartVisu';
import Header from '../ElementsFixe/BarreTop/head';
import TabBord from '../ElementsFixe/TableauDeBord/TabBord';


function App() {    
 return(
  <div className='App'>
    <ChartCreate/>
  </div>
 );
}

export default App;

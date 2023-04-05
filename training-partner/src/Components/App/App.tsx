//Library
import React, {useState, useEffect} from 'react';
import './App.css';

//Components

import ChartCreate from '../Pages/ChartCreate/ChartCreate';
import ChartVisu from '../Pages/ChartVisu/ChartVisu';
import Header from '../ElementsFixe/BarreTop/head';
import TabBord from '../ElementsFixe/TableauDeBord/TabBord';
import PageBattle from '../Pages/Battle/PageBattle';
import PageActivite from '../Pages/Activite/Activite';
import Auth from '../Pages/Auth/Auth';
import Informations from '../ElementsFixe/BarreTop/MenuUser/Informations';
import { getSystemErrorName } from 'util';

function App() {    
  const [Accueil, setAccueil] = useState(false);
  const [Activite, setActivite] = useState(false);
  const [Conseil, setConseil] = useState(false);
  const [chartVisu, setChartVisu] = useState(false);
  const [chartCreate,setChartCreate] = useState(false);
  const [Battle, setBattle] = useState(false);
  
  useEffect(() => {
    const message = {
      name: "John Doe",
      age: 30,
      email: "jongenshin@example.com"
    };
    fetch('http://localhost:3000/bite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then(response => response.text())
      .then(data => console.log(data))
  }, []);
  
  const clickcv = (page : number)=>{
    if (page == 0){
      setAccueil(true);setActivite(false);setConseil(false);setChartCreate(false);setChartVisu(false);setBattle(false);
    }
    if (page == 1){
      setActivite(true);setConseil(false);setChartCreate(false);setChartVisu(false);setBattle(false);setAccueil(false);
    }
    if (page == 2){
      setConseil(true);setChartCreate(false);setChartVisu(false);setBattle(false);setAccueil(false);setActivite(false);
    }
    if (page == 3){
      setChartVisu(true);setChartCreate(false);setBattle(false);setAccueil(false);setActivite(false);setConseil(false);
   }
    if (page == 4){
      setChartCreate(true);setChartVisu(false);setBattle(false);setAccueil(false);setActivite(false);setConseil(false);
     }
    if (page == 5){
      setBattle(true);setAccueil(false);setActivite(false);setConseil(false);setChartCreate(false);setChartVisu(false);

    }
  }

  return(
    <div className='App'>
      <Auth />
    </div>
  );
}

export default App;
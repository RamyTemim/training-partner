//Library
import React, {useState, useEffect} from 'react';

//Components

import ChartCreate from '../ChartCreate/ChartCreate';
import ChartVisu from '../ChartVisu/ChartVisu';
import Header from '../../ElementsFixe/BarreTop/head';
import TabBord from '../../ElementsFixe/TableauDeBord/TabBord';
import PageBattle from '../Battle/PageBattle';
import PageActivite from '../Activite/Activite';
import PageAccueil from './PageAccueil';
import { getSystemErrorName } from 'util';

function Accueil() {    
  const [Accueil, setAccueil] = useState(true);
  const [Activite, setActivite] = useState(false);
  const [Conseil, setConseil] = useState(false);
  const [chartVisu, setChartVisu] = useState(false);
  const [chartCreate,setChartCreate] = useState(false);
  const [Battle, setBattle] = useState(false);
  
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
    <div>
      <TabBord onPageChange ={clickcv}/>
      <Header/>
      {Accueil && <PageAccueil/>} 
      {Activite && <PageActivite/>}
      {Conseil && null}
      {chartCreate && <ChartCreate/>}
      {chartVisu && <ChartVisu/>}
      {Battle && <PageBattle/>}
    </div>
  );
}

export default Accueil;
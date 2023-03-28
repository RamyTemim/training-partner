//Library
import React, {useState} from 'react';
import './App.css';

//Components



import ChartCreate from '../Pages/ChartCreate/ChartCreate';
import ChartVisu from '../Pages/ChartVisu/ChartVisu';
import Header from '../ElementsFixe/BarreTop/head';
import TabBord from '../ElementsFixe/TableauDeBord/TabBord';
import PageBattle from '../Pages/Battle/PageBattle';
import PageActivite from '../Pages/Activite/Activite';


function App() {    

  const [Accueil, setAccueil] = useState(false);
  const [Activite, setActivite] = useState(false);
  const [Conseil, setConseil] = useState(false);
  const [chartVisu, setChartVisu] = useState(false);
  const [chartCreate,setChartCreate] = useState(false);
  const [Battle, setBattle] = useState(false);
  const clickcv = (page : number)=>{

    console.log("Page est egale à "+ page);

    if (page ==0){
      setAccueil(true);setActivite(false);setConseil(false);setChartCreate(false);setChartVisu(false);setBattle(false);
    }
    if (page == 1){
      setActivite(true);setConseil(false);setChartCreate(false);setChartVisu(false);setBattle(false);setAccueil(false);
    }
    if (page ==2){
      setConseil(true);setChartCreate(false);setChartVisu(false);setBattle(false);setAccueil(false);setActivite(false);
    }
    if (page ==3){
      setChartVisu(true);setChartCreate(false);setBattle(false);setAccueil(false);setActivite(false);setConseil(false);
   }
    if (page == 4){
      setChartCreate(true);setChartVisu(false);setBattle(false);setAccueil(false);setActivite(false);setConseil(false);
     }
    if (page ==5){
      setBattle(true);setAccueil(false);setActivite(false);setConseil(false);setChartCreate(false);setChartVisu(false);
    }
    }
return(
  <div className='App'>

    <TabBord onPageChange ={clickcv}/>
    <Header/>
    {Accueil && <ChartCreate/>} 
    {Activite && <PageActivite/>}
    {Conseil && null}
    {chartCreate && <ChartCreate/>}
    {chartVisu && <ChartVisu/>}
    {Battle && <PageBattle/>}


  </div>
 );
}

export default App;

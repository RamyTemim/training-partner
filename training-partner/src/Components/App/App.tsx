//Library
import React, {useState} from 'react';
import './App.css';

//Components



import ChartCreate from '../Pages/ChartCreate/ChartCreate';
import ChartVisu from '../Pages/ChartVisu/ChartVisu';
import Header from '../ElementsFixe/BarreTop/head';
import TabBord from '../ElementsFixe/TableauDeBord/TabBord';



function App() {    
  const [chartVisu, setChartVisu] = useState(false);
  const [chartCreate,setChartCreate] = useState(false);
  const [Accueil, setAccueil] = useState(false);

  const clickcv = (page : number)=>{

    console.log("Page est egale à "+ page);

    if (page ==0){
      setAccueil(true);setChartCreate(false);setChartVisu(false)
    }
    if (page ==3){
      setChartVisu(true); setChartCreate(false); setAccueil(false);
      console.log("Page visu ")

   }
    else if (page == 4){
      setChartCreate(true); setChartVisu(false); setAccueil(false);
      console.log("Page create");
     }
     else {
       console.log(" cps 3 ni 4");
     }
    }
return(
  <div className='App'>

    <TabBord onPageChange ={clickcv}/>
    <Header/>
    
    {chartCreate && <ChartCreate/>}{chartVisu && <ChartVisu/>} {Accueil && <ChartCreate/>} 

  </div>
 );
}

export default App;

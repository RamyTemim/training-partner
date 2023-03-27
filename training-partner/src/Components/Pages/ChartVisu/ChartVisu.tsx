import React, {useState} from 'react';
import "./ChartVisu.css";
import defilement from "./defilement.png"
import TabBord from '../../ElementsFixe/TableauDeBord/TabBord';
import Header from '../../ElementsFixe/BarreTop/head';
import {Chart,RadialLinearScale,PointElement,LineElement,Filler,Tooltip,Legend,LinearScale,CategoryScale,BarElement,Title,ArcElement} from 'chart.js';
import { Bar, PolarArea, Radar } from 'react-chartjs-2';


type GraphType = "spiderchart" | "bar" | "polar";

function ChartVisu(){
    return (
        <div id="main">
            <BoxSport/>
            <BoxGraphique/>
        </div>
    );

}

function BoxSport(){
    const [showSportMenu, setSportMenu] = useState(false);

    const affMenu = ()=>{
        setSportMenu(!showSportMenu);
    }
    
    
    return(
    <div className='boxSport'>

        <button onClick={affMenu}>Sport <img title='defilement' alt='defilement' src={defilement} id="defilsport"/></button>
        {showSportMenu && <MenuSport/>}
    </div>
    );
}   

function MenuSport(){
    const[showEscalade,setShowEscalade] = useState(false);
    const[showCourse, setShowCourse] = useState(false);
    const[showMuscu, setShowMuscu] = useState(false);

    const affEsca =()=>{
        setShowEscalade(!showEscalade)
        setShowCourse(false)
        setShowMuscu(false)

    }
    const affCourse = ()=>{
        setShowCourse(!showCourse)
        setShowMuscu(false)
        setShowEscalade(false)
    }
    const affMuscu =()=>{
        setShowMuscu(!showMuscu)
        setShowEscalade(false)
        setShowCourse(false)
    }
    return (
        <div className='menuSport'>
            <button onClick={affEsca} id="menuSport1">Escalade</button>
            {showEscalade && <SeanceEscalade/>}
            <button onClick={affCourse}id="menuSport2">Course</button>
            {showCourse && <SeanceCourse/>}
            <button onClick={affMuscu} id="menuSport3">Musculation</button>
            {showMuscu && <SeanceMuscu/>}
        </div>
    );
    
}
function SeanceEscalade(){
    return(
        <div className='seanceEsca'>
            <button id ="seanceEscaladeA">Seance A</button>
            <button id ="seanceEscaladeB">Seance B</button>
            <button id ="seanceEscaladeC">Seance C</button>
        </div>
    )
}

function SeanceCourse(){
    return(
        <div className='seanceCourse'>
            <button id ="seanceCourseA">Seance D</button>
            <button id ="seanceCourseB">Seance E</button>
            <button id ="seanceCourseC">Seance F</button>
        </div>
    )
}
function SeanceMuscu(){
    return(
        <div className='seanceMuscu'>
            <button id ="seanceMuscuA">Seance G</button>
            <button id ="seanceMuscuB">Seance H</button>
            <button id ="seanceMuscuC">Seance I</button>
        </div>
    )
}


function BoxGraphique(){
    let dateSeance= "22/02/23"
    const [selectedType, setSelectedType] = useState<GraphType>("spiderchart");
    const [chartDonnee, setchartDonnee] = useState({
        labels: [] as string[],
        datasets: [
          {
            label:"Seance du " + dateSeance,
            data: [] as number[],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: 'DDDDDD',
            borderWidth: 2,
          },
        ],
      });
      const reglage={
        scales: {
            r: {
                angleLines: {display: true,color:'green'},
                grid:{display:true,color:'black'},
                suggestedMin: 0,
                suggestedMax: 10
            }
        }
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value as GraphType);
      };
    const getGraph = () => {
      switch (selectedType) {
        case "bar":{
          Chart.register(CategoryScale,Filler,LinearScale,BarElement,Title,Tooltip,Legend,);
      
          return <Bar className="graphBar" data={chartDonnee} options={reglage}/>;
      }
        case "polar":{
          Chart.register(RadialLinearScale,Filler, ArcElement, Tooltip, Legend);

          return <PolarArea className="graphPolar" data={chartDonnee} options={reglage}/>;
        }
        case "spiderchart":{
          Chart.register(RadialLinearScale,Filler,PointElement,LineElement,Tooltip,Legend,);
          return <Radar className="graphRadar" data={chartDonnee} options={reglage} />;
        }
      }
    };
    
    return(
        <>
        <div className ="boxGraphique">
        <select  id="typeList" value={selectedType} onChange={handleTypeChange}>
          <option value="spiderchart">Spider Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="polar">Polar Chart</option>
        </select>
        </div>
        <div className="chartVisu">
            {getGraph()}
        </div>
        </>
    )

}


export default ChartVisu;
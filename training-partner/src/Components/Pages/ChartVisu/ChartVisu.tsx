import React, {useState} from 'react';
import "./ChartVisu.css";
import defilement from "./defilement.png"
import TabBord from '../../ElementsFixe/TableauDeBord/TabBord';
import Header from '../../ElementsFixe/BarreTop/head';
import { resolveTripleslashReference } from 'typescript';
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
    const [showGraphMenu, setGraphMenu] = useState(false);
    const affMenu =()=>{
        setGraphMenu(!showGraphMenu)
    }
    return(
        <div className ="boxGraphique">

            <button onClick={affMenu}><span className='txt_button'>Graphique <img title='' alt= ''src={defilement} id="defilgraph"/></span></button>
            {showGraphMenu && <GraphMenu/>}
        </div>
    )

}

function GraphMenu(){
    return (
        <div className='menuGraph'>
            <button id="menuGraph1">Baton Horizontale</button>
            <button id="menuGraph2">Baton Verticale</button>
            <button id="menuGraph3">Spider Chart</button>
            <button id="menuGraph4">Polar Chart</button>
            <button id="menuGraph5">Linear</button>

        </div>
    )
}

export default ChartVisu;
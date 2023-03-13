import React, {useState} from 'react';
import "./page_chart.css";
import defilement from "./defilement.png"
function HomeChart(){
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

        <button>Sport <img src={defilement} id="defilsport"/></button>

    </div>
    );
}

function BoxGraphique(){
    return(
        <div className ="boxGraphique">

            <button><span className='txt_button'>Graphique <img src={defilement} id="defilgraph"/></span></button>

        </div>
    )

}


export default HomeChart;
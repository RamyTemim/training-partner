import React, {useState} from 'react';
import "./PageChart.css";
import defilement from "./defilement.png"
import TabBord from '../../ElementsFixe/TableauDeBord/TabBord';
import Header from '../../ElementsFixe/BarreTop/head';
function ChartVisu(){
    return (
        <div id="main">
            <TabBord/>
            <Header/>
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

        <button>Sport <img title='defilement' alt='defilement' src={defilement} id="defilsport"/></button>

    </div>
    );
}

function BoxGraphique(){
    return(
        <div className ="boxGraphique">

            <button><span className='txt_button'>Graphique <img title='' alt= ''src={defilement} id="defilgraph"/></span></button>

        </div>
    )

}


export default ChartVisu;
import "./tab_bord.css";
import React, { useState } from 'react';



function Tab_bord() {
    const [isCLicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isCLicked);
    }

    return (
    <div onClick={handleClick} id="Boite">
        Test click
        {isCLicked && (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }} id="TB_Div">
        <button id = "TB_Accueil">Accueil</button>
        <button id= "TB_Activite">Activité</button>
        <button id= "TB_Conseil">Conseil</button>
        <button id= "TB_Battles">Battles</button>
        <button id= "TB_Charts">Charts</button>
      </div>)}
    </div>
    );
  }
  
  export default Tab_bord;
import { useState } from "react";
import TableauSeance from "./TableauSeance";
import "./VisuSeance.css";

const VisuSeance : React.FC =()=>{
    //state de gestion du select
    const [sport,setSport]=useState("musculation");

    //fonction de gestion de la selection du sport
    const handleSportChange =(event: React.ChangeEvent<HTMLSelectElement>)=>{
        event.preventDefault();//empeche le rechargement de la page
        setSport(event.target.value);//met a jour le sport selectionné dans le state
    }
    //affichage du select et de composant
    return (
        <div>
            <select  title="selectSport" className="selectSportVisu" value={sport} onChange={handleSportChange}>
                <option value="musculation">Musculation</option>
                <option value="escalade">Escalade</option>
                <option value="course">Course à pieds</option>
            </select>
            <TableauSeance/>
        </div>
    )
}

export default VisuSeance;
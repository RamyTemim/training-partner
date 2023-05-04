import { useState } from "react";
import SessionTables from "./TableauSeance";
import "./VisuSeance.css";
import TableMuscu from "./TableauSeance";
import TableCourse from "./TableauCourse";
import TableEscalade from "./TableauEscalade";


const VisuSeance : React.FC =()=>{
    //state de gestion du select
    const [sport,setSport]=useState("Musculation");

    //fonction de gestion de la selection du sport
    const handleSportChange =(event: React.ChangeEvent<HTMLSelectElement>)=>{
        event.preventDefault();//empeche le rechargement de la page
        setSport(event.target.value);//met a jour le sport selectionné dans le state
    }
    const getTable=()=>{
        switch(sport){
            case "Musculation":
                return <TableMuscu/>;
            case "Course":
                return <TableCourse/>;
            case "Escalade":
                return <TableEscalade/>
        }
    }
    //affichage du select et de composant
    return (
        <div>
            <select  title="selectSport" className="selectSportVisu" value={sport} onChange={handleSportChange}>
                <option value="Musculation">Musculation</option>
                <option value="Escalade">Escalade</option>
                <option value="Course">Course à pieds</option>
            </select>
            {getTable()}
        </div>
    )
}

export default VisuSeance;
import { useState } from "react";
import TableauSeance from "./TableauSeance";
import "./VisuSeance.css";

const VisuSeance : React.FC =()=>{
    const [sport,setSport]=useState("musculation");

    const handleSportChange =(event: React.ChangeEvent<HTMLSelectElement>)=>{
        event.preventDefault();
        setSport(event.target.value);
    }

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
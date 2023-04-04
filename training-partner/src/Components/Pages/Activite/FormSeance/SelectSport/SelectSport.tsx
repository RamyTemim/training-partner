import React, { useState } from "react";
import "./SelectSport.css";


const SelectSport:React.FC=()=>{
    const [sport,setSport]=useState("musculation");

    const handleSportChange =(event: React.ChangeEvent<HTMLSelectElement>)=>{
        setSport(event.target.value);
    }
    

    return (
        <select  className="sportList" value={sport} onChange={handleSportChange}>
          <option value="musculation">Musculation</option>
          <option value="escalade">Escalade</option>
          <option value="course">Course à pieds</option>
        </select>
    );
}

export default SelectSport;

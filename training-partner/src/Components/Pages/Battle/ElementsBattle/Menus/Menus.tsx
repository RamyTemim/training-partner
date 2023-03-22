import react, { useState } from 'react';
import './Menus.css';

interface Seance {
    nom : string;
    sport : string;
}

function Menus(){
    const [seances,setSeances] = useState<Seance[]>([
        { nom : "SeanceX1", sport : "Natation" },
        { nom : "SeanceY1", sport : "Natation" },
        { nom : "SeanceX3", sport : "Escalade" },
        { nom : "SeanceY3", sport : "Escalade" },
        { nom : "SeanceX2", sport : "Natation" },
        { nom : "SeanceY2", sport : "Natation" },
        { nom : "SeanceX4", sport : "Escalade" },
        { nom : "SeanceY4", sport : "Escalade" },
    ])
    
    const [selectedSport, setSelectedSport] = useState<string>("Sport");
    const [selectedSeanceX, setSelectedSeanceX] = useState<string>("");
    const [selectedSeanceY, setSelectedSeanceY] = useState<string>("");

    const sports : string[] = ["Natation","Escalade","Basketball"];
    const [filteredSeances, setFilteredSeances] = useState<Seance[]>([]);
    const seanceX = filteredSeances.filter( (seance) => seance.sport === selectedSport && seance.nom.startsWith("Seance")).map(seance => seance.nom);
    const seanceY = filteredSeances.filter( (seance) => seance.sport === selectedSport && seance.nom.startsWith("Seance")).map(seance => seance.nom);
    
    const handleSportChange = (sport : string) => {
        setSelectedSport(sport); 
        const filtered = seances.filter( (seance) => seance.sport === sport );
        setFilteredSeances(filtered);
    }

    const handleSeanceXChange = (seance : string) => {
        setSelectedSeanceX(seance);
        setSelectedSeanceY(seanceY.filter(item => item !==seance)[0]);
    }
    const handleSeanceYChange = (seance : string) => {
        setSelectedSeanceY(seance);
        setSelectedSeanceX(seanceX.filter(item => item !==seance)[0]);
    }

    return (
        <div className='containerMenus'>       
            <select id="dropMenuSport" onChange={ (event)=> handleSportChange(event.target.value) }>
                {sports.map((sport) =>(
                    <option key ={sport}>
                        {sport}
                    </option>
                ))}
            </select>

            <select id="dropMenuSeanceX" value={selectedSeanceX} onChange={ (event)=> handleSeanceXChange(event.target.value) }>
                {filteredSeances.map((seance) =>(
                    <option key = {seance.nom}>
                        {seance.nom}
                    </option>
                ))}
            </select>

            <select id="dropMenuSeanceY" value={selectedSeanceY} onChange={ (event)=> handleSeanceYChange(event.target.value) }>
                {filteredSeances.map((seance) =>(
                    <option key = {seance.nom}>
                        {seance.nom}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Menus;
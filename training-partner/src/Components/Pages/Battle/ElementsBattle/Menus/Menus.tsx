import { useState } from 'react';
import './Menus.css';

interface Seance {
    nom : string;
    sport : string;
}

function Menus(){
    //Initialise un tableau de séances
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
    
    //Initialise des états pour stocker les valeurs des menus de sélections
    const [selectedSport, setSelectedSport] = useState<string>("Sport");
    const [selectedSeanceX, setSelectedSeanceX] = useState<string>("");
    const [selectedSeanceY, setSelectedSeanceY] = useState<string>("");

    //Initialise un tableau de sports disponibles
    const sports : string[] = ["Natation","Escalade","Basketball"];

    //Initialise un tableau de séances qui sera mis à jour lors du changement de sport sélectionné
    const [filteredSeances, setFilteredSeances] = useState<Seance[]>([]);

    //Initialise les valeurs des séances X et Y avec les valeurs filtrées en fonction du sport sélectionné
    const seanceX = filteredSeances.filter( (seance) => seance.sport === selectedSport && seance.nom.startsWith("Seance")).map(seance => seance.nom);
    const seanceY = filteredSeances.filter( (seance) => seance.sport === selectedSport && seance.nom.startsWith("Seance")).map(seance => seance.nom);
    
    //Met à jour les séances filtrées en fonction du sport sélectionné
    const handleSportChange = (sport : string) => {
        setSelectedSport(sport); 
        const filtered = seances.filter( (seance) => seance.sport === sport );
        setFilteredSeances(filtered);
    }

    //Met à jour l'état de la séance X sélectionnée et sélectionne la première séance disponible pour Y
    const handleSeanceXChange = (seance : string) => {
        setSelectedSeanceX(seance);
        setSelectedSeanceY(seanceY.filter(item => item !==seance)[0]);
    }
    //Met à jour l'état de la séance Y sélectionnée et sélectionne la première séance disponible pour X
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
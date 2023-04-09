import { useState } from 'react';
import './Menus.css';

//interfaces 
interface ExerciceEscalade{
    nomExercice : string;
    type : string;
    nbPrises : number;
    difficulte : string;
}

interface ExerciceCourse{
    nomExercice : string;
    distance : string;
    chrono : number;
    vitesse : number;
    rythmeCardiaque : number;
}

interface ExerciceMuscu{
    nomExercice : string;
    nbSeries : string;
    nbRepetitions : string;
    poids : string;
    repos : number;
}

interface Seance {
    nom : string;
    sport : string;
    exercices : (ExerciceEscalade | ExerciceCourse | ExerciceMuscu) [];
}

function Menus(){
    const [seances,setSeances] = useState<Seance[]>([
        { nom : "SeanceX1", sport : "Course", exercices : [{ nomExercice : "100m", distance : "100m", chrono : 30, vitesse : 10, rythmeCardiaque : 80 }]},
        { nom : "SeanceY1", sport : "Course" , exercices : [{ nomExercice : "100m", distance : "100m", chrono : 30, vitesse : 10, rythmeCardiaque : 80 }]},
        { nom : "SeanceX3", sport : "Escalade", exercices : [{ nomExercice : "exercice2", type : "valeur1", nbPrises : 3, difficulte :"facile" }]},
        { nom : "SeanceY3", sport : "Escalade", exercices : [{ nomExercice : "exercice2", type : "valeur1", nbPrises : 2, difficulte : "moyen" }]},
    ])
    
    const [selectedSport, setSelectedSport] = useState<string>("Sport");
    const [selectedSeanceX, setSelectedSeanceX] = useState<string>("");
    const [selectedSeanceY, setSelectedSeanceY] = useState<string>("");
    const [identicalExercices, setIdenticalExercices] = useState<(ExerciceCourse | ExerciceEscalade | ExerciceMuscu)[]>([]);

    const sports : string[] = ["Course","Escalade","Musculation"];
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

    const handleExerciceSeanceXChange = (index : number, updatedExercice : ExerciceCourse | ExerciceEscalade | ExerciceMuscu) => {
        const newSeances = [...filteredSeances]; //copie les séances filtrées
        const seanceXIndex = newSeances.findIndex((seance)=>seance.nom===selectedSeanceX)//trouve l'index de la séanceX sélectionnée
        const updatedExercices = [...newSeances[seanceXIndex].exercices];//copie les exercices de la séance sélectionné
        updatedExercices[index] = updatedExercice; //modifie l'exercice sélectionné
        newSeances[seanceXIndex]={
            ...newSeances[seanceXIndex],//copie la seance X sélectionné
            exercices : updatedExercices,}//remplace les exercices de la séance X modifiée
    }

    const handleExerciceSeanceYChange = (index : number, updatedExercice : ExerciceCourse | ExerciceEscalade | ExerciceMuscu) => {
        const newSeances = [...filteredSeances]; //copie les séances filtrées
        const seanceYIndex = newSeances.findIndex((seance)=>seance.nom===selectedSeanceX)//trouve l'index de la séanceX sélectionnée
        const updatedExercices = [...newSeances[seanceYIndex].exercices];//copie les exercices de la séance sélectionné
        updatedExercices[index] = updatedExercice; //modifie l'exercice sélectionné
        newSeances[seanceYIndex]={
            ...newSeances[seanceYIndex],//copie la seance Y sélectionné
            exercices : updatedExercices,}//remplace les exercices de la séance Y modifiée
    }

    //fonction qui compare 2 exercices
    const compareExercices = (seanceX : Seance, seanceY : Seance) => {
        const exercicesX = seanceX.exercices;
        const exercicesY = seanceY.exercices;
        const identicalExercices : (ExerciceMuscu | ExerciceEscalade | ExerciceCourse )[] = [];

        exercicesX.forEach((exerciceX)=> {
            const matchingExerciceY = exercicesY.find((exerciceY) => exerciceY.nomExercice === exerciceX.nomExercice);
            if (matchingExerciceY){
                if ("type" in exerciceX && "type" in matchingExerciceY && exerciceX.type === matchingExerciceY.type){
                    identicalExercices.push(exerciceX);
                }
                else if ("distance" in exerciceX && "distance" in matchingExerciceY && exerciceX.distance === matchingExerciceY.distance){
                    identicalExercices.push(exerciceX);
                }
                else if ("nbSeries" in exerciceX && "nbSeries" in matchingExerciceY && exerciceX.nbSeries === matchingExerciceY.nbSeries){
                    identicalExercices.push(exerciceX);
                }
            }
        })
        return identicalExercices;
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

            <select id="dropMenuExerciceSeanceX" value={selectedSeanceX} onChange={ (event)=> handleExerciceSeanceXChange(event.target.value) }>
                {filteredSeances.map((seance) =>(
                    <option key = {seance.nom}>
                        {seance.nom}
                    </option>
                ))}
            </select>

            <select id="dropMenuExerciceSeanceY" value={selectedSeanceX} onChange={ (event)=> handleExerciceSeanceXChange(event.target.value) }>
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
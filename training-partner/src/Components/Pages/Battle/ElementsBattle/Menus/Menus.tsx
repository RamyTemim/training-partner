//import des react hooks et du style appliqué
import { useEffect, useState } from 'react';
import './Menus.css';
import { Bar } from 'react-chartjs-2';
import { Chart,Tooltip,Legend,LinearScale,CategoryScale,BarElement,Title } from 'chart.js';

//interfaces 
interface ExerciceEscalade{
    idExercice : number;
    difficulte : string;
    nom : string;
    type : string;
    nbPrises : number;
}

interface ExerciceCourse{
    idExercice : number;
    distance : string;
    chrono : number;
    vitesse : number;
    nom : string;
    bpm : number;
}

interface ExerciceMuscu{
    idExercice : number;
    nbSeries : string;
    nbRepetitions : string;
    poids : string;
    nom : string;
    tmpsRepos : number;
}

interface Seance {
    idSeance : number;
    nom : string;
    sport : string;
    exercices : (ExerciceEscalade | ExerciceCourse | ExerciceMuscu) [];
}

function Menus(){
    //Tableau qui contient les différents sports disponibles
    const sports = ["Musculation", "Escalade", "Course"];

    //Initialise un tableau de séances
    const [seances,setSeances] = useState<Seance[]>([
        { idSeance : 1, nom : "SeanceX1", sport : "Course", exercices : [{ idExercice : 1, nom : "100m", distance : "100m", chrono : 30, vitesse : 10, bpm : 80 }]},
        { idSeance : 2, nom : "SeanceY1", sport : "Course" , exercices : [{ idExercice : 2, nom : "100m", distance : "100m", chrono : 30, vitesse : 10, bpm : 80 }]},
        { idSeance : 3, nom : "SeanceX3", sport : "Escalade", exercices : [{ idExercice : 3, difficulte :"facile", nom : "exercice2", type : "valeur1", nbPrises : 3 }]},
        { idSeance : 4, nom : "SeanceY3", sport : "Escalade", exercices : [{ idExercice : 4, difficulte : "moyen", nom : "exercice2", type : "valeur1", nbPrises : 2 }]},
    ])
    
    //Etat pour stocker le sport sélectionné
    const [selectedSport, setSelectedSport] = useState<string>("Sport");

    //Etat pour stocker les noms des séances sélectionnées pour les comparaisons et l'exercice comparé
    const [selectedSeanceX, setSelectedSeanceX] = useState<string>("");
    const [selectedSeanceY, setSelectedSeanceY] = useState<string>("");
    const [selectedExercice, setSelectedExercice] = useState<string>("");

    //Etat pour stocker les séances filtrées en fonction du sport sélectionné
    const [filteredSeances, setFilteredSeances] = useState<Seance[]>([]);
    //On initialise le tableau qui contient les exercices en communs des 2 séances
    const [exercicesCommuns,setExercicesCommuns] = useState<(ExerciceMuscu | ExerciceEscalade | ExerciceCourse)[]>([]);

    //Tableau de nom de séances filtrées en fonction du sport sélectionné
    const seanceX = filteredSeances.filter( (seance) => seance.sport === selectedSport).map(seance => seance.nom);
    const seanceY = filteredSeances.filter( (seance) => seance.sport === selectedSport).map(seance => seance.nom);
  
    useEffect(()=>{
        //Cherche les séances selectionnées
        const seanceXSelectionne = seances.find(seance=>seance.nom === selectedSeanceX);
        const seanceYSelectionne = seances.find(seance=>seance.nom === selectedSeanceY);
        //Vérifie si 2 séances ont été selectionné et modifie la liste des exercices en communs
        if(seanceXSelectionne && seanceYSelectionne){
            const exoCommuns = seanceXSelectionne.exercices.filter(exerciceX => seanceYSelectionne.exercices.some(exerciceY => exerciceY.nom === exerciceX.nom));
            setExercicesCommuns(exoCommuns);
        }
    },[selectedSeanceX, selectedSeanceY])

    //fonction appelé lorsqu'un sport est sélectionné
    const handleSportChange = (sport : string) => {
        setSelectedSport(sport); 
        const filtered = seances.filter( (seance) => seance.sport === sport );
        setFilteredSeances(filtered);
    }

    //fonction appelé lorsqu'une séanceX est sélectionné
    const handleSeanceXChange = (seance : string) => {
        setSelectedSeanceX(seance);
        setSelectedSeanceY(seanceY.filter(item => item !==seance)[0]);//filtre les senace pour ne pas chosir deux fois la même
    }
    //fonction appelé lorsqu'une séanceY est sélectionné
    const handleSeanceYChange = (seance : string) => {
        setSelectedSeanceY(seance);
        setSelectedSeanceX(seanceX.filter(item => item !==seance)[0]);//filtre les senace pour ne pas chosir deux fois la même
    }
    //fonction appelé lorsqu'un exercice est selectionné
    const handleExerciceChange = (exercice : string) => {
        setSelectedExercice(exercice);
    }

    Chart.register(CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend,);
    const reglage={
        indexAxis : 'y' as const,
        scales: {
            x: {
                display: true,
                color:'green',
                grid:{display:true,color:'black'},
                suggestedMin: 0,
                suggestedMax: 10,
            },
            y:{
                display : true,
                tick : {
                    reverse : false
                }
            }
        }
    };
    const chartDonnee={
        labels: ['Vitesse', 'Force', 'Difficulté','Ressenti'],
    datasets: [
      {
        label: 'Séance 1',
        data:[4, 9, 2,6],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'DDDDDD',
        borderWidth: 1,
      },
      {
        label: 'Séance 2',
        data:[3,2,5],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'DDDDDD',
        borderWidth: 1,
      },
    ],
    };

    return (
        <div>
            <div className='containerMenus'>  
                {/* Boucle sur les valeur du state pour afficher les sport */ }
                <select id="dropMenuSport" onChange={ (event)=> handleSportChange(event.target.value) }>
                    {sports.map((sport) =>(
                        <option key ={sport}>
                            {sport}
                        </option>
                    ))}
                </select>
                    {/* Boucle sur les valeur du state pour afficher les seance allant avec le sport selectionné */ }
                <select id="dropMenuSeanceX" value={selectedSeanceX} onChange={ (event)=> handleSeanceXChange(event.target.value) }>
                    {filteredSeances.map((seance) =>(
                        <option key = {seance.nom}>
                            {seance.nom}
                        </option>
                    ))}
                </select>

                <select id="dropMenuSeanceY" value={selectedSeanceY} onChange={ (event) => handleSeanceYChange(event.target.value) }>
                    {filteredSeances.map((seance) =>(
                        <option key = {seance.nom}>
                            {seance.nom}
                        </option>
                    ))}
                </select>

                <select id="dropMenuExercices" value={selectedExercice} onChange={ (event) => handleExerciceChange(event.target.value) }>
                    {exercicesCommuns.map((exercice) =>(
                        <option key = {exercice.nom} >
                            {exercice.nom}
                        </option>
                    ))}
                </select>
            </div>
            <div className='containerBar'>
                <span className="Bar">  
                    <Bar className="graphBar" data={chartDonnee} options={reglage}/>
                </span>
            </div>
        </div>
    )
}

export default Menus;
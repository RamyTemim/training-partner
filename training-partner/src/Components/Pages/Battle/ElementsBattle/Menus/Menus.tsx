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
    nomSeance : string;
    nomSport : string;
    exercices : (ExerciceEscalade | ExerciceCourse | ExerciceMuscu) [];
}

function Menus(){
    //Tableau qui contient les différents sports disponibles
    const sports = ["Musculation", "Escalade", "Course"];

    //Initialise un tableau de séances
    const [seances,setSeances] = useState<Seance[]>([])
    
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
    const seanceX = filteredSeances.filter( (seance) => seance.nomSport === selectedSport).map(seance => seance.nomSeance);
    const seanceY = filteredSeances.filter( (seance) => seance.nomSport === selectedSport).map(seance => seance.nomSeance);
  
    useEffect(() => {
        const user = localStorage.getItem('user')
        const fetchDonnee = async () => {
            try{
                const reponse = await fetch(`http://localhost:3001/seance/seances`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({pseudo : user})
                });
                var donnee = await reponse.json();
                if(donnee){
                    const data : Seance[] =  donnee;
                    for (let i = 0; i < donnee.length; i++){
                        if( data[i].nomSport === "Musculation"){
                            data[i].exercices = donnee[i].exerciceMuscu
                        }
                        if( data[i].nomSport === "Escalade"){
                            data[i].exercices = donnee[i].exerciceEscalade
                        }
                        if( data[i].nomSport === "Course"){
                            data[i].exercices = donnee[i].exerciceCourse
                        }
                    }
                    console.log(data);
                    setSeances(data);
                }
            }
            catch(error){
                console.error(error);
            }
        }
        fetchDonnee();
    },[]);
    useEffect(()=>{
        //Cherche les séances selectionnées
        const seanceXSelectionne = seances.find(seance=>seance.nomSeance === selectedSeanceX);
        const seanceYSelectionne = seances.find(seance=>seance.nomSeance === selectedSeanceY);
        
        //Vérifie si 2 séances ont été selectionné et modifie la liste des exercices en communs
        if(seanceXSelectionne && seanceYSelectionne){
            console.log("seanceX : ",seanceXSelectionne)
            console.log("seanceY : ",seanceYSelectionne)
            const exoCommuns = seanceXSelectionne.exercices.filter(exerciceX => seanceYSelectionne.exercices.some(exerciceY => exerciceY.nom === exerciceX.nom));
            console.log("exo communs :",exoCommuns)
            setExercicesCommuns(exoCommuns);
        }
    },[selectedSeanceX, selectedSeanceY])

    //fonction appelé lorsqu'un sport est sélectionné
    const handleSportChange = (sport : string) => {
        setSelectedSport(sport); 
        const filtered = seances.filter( (seance) => seance.nomSport === sport );
        setFilteredSeances(filtered);
    }

    //fonction appelé lorsqu'une séanceX est sélectionné
    const handleSeanceXChange = (seance : string) => {
        setSelectedSeanceX(seance);
        setSelectedSeanceY(seanceY.filter(item => item !==seance)[1]);//filtre les seances pour ne pas chosir deux fois la même
    }
    //fonction appelé lorsqu'une séanceY est sélectionné
    const handleSeanceYChange = (seance : string) => {
        setSelectedSeanceY(seance);
        setSelectedSeanceX(seanceX.filter(item => item !==seance)[0]);//filtre les seances pour ne pas chosir deux fois la même
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
                        <option key = {seance.nomSeance}>
                            {seance.nomSeance}
                        </option>
                    ))}
                </select>

                <select id="dropMenuSeanceY" value={selectedSeanceY} onChange={ (event) => handleSeanceYChange(event.target.value) }>
                    {filteredSeances.map((seance) =>(
                        <option key = {seance.nomSeance}>
                            {seance.nomSeance}
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
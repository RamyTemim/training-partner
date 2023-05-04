import { useEffect, useState } from "react";
import { Muscu } from "../../../../Interfaces/Muscu";
import { Escalade } from "../../../../Interfaces/Escalade";
import { Course } from "../../../../Interfaces/Course";

interface Donneeback{
    idGraph : number;
    typeGraph : string;
    nomSport : string;
    titre : string;
    donneeGraph : (Muscu | Escalade | Course)[];
};

 

type Seance = {
    nom: string;
    duree : string;
    date: string;
    exercices: Escalade[];
};

const TableEscalade = () => {
    //state gerzant la page affiche
    const [currentPage, setCurrentPage] = useState(1);
    const [dataFromBack, setDataFromBack] = useState<Donneeback[]>()

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
                    setDataFromBack(donnee);
                }
            }
            catch(error){
                console.error(error);
            }
        }
        fetchDonnee();
    },[]);

    
    const [seances, setSeances] = useState<Seance[]>([//state contenat un tableau de senace chaque seance doit contenir un tableau des exercices qui lui sont liés
        {
        nom: "Session 1",
        duree :"01:30",
        date:"20 mai",
        exercices: [
            {
            type: "bloc",
            difficulte: "A2",
            nom:"echauffement",
            nbr_prise:34,
            },
            {
            nom: "Tentative 1",
            type: "bloc",
            difficulte: "C3",
            nbr_prise:34,
            },
        ],
        },
        {
        nom: "Session 2",
        duree :"01:30",
        date:"20 mai",
        exercices: [
            {
            type: "bloc",
            difficulte: "A2",
            nom:"echauffement",
            nbr_prise:34,
            },
            {
            nom: "Tentative 1",
            type: "bloc",
            difficulte: "C3",
            nbr_prise:34,
            },
        ],
        },
    ]);

    const [selectedSession, setSelectedSession] = useState<Seance | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Escalade | null>(null);

    const handleSessionClick = (seance: Seance) => {
        if (seance==selectedSession){
            setSelectedSession(null);
        }else{
            setSelectedSession(seance);
        };
        setSelectedExercise(null);
    };

    const handleExerciseClick = (exercice: Escalade) => {
        if (exercice== selectedExercise){
            setSelectedExercise(null);
        }else{
        setSelectedExercise(exercice);
        }
    };
    let i=0;
    return (
        <div className="TabSeance">
        <h2 className="tabSeanceVisu">Séances</h2>
        <table className="tableSeanceVisu">
            <thead className="theadSeanceVisu">
            <tr>
                <th scope="col" id="NumSeance"></th>
                <th scope="col">Nom</th>
                <th scope="col">Duree</th>
            </tr>
            </thead>
            <tbody>
            {seances.map((seance) => (
                <tr key={seance.nom} onClick={() => handleSessionClick(seance)}>
                     <td>{++i}</td>
                    <td>{seance.nom}</td>
                    <td>{seance.duree}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {selectedSession && (
            <div>
            <h2 className="ListeExVisu">{selectedSession.nom}</h2>
            <table className="tableListEx">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col"> Aperçu</th>
                </tr>
                </thead>
                <tbody>
                {selectedSession.exercices.map((exercice) => (
                    <tr
                    key={exercice.nom}
                    onClick={() => handleExerciseClick(exercice)}
                    >
                    <td>{exercice.nom}</td>
                    <td>{exercice.type}      {exercice.difficulte}</td>
                    </tr>
                ))}
                    <td></td>
                </tbody>
            </table>
            </div>
        )}

        {selectedExercise && (
            <div>
            <h2 className="detailsExVisu">Détails de {selectedExercise.nom}</h2>
            <table className="tableDetailsEx">
                <thead>
                    <tr>
                        <th scope="col">Type</th>
                        <th scope="col">Difficulté</th>
                        <th scope="col">Prise</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{selectedExercise.type}</td>
                    <td>{selectedExercise.difficulte}</td>
                    <td>{selectedExercise.nbr_prise}</td>
                </tr>
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default TableEscalade;
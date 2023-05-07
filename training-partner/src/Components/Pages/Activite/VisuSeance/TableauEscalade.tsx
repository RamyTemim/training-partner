import { useEffect, useState } from "react";
import { Muscu } from "../../../../Interfaces/Muscu";
import { Course } from "../../../../Interfaces/Course";


interface Escalade{
    difficulte: string;
    nom:string;
    type: string;
    nbrPrise: number;
}


interface Seance{
    nomSeance: string;
    duree : string;
    date: string;
    nomSport : string;
    exerciceEscalade: Escalade[];
};

const TableEscalade = () => {
    //state gerzant la page affiche
    const [seances, setSeances] = useState<Seance[]>([]);
    const [selectedSession, setSelectedSession] = useState<Seance | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Escalade | null>(null);

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
                    const filter = donnee?.filter((data:Seance )=> data.nomSport === "Escalade").map((data : Seance) => data);
                    setSeances(filter);
                    console.log(filter);
                }
            }
            catch(error){
                console.error(error);
            }
        }
        fetchDonnee();
    },[]);



    const handleSessionClick = (seance: Seance) => {
        if (seance==selectedSession){
            setSelectedSession(null);
        }else{
            setSelectedSession(seance);
            setSelectedExercise(null);
        };
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
                <tr key={seance.nomSeance} onClick={() => handleSessionClick(seance)}>
                     <td>{++i}</td>
                    <td>{seance.nomSeance}</td>
                    <td>{seance.duree}</td>
                </tr>
            ))}
            </tbody>
        </table>

        {selectedSession && (
            <div>
            <h2 className="ListeExVisu">{selectedSession.nomSeance}</h2>
            <table className="tableListEx">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col"> Aperçu</th>
                </tr>
                </thead>
                <tbody>
                {selectedSession.exerciceEscalade.map((exercice) => (
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
                    <td>{selectedExercise.nbrPrise}</td>
                </tr>
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default TableEscalade;
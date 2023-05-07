import { useEffect, useState } from "react";
import { Muscu } from "../../../../Interfaces/Muscu";
import { Escalade } from "../../../../Interfaces/Escalade";
import { Course } from "../../../../Interfaces/Course";
import { NumberLiteralType, NumericLiteral } from "typescript";


interface Musculation{
    nbrRep : number;
    nbrSerie : number;
    nom  : string;
    poids : number;
    tmpsRepos : number;
}

interface Seance{
    nomSeance: string;
    duree : string;
    date: string;
    exerciceMuscu: Musculation[];
    nomSport : string;
};

const TableMuscu = () => {
    //state gerzant la page affiche
    const [seances, setSeances] = useState<Seance[]>([])//state contenat un tableau de senace chaque seance doit contenir un tableau des exercices qui lui sont liés
    const [selectedSession, setSelectedSession] = useState<Seance | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Musculation | null>(null);

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
                    const filter = donnee?.filter((data:Seance )=> data.nomSport === "Musculation").map((data : Seance) => data);
                    setSeances(filter);
                }
            }
            catch(error){
                console.error(error);
            }
        }
        fetchDonnee();
    },[]);

    

    const handleSessionClick = (seance: Seance) => {
        console.log(seances);
        console.log(seances[0]);
        if (seance==selectedSession){
            setSelectedSession(null);
        }else{
            setSelectedSession(seance);
            setSelectedExercise(null);
        };
    };

    const handleExerciseClick = (exercice: Musculation) => {
        if (exercice == selectedExercise){
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
                {selectedSession.exerciceMuscu.map((exercice : Musculation) => (
                    <tr
                    key={exercice.nom}
                    onClick={() => handleExerciseClick(exercice)}
                    >
                    <td>{exercice.nom}</td>
                    <td>{exercice.nbrSerie} x {exercice.nbrRep}</td>
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
                        <th scope="col">Séries</th>
                        <th scope="col">Répétitions</th>
                        <th scope="col">Poids</th>
                        <th scope="col">Repos</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{selectedExercise.nbrSerie}</td>

                    <td>{selectedExercise.nbrRep}</td>

                    <td>{selectedExercise.poids} kg</td>

                    <td>{selectedExercise.tmpsRepos} min</td>
                </tr>
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default TableMuscu;
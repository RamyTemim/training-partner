import { useEffect, useState } from "react";

interface Course{
    distance : number;
    chrono : string;
    bpm : number;
    vitesse : number;
    nom : string;
}

type Seance = {
    nomSeance: string;
    duree : string;
    date: string;
    exerciceCourse: Course[];
    nomSport : string;
};

const TableCourse = () => {
    //state gerzant la page affiche
    const [seances, setSeances] = useState<Seance[]>([]);
    const [selectedSession, setSelectedSession] = useState<Seance | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Course | null>(null);

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
                    const filter = donnee?.filter((data:Seance )=> data.nomSport === "Course").map((data : Seance) => data);
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
        if (seance==selectedSession){
            setSelectedSession(null);
        }else{
            setSelectedSession(seance);
            setSelectedExercise(null);
        };
    };

    const handleExerciseClick = (exercice: Course) => {
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
                {selectedSession.exerciceCourse.map((exercice) => (
                    <tr
                    key={exercice.nom}
                    onClick={() => handleExerciseClick(exercice)}
                    >
                    <td>{exercice.nom}</td>
                    <td>{exercice.distance}km     {exercice.chrono}min</td>
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
                        <th scope="col">Distance</th>
                        <th scope="col">Vitesse</th>
                        <th scope="col">Rythe Cardiaque</th>
                        <th scope="col">Chrono</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{selectedExercise.distance} km</td>

                    <td>{selectedExercise.vitesse} km/h</td>

                    <td>{selectedExercise.bpm} bpm</td>

                    <td>{selectedExercise.chrono} min</td>
                </tr>
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
};

export default TableCourse;
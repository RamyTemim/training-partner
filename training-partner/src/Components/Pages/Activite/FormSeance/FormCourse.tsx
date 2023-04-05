
import { useState } from "react";

interface Course{
    nom:string;
    distance: number;
    vitesse: number;
    heartRate: number;
    chrono:string;
}


const FormCourse: React.FC= ()=>{
    const [valeur,setValeur]=useState<Course>({
        nom:"",
        distance : 0,
        vitesse:0,
        heartRate : 0,
        chrono:"00:00"
    });

    const [exercices, setExercices] = useState<Course[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValeur({ ...valeur, [name]: value });
      };
      
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setExercices([...exercices, valeur]);
        setValeur({
            nom:"",
            distance : 0,
            vitesse:0,
            heartRate : 0,
            chrono:"00:00",
        });
    };
    const [details, setDetails] = useState(-1);

    const showDetails = (index: number) => {
        if (details === index) {
            setDetails(-1);
        } else {
            setDetails(index);
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label > Nom de l'exercice
                    <input name="nom" type="string" value={valeur.nom} onChange={handleChange}/>
                </label><br/>
                <label > Distance
                    <input name="distance" type="number" value={valeur.distance} onChange={handleChange}/>
                </label><br/>
                <label > Vitesse (en km/h)
                    <input name="vitesse" type="number" value={valeur.vitesse} onChange={handleChange}/>
                </label><br/>
                <label >Chrono
                    <input name="chrono" type="time" value={valeur.chrono} onChange={handleChange} step="60"/>
                </label><br/>
                <label > Rythme cardiaque
                    <input name="heartRate" type="number" value={valeur.heartRate} onChange={handleChange}/>
                </label>
                <button id="buttonSubmitEx" type="submit">Ajouter l'exercice</button>
            </form>
            <div>
            <h4>Liste des exercices :</h4>
                <ul>
                    {exercices.map((exercice, index) => (
                        <li key={index}>
                            <button onClick={() => showDetails(index)}>{exercice.nom} +</button>
                            {details === index && (
                                <ul>
                                    <li>Distance : {exercice.distance}</li>
                                    <li>Vitesse : {exercice.vitesse}</li>
                                    <li>Chrono : {exercice.chrono}</li>
                                    <li>Rythme Cardiaque : {exercice.heartRate}</li>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FormCourse;

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
        event.preventDefault(); // Empêche la soumission du formulaire
        setExercices([...exercices, valeur]);// Ajoute l'exercice courant à la liste des exercices
        setValeur({// Réinitialise les valeurs du formulaire
            nom:"",
            distance : 0,
            vitesse:0,
            heartRate : 0,
            chrono:"00:00",
        });
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
                <label > Rythme cardiaque
                    <input name="heartRate" type="number" value={valeur.heartRate} onChange={handleChange}/>
                </label><br/>
                <label >Chrono
                    <input name="chrono" type="time" value={valeur.chrono} onChange={handleChange} step="60"/>
                </label>
                <button id="buttonSubmitEx" type="submit">Ajouter l'exercice</button>
            </form>
        </div>
    )
}

export default FormCourse;
import { useState } from "react";

interface Muscu{
    nom:string;
    nbrSerie: number;
    nbrRep: number;
    poids: number;
    restTime: string;
}


const FormMuscu: React.FC= ()=>{
    const [valeur,setValeur]=useState<Muscu>({
        nom:"",
        nbrSerie : 0,
        nbrRep:0,
        poids : 0,
        restTime:"00:00"
    });

    const [exercices, setExercices] = useState<Muscu[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValeur({ ...valeur, [name]: value });
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche la soumission du formulaire
    setExercices([...exercices, valeur]);// Ajoute l'exercice courant à la liste des exercices
    setValeur({// Réinitialise les valeurs du formulaire
        nom:"",
        nbrSerie : 0,
        nbrRep:0,
        poids : 0,
        restTime:"00:00"
    });
};

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label > Nom de l'exercice
                    <input name="nom" type="string" value={valeur.nom} onChange={handleChange}/>
                </label><br/>
                <label > Nombre de séries
                    <input name="nbrSerie" type="number" value={valeur.nbrSerie} onChange={handleChange}/>
                </label><br/>
                <label > Nombre de répétitions
                    <input name="nbrRep" type="number" value={valeur.nbrRep} onChange={handleChange}/>
                </label><br/>
                <label > Poids (en kg)
                    <input name="poids" type="number" value={valeur.poids} onChange={handleChange}/>
                </label><br/>
                <label > Temps de repos 
                    <input name="restTime" type="time" value={valeur.restTime} onChange={handleChange} step="60"/>
                </label>
                <button id="buttonSubmitEx" type="submit">Ajouter l'exercice</button>
            </form>
        </div>
    )
}

export default FormMuscu;

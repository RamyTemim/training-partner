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

    
    const handleAdd= (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        setExercices([...exercices, valeur]);
        setValeur({
            nom:"",
            nbrSerie : 0,
            nbrRep:0,
            poids : 0,
            restTime:"00:00"
        });
    }
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
            <form onSubmit={handleAdd}>
                <label > Nom de l'exercice
                    <input name="nom" type="text" value={valeur.nom} onChange={handleChange}/>
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
                    <input name="restTime" type="time" value={valeur.restTime} onChange={handleChange} step={60}/>
                </label>
                <button id="buttonSubmitEx" type="submit"  >Ajouter l'exercice</button>
            </form>
            <div>
            <h4>Liste des exercices :</h4>
                <ul>
                    {exercices.map((exercice, index) => (
                        <li key={index}>
                            <button onClick={() => showDetails(index)}>{exercice.nom} +</button>
                            {details === index && (
                                <ul>
                                    <li>Nombre de séries : {exercice.nbrSerie}</li>
                                    <li>Nombre de répétitions : {exercice.nbrRep}</li>
                                    <li>Poids (en kg) : {exercice.poids}</li>
                                    <li>Temps de repos : {exercice.restTime}</li>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FormMuscu;

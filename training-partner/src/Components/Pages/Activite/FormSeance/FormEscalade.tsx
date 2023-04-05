import { useState } from "react";

interface Escalade{
    nom:string;
    type: string;
    nbrprise: number;
    difficulte: string;

}


const FormEscalade: React.FC= ()=>{
    const [valeur,setValeur]=useState<Escalade>({
        nom:"",
        type : "",
        nbrprise:0,
        difficulte : "",
    });

    const [exercices, setExercices] = useState<Escalade[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValeur({ ...valeur, [name]: value });
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setExercices([...exercices, valeur]);
        setValeur({
            nom:"",
            type : "",
            nbrprise:0,
            difficulte : "",
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
                <label > Type 
                    <input name="type" type="string" value={valeur.type} onChange={handleChange}/>
                </label><br/>
                <label > Nombre de prise
                    <input name="nbrprise" type="number" value={valeur.nbrprise} onChange={handleChange}/>
                </label><br/>
                <label > Difficulté
                    <input name="difficulte" type="string" value={valeur.difficulte} onChange={handleChange}/>
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
                                    <li>Type: {exercice.type}</li>
                                    <li>Nombre de prises : {exercice.nbrprise}</li>
                                    <li>Difficulté : {exercice.difficulte}</li>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul></div>
        </div>
    )
}

export default FormEscalade;
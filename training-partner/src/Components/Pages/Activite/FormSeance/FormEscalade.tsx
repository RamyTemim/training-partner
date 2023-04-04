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
        event.preventDefault(); // Empêche la soumission du formulaire
        setExercices([...exercices, valeur]);// Ajoute l'exercice courant à la liste des exercices
        setValeur({// Réinitialise les valeurs du formulaire
            nom:"",
            type : "",
            nbrprise:0,
            difficulte : "",
        });
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
        </div>
    )
}

export default FormEscalade;
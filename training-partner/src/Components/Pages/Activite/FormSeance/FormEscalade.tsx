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
        if(valeur.nom==""||valeur.type==""){
            alert("Veuillez remplir tous les champs obligatoires");
        }else{
        setExercices([...exercices, valeur]);
        setValeur({
            nom:"",
            type : "",
            nbrprise:0,
            difficulte : "",
        })};
    };
    
    const [details, setDetails] = useState(-1);

    const showDetails = (index: number) => {
        if (details === index) {
            setDetails(-1);
        } else {
            setDetails(index);
        }
    };
    const handleDelete = (index: number) => {
        const newExercices = exercices.filter((_, i) => i !== index);
        setExercices(newExercices);
    };

    return (
        <div>
            <form className="formEX"  onSubmit={handleSubmit}>
                <label > Nom de l'exercice<span id="needed">*</span>
                    <input name="nom" type="string" value={valeur.nom} onChange={handleChange} placeholder="Nom de l'exercice"/>
                </label><br/>
                <label > Type<span id="needed">*</span>
                    <input name="type" type="string" value={valeur.type} onChange={handleChange} placeholder="Type d'escalade"/>
                </label><br/>
                <label > Nombre de prise
                    <input name="nbrprise" type="number" value={valeur.nbrprise} onChange={handleChange}/>
                </label><br/>
                <label > Difficulté
                    <input name="difficulte" type="string" value={valeur.difficulte} onChange={handleChange} placeholder="Difficulté"/>
                </label>
                <button id="buttonSubmitEx" type="submit">Ajouter l'exercice</button>
            </form>
            <div  className="ListEx">
            <h4>Liste des exercices </h4>
                <ul>
                    {exercices.map((exercice, index) => (
                        <li key={index}>
                            <button  id="buttonExercice" onClick={() => showDetails(index)}>{exercice.nom}</button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="trashButton" onClick={() => handleDelete(index)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
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
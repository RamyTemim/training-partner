import { stringify } from "querystring";
import { useState, useEffect} from "react";

interface Muscu{
    nom:string;
    nbrSerie: number;
    nbrRep: number;
    poids: number;
    restTime: string;
}
var triangle:any;

function FormMuscu(props : any){
    const[ind, setInd] = useState(0);
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

    const handleSubmit= (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if (valeur.nbrRep==0 || valeur.nom=="" ||valeur.nbrSerie==0 ){
            alert("Veuillez remplir tous les champs obligatoires");
        }else{
        setExercices([...exercices, valeur]);
        setValeur({
            nom:"",
            nbrSerie : 0,
            nbrRep:0,
            poids : 0,
            restTime:"00:00"
        })
    };
    };
    useEffect(() => {
        if (exercices.length > ind){
            let temp = JSON.stringify({
                nom:exercices[ind].nom,
                nbrSerie :exercices[ind].nbrSerie ,
                nbrRep: exercices[ind].nbrRep ,
                poids : exercices[ind].poids,
                restTime:exercices[ind].restTime
            })
            console.log(temp);
            props.onSendValue(temp);
            setInd(ind + 1);}
      }, [exercices]);



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
            <form className="formEX" onSubmit={handleSubmit}>
                <label htmlFor="nom" > Nom de l'exercice<span id="needed">*</span>
                    <input name="nom" type="text" value={valeur.nom} onChange={handleChange} placeholder="Nom de l'exercice"/>
                </label><br/>
                <label htmlFor="nbrSerie" > Nombre de séries<span id="needed">*</span>
                    <input name="nbrSerie" type="number" value={valeur.nbrSerie} onChange={handleChange}/>
                </label><br/>
                <label htmlFor="nbrRep" > Nombre de répétitions<span id="needed">*</span>
                    <input name="nbrRep" type="number" value={valeur.nbrRep} onChange={handleChange}/>
                </label><br/>
                <label htmlFor="poids" > Poids (en kg)<span id="needed">*</span>
                    <input name="poids" type="number" value={valeur.poids} onChange={handleChange}/>
                </label><br/>
                <label htmlFor="restTime" > Temps de repos 
                    <input name="restTime" type="time" value={valeur.restTime} onChange={handleChange} step={60}/>
                </label>
                <button id="buttonSubmitEx" type="submit" >Ajouter l'exercice</button>
            </form>
            <div className="ListEx">
            <h4>Liste des exercices </h4>
                <ul className="exercice">
                    {exercices.map((exercice, index) => (
                        <li key={index}>
                            <button id="buttonExercice" onClick={() => showDetails(index)}>
                                {exercice.nom}<svg className="fleche" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="trashButton" onClick={() => handleDelete(index)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            {details === index && (
                                <ul  className="exercice">
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

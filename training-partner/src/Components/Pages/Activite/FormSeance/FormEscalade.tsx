//import des react hooks useState et useEffect et de l'interface Escalade
import { useState, useEffect} from "react";
import { Escalade } from "../../../../Interfaces/Escalade";


function FormEscalade(props: any){
    //initialisation de l'indice et des données de l'exrcice d'escalade
    const[ind, setInd] = useState(0);
    const [valeur,setValeur]=useState<Escalade>({
        difficulte : "",
        nom:"",
        type : "",
        nbr_prise:0,
    });

    //initialisation d'un tableau d'exercices d'escalade
    const [exercices, setExercices] = useState<Escalade[]>([]);

    //Gestion de l'évènement de la modification d'un champ du formulaire
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValeur({ ...valeur, [name]: value });
    };

    //Gestion de l'évènement de la soumission du formulaire
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();//Empêche la page de se recharger lors de la soumission du formulaire
        if(valeur.nom===""||valeur.type===""){//Si le nom ou le type ne sont pas remplis affiche une alerte
            alert("Veuillez remplir tous les champs obligatoires");
        }else{
        setExercices([...exercices, valeur]);//Ajout de l'exercice à la liste des exercices
        setValeur({//réinitialise les valeurs par défault du formulaire
            difficulte : "",
            nom:"",
            type : "",
            nbr_prise:0,
        })};
    };
    
    useEffect(() => {
        if (exercices.length > ind){//si la liste des exercices est plus grande que l'indice ind
            let temp = JSON.stringify({//Création d'un chaîne JSON à partir des valeurs de l'exercice
                difficulte : exercices[ind].difficulte,
                nom:exercices[ind].nom,
                type :exercices[ind].type ,
                nbrprise: exercices[ind].nbr_prise ,
            })
            console.log(temp);
            props.onSendValue(temp);//Envoie de la chaîne JSON à une fonction qui se trouve dans les props du composant parent
            setInd(ind + 1);//Mis à jour de l'indice
        }
    }, [exercices]);


    //initialisation d'un état pour masquer ou afficher les détails d'un exercice
    const [details, setDetails] = useState(-1);

    //fonction pour afficher ou masquer les détails d'un exercice
    const showDetails = (index: number) => {
        if (details === index) {//si les détails de l'exercice sont déjà affichés 
            setDetails(-1);//masque les détails de l'exercice sélectionné
        } else {//si les détails de l'exercice ne sont pas encore affiché
            setDetails(index);//affiche les détails de l'exercice sélectionné
        }
    };

    //fonction pour supprimé un exercice de la liste
    const handleDelete = (index: number) => {
        const newExercices = exercices.filter((_, i) => i !== index);//Crée une nouvelle liste en filtrant celui qui doit être supprimé
        setExercices(newExercices);//Met à jour la liste d'exercices
    };

    return (
        <div>
            <form className="formEX"  onSubmit={handleSubmit}>
            <label > Difficulté
                    <input name="difficulte" type="string" value={valeur.difficulte} onChange={handleChange} placeholder="Difficulté"/>
                </label><br/>
                <label > Nom de l'exercice<span id="needed">*</span>
                    <input name="nom" type="string" value={valeur.nom} onChange={handleChange} placeholder="Nom de l'exercice"/>
                </label><br/>
                <label > Type<span id="needed">*</span>
                    <input name="type" type="string" value={valeur.type} onChange={handleChange} placeholder="Type d'escalade"/>
                </label><br/>
                <label > Nombre de prise
                    <input name="nbr_prise" type="number" value={valeur.nbr_prise} onChange={handleChange}/>
                </label>
                <button id="buttonSubmitEx" type="submit">Ajouter l'exercice</button>
            </form>
            <div  className="ListEx">
            <h4>Liste des exercices </h4>
                <ul className="exercice">
                    {exercices.map((exercice, index) => (
                        <li key={index}>
                            <button  id="buttonExercice" onClick={() => showDetails(index)}>
                            {exercice.nom}<svg className="fleche" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                </button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="trashButton" onClick={() => handleDelete(index)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            {details === index && (
                                <ul  className="exercice">
                                    <li>Difficulté : {exercice.difficulte}</li>
                                    <li>Type: {exercice.type}</li>
                                    <li>Nombre de prises : {exercice.nbr_prise}</li>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul></div>
        </div>
    )
}

export default FormEscalade;
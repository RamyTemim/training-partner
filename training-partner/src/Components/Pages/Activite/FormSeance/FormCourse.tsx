//import des react hooks useState et useEffect et de l'interface Course
import { useState, useEffect } from "react";
import { Course } from '../../../../Interfaces/Course';

function FormCourse(props: any){
    //initialisation de l'indice et des données de l'exercice de la course
    const[ind, setInd] = useState(0);
    const [valeur,setValeur]=useState<Course>({
        distance : 0,
        chrono:"00:00",
        bpm : 0,
        vitesse:0,
        nom:"",
    });

    //initialisation d'un tableau d'exercices de Course
    const [exercices, setExercices] = useState<Course[]>([]);

    //Gestion de l'évènement de la modification d'un champ du formulaire
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValeur({ ...valeur, [name]: value });
    };
      
    //Gestion de l'évènement de la soumission du formulaire
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();//Empêche la page de se recharger lors de la soumission du formulaire
        if(valeur.chrono === "00:00" || valeur.distance === 0 || valeur.nom === "" ){//Si le chrono, la valeur ou le nom ne sont pas remplis affiche une alerte
            alert("Veuillez remplir tous les champs obligatoires")
        }
        else{
        setExercices([...exercices, valeur]);//Ajout de l'exercice à la liste des exercices
        setValeur({//réinitialise les valeurs par défault du formulaire
            distance : 0,
            chrono:"00:00",
            bpm : 0,
            vitesse:0,
            nom:"",
        })};
    };

    useEffect(() => {
        if (exercices.length > ind){//si la liste des exercices est plus grande que l'indice ind
            let temp = JSON.stringify({//Création d'un chaîne JSON à partir des valeurs de l'exercice
                distance :exercices[ind].distance,
                chrono : exercices[ind].chrono,
                bpm : exercices[ind].bpm,
                vitesse: exercices[ind].vitesse,
                nom:exercices[ind].nom,
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
            <form  className="formEX" onSubmit={handleSubmit}>
                <label > Nom de l'exercice<span id="needed">*</span>
                    <input name="nom" type="string" value={valeur.nom} onChange={handleChange} placeholder="Nom de l'exercice"/>
                </label><br/>
                <label > Distance (en km/h)<span id="needed">*</span>
                    <input name="distance" type="number" value={valeur.distance} onChange={handleChange}/>
                </label><br/>
                <label >Chrono<span id="needed">*</span>
                    <input name="chrono" type="time" value={valeur.chrono} onChange={handleChange} step="60"/>
                </label><br/>
                <label > Rythme cardiaque
                    <input name="bpm" type="number" value={valeur.bpm} onChange={handleChange}/>
                </label><br/>
                <label > Vitesse (en km/h)
                    <input name="vitesse" type="number" value={valeur.vitesse} onChange={handleChange}/>
                </label>
                <button id="buttonSubmitEx" type="submit">Ajouter l'exercice</button>
            </form>
            <div  className="ListEx">
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
                                <ul className="exercice">
                                    <li>Distance : {exercice.distance}</li>
                                    <li>Chrono : {exercice.chrono}</li>
                                    <li>Rythme Cardiaque : {exercice.bpm}</li>
                                    <li>Vitesse : {exercice.vitesse}</li>
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
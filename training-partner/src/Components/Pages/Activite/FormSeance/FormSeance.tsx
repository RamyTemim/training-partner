//import des modules et interface nécessaires
import React, { useState } from "react";
import FormCourse from "./FormCourse";//formulaire pour la course
import FormEscalade from "./FormEscalade";//formulaire pour l'escalde
import FormMuscu from "./FormMuscu";//formulaire pour la musculation
import "./FormSeance.css";//style pour le formulaire seance
import { FormValues } from "../../../../Interfaces/FormValues";


//composant principal du formulaire
const FormSeance: React.FC = () => {
  //initialisation des états pour stocker le sport sélectionné
  const [sport,setSport]=useState("Musculation");
  const [valueSeance, setValueSeance] = useState<string[]>([])

  //état pour stocker les valeurs de la séance
  const [values, setValues] = useState<FormValues>({
    nom: "",
    duree: "00:00",
  });

  //fonction pour gérer le changement de sport
  const handleSportChange =(event: React.ChangeEvent<HTMLSelectElement>)=>{
      event.preventDefault();
      setSport(event.target.value);
  }

  //fonction pour récupérer les valeurs de la séance
  const getValue = (val : string)=>{
    console.log( "dans get value" +val);
    const updatedValueSeance = [...valueSeance, val];
    setValueSeance(updatedValueSeance);
  }

  //fonction pour afficher le formulaire correspondant au sport sélectionné
  const getForm = () => {
      switch (sport) {
        case "Musculation":{
      
          return <FormMuscu onSendValue = {getValue}/>;//affiche le formulaire de la musculation
        }
        case "Escalade":{
         
          return <FormEscalade onSendValue = {getValue}/>;//affiche le formulaire d'escalade
        }
        case "Course":{

          return <FormCourse onSendValue = {getValue}/>;//affiche le formulaire de la course
        }
      }
  };

  //fonction pour gérer le changement des valeurs d'un champ du formulaire
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  //fonction pour gérer la soumission d'un formulaire
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();//Empêche la page de se recharger lors de la soumission du formulaire
    if(values.duree==="00:00"|| values.nom===""){//Si la durée ou le nom ne sont pas remplis affiche une alerte
      alert("Veuillez remplir tous les champs obligatoires");
    }
    else{
      setValues({
        nom:"",
        duree:"00:00",
    });
        
    //transforme des valeurs du formulaire en tableau
    const seanceArray = valueSeance.map(seance => JSON.parse(seance));
    const pseudo = localStorage.getItem('user')
    //crée un objet JSON avec les valeurs du formulaire et les stock dans la variable result
    let result = JSON.stringify({
      nomSeance : values.nom,
      nomSport : sport,
      duree : values.duree.toString(),
      userPseudo : pseudo,
      date : new Date(),
      seance : seanceArray
    })
    console.log(result)   
    //envoie une requête POST avec l'objet JSON 'result' au serveur local pour créer une nouvelle activité
    try {
      const reponseSeance = await fetch('http://localhost:3001/seance/createSeance',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nomSeance : values.nom, duree : values.duree, nomSport : sport, userPseudo : pseudo })
     })
     if(reponseSeance.ok){
      const idSeance = await reponseSeance.json();
        console.log("donnee",idSeance)
        console.log("seance crée")
        if (sport === "Musculation"){
          try{
            const reponseDonnee = await fetch('http://localhost:3001/exerciceMusculation/exercice',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({idSeance : idSeance, userPseudo : pseudo, donnees : seanceArray })
            })
            if(reponseDonnee.ok){
              const donnee = await reponseDonnee.json();
              console.log("donnee",donnee)  
              console.log("seance crée")
            }
        }
        catch(error){
          console.error(error)
        }
        }
     }
    }
    //setValueseance<string[]>([]); IL FAUT REMETTRE VALUESEANCE A 0
    catch(error){
      console.error(error)
    }
  }};


  return (
    <div>
      <form className="formSeance" onSubmit={handleSubmit}>
        <span className="infoObl" id="needed">*</span><span className="infoObl" >champs obligatoires</span>
        <label htmlFor="nom" id="nomTitre" >Nom séance<span id="needed">*</span>
          <input id="inputNS" name="nom" type="string" onChange={handleChange} value={values.nom} placeholder="Nom de la séance"></input></label><br/>
        <label htmlFor="duree" id="duree">Durée<span id="needed">*</span>
          <input name="duree" type="time" onChange={handleChange} value={values.duree} step="60"></input></label><br/>
        <select  title="selectSport" className="selectSport" value={sport} onChange={handleSportChange}>
          <option value="musculation">Musculation</option>
          <option value="escalade">Escalade</option>
          <option value="course">Course</option>
        </select>
        <button id="buttonSubmitSeance" type="submit">Enregistrer Séance</button>
      </form> 
      <div>
        {getForm()}
      </div>
    </div>
  );
};

export default FormSeance;

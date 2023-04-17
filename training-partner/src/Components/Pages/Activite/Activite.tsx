import { useState } from "react";
import FormSeance from "./FormSeance/FormSeance";
import VisuSeance from "./VisuSeance/VisuSeance";
import "./Activite.css";

function PageActivite(){
    //state gestion affichage des formulaire
    const [showForm, setShowForm] = useState<boolean>(true);
    const [showSeance, setShowSeance] = useState<boolean>(false);

    //fonction pour afficher les composant seulemtnun a la fois
    const handleShowForm = () => {
      setShowForm(!showForm);
      setShowSeance(false);
    };
  
    const handleShowSeance = () => {
        setShowSeance(!showSeance);
        setShowForm(false);
  
      };
      //affichage des boutton est composants
    return (
      <div>
        <button className="btt_showForm" onClick={handleShowForm}>Ajouter une séance</button>
        <button className="btt_showSeance" onClick={handleShowSeance}>Visualiser une séance</button>
  

           {showForm &&<FormSeance/>}
           {showSeance &&<VisuSeance/>}
        </div>
    )
}

export default PageActivite;
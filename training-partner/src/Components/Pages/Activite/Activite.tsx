import { useState } from "react";
import FormSeance from "./FormSeance/FormSeance";
import VisuSeance from "./VisuSeance/VisuSeance";
import "./Activite.css";

function PageActivite(){
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showSeance, setShowSeance] = useState<boolean>(false);
  
    const handleShowForm = () => {
      setShowForm(!showForm);

    };
  
    const handleShowSeance = () => {
        setShowSeance(!showSeance);
  
      };
  
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
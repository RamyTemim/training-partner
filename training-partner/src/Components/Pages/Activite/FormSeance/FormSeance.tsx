import React, { useState } from "react";
import FormCourse from "./FormCourse";
import FormEscalade from "./FormEscalade";
import FormMuscu from "./FormMuscu";
import "./FormSeance.css";

interface FormValues {
  nom: string;
  duree: string;
 
}

const FormSeance: React.FC = () => {
  const [sport,setSport]=useState("musculation");
  const handleSportChange =(event: React.ChangeEvent<HTMLSelectElement>)=>{
      event.preventDefault();
      setSport(event.target.value);
  }
  
  const getForm = () => {
      switch (sport) {
        case "musculation":{
      
          return <FormMuscu/>;
      }
        case "escalade":{
         
          return <FormEscalade/>;
        }
        case "course":{

          return <FormCourse/>;
        }
      }
    };

  const [values, setValues] = useState<FormValues>({
    nom: "",
    duree: "00:00",

  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(values.duree=="00:00"|| values.nom==""){
      alert("Veuillez remplir tous les champs obligatoires");
    }else{
      se
    }
  };


  return (
    <div>
      <form className="formSeance" onSubmit={handleSubmit}>
      <span className="infoObl" id="needed">*</span><span className="infoObl" >champs obligatoires</span>
        <label htmlFor="nom" id="nomTitre" >Nom séance<span id="needed">*</span>
          <input id="inputNS" name="nom" type="string" onChange={handleChange} value={values.nom} placeholder="Nom de la séance"></input></label><br/>
        <label htmlFor="duree" id="duree">Durée<span id="needed">*</span>
          <input name="duree" type="time" onChange={handleChange} value={values.duree} step="60"></input></label><br/>
        <select  className="sportList" value={sport} onChange={handleSportChange}>
          <option value="musculation">Musculation</option>
          <option value="escalade">Escalade</option>
          <option value="course">Course à pieds</option>
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

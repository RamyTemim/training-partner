import React, { useState } from "react";
import FormCourse from "./FormCourse";
import FormEscalade from "./FormEscalade";
import FormMuscu from "./FormMuscu";
import "./FormSeance.css";






interface FormValues {
  name: string;
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
    name: "",
    duree: "00:00",

  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values);
  };


  return (
    <>
      <form className="formSeance" onSubmit={handleSubmit}>
        <label htmlFor="Nom" id="nomTitre" >Nom séance
          <input id="inputNS" name="Nom" type="string" onChange={handleChange} value={values.name} placeholder="Séance A"></input></label><br/>
        <label htmlFor="duree" id="duree">Durée
          <input name="duree" type="time" onChange={handleChange} value={values.duree} step="60"></input></label><br/>
        <select  className="sportList" value={sport} onChange={handleSportChange}>
          <option value="musculation">Musculation</option>
          <option value="escalade">Escalade</option>
          <option value="course">Course à pieds</option>
        </select>
        <div>
          {getForm()}
        </div>

        <button id="buttonSubmitSeance" type="submit">Enregistrer</button>
        </form>
        

        
     
    </>
  );
};

export default FormSeance;

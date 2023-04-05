import React, { useState } from "react";
import "./FormSeance.css";




interface FormValues {
  name: string;
  duree: string;
  distance: number;
  heartRate: number;
}

const FormSeance: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    name: "",
    duree: "00:00",
    distance: 0,
    heartRate: 0,
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
        <label>
          Nom:
          <br />
          <input
            type="text"
            name="nom"
            value={values.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Durée (hh:mm):
          <br />
          <input
            type="time"
            name="duree"
            value={values.duree}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Distance (en kilometres): <br />
          <input
            type="number"
            name="distance"
            value={values.distance}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Rythme Cardique moyen(en bpm): <br />
          <input
            type="number"
            name="heartRate"
            value={values.heartRate}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormSeance;

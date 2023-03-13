import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import './Formulaire.css';
import {Chart,RadialLinearScale,PointElement,LineElement,Tooltip,Legend} from 'chart.js';

interface FormData {
  name: string;
  score: number;
}

interface FormTitle {
  title:string;
}

interface FormSport {
  sport:string;
}

const Formulaire: React.FC = () => {
  
  Chart.register(RadialLinearScale,PointElement,LineElement,Tooltip,Legend);
  const reglage ={
      scales: {
          r: {
              angleLines: {display: true,color:'green'},
              grid:{display:true,color:'black'},
              suggestedMin: 0,
              suggestedMax: 10
          }
      }
  };
  const [formTitle,setformTitle]= useState<FormTitle>({title: ""});
  const [formDonnee, setformDonnee]= useState<FormData>({name: "",score : 0});
  const [formSport,setformSport]= useState<FormSport>({sport: ""});

  const [chartDonnee, setchartDonnee] = useState({
    labels: [] as string[],
    datasets: [
      {
        label:formTitle.title,
        data: [] as number[],
        backgroundColor: 'white',
        borderColor: 'DDDDDD',
        borderWidth: 3,
      },
    ],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setformDonnee({
      ...formDonnee,
      [event.target.name]: event.target.value
    });
  };

  const handleTitleChange=(event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setformTitle({
      ...formTitle,
      title:event.target.value
    })
  };

  const handleSportChange=(event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setformSport({
      ...formSport,
      sport:event.target.value
    })
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(formDonnee.name==="")
    { setchartDonnee({
      labels: [...chartDonnee.labels],
      datasets: [
        {
          ...chartDonnee.datasets[0],
          label: formTitle.title,
          data:[...chartDonnee.datasets[0].data],
        },
      ],
    })
  }
  else if (formTitle.title===""){
     setchartDonnee({
      labels: [...chartDonnee.labels, formDonnee.name],
      datasets: [
        {
          ...chartDonnee.datasets[0],
          data:[...chartDonnee.datasets[0].data, formDonnee.score],
        },
      ],
    })
  }
  else {
    setchartDonnee({
      labels: [...chartDonnee.labels, formDonnee.name],
      datasets: [
        {
          ...chartDonnee.datasets[0],
          label: formTitle.title,
          data:[...chartDonnee.datasets[0].data, formDonnee.score],
        },
      ],
    })
  }
  formTitle.title="";
  formDonnee.name="";
  };

  return (
    <>
      <form className="selection" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name"><p className="Attribut">Attribut :</p></label><br />
            <input type="text" id="name" name="name" placeholder="Entre l'attribut" value={formDonnee.name} onChange={handleInputChange}/>
            <label htmlFor="score"><p className="Score">Score :</p></label><br />
            <input type="number" id="score" name="score" value={formDonnee.score} onChange={handleInputChange}/>
            <button className="submitForm1" type="submit">Ajouter</button>
          </div>
      </form>

      <div className="formulaire">
        <Radar className="spiderchart" data={chartDonnee} options={reglage}/>
      </div>

      <form className="Titre" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title"><p className="titre">Titre :</p></label>
          <input type="text" id="title" name="title" placeholder="Entrer un titre" value={formTitle.title} onChange={handleTitleChange} />
          <label htmlFor="sport"><p className="Sport">Sport :</p></label>
          <input type="text" id="sport" name="sport" placeholder="Escalade" value={formSport.sport} onChange={handleSportChange} ></input>
          <button className="submitForm2" type="submit">Sauvegarder</button>
        </div>
      </form>

      
    </>
  );
};

export default Formulaire;
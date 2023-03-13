//import { title } from "process";
import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import './Formulaire.css';
import {Chart as ChartJS,RadialLinearScale,PointElement,LineElement,Tooltip,Legend,} from 'chart.js';

interface FormData {
  name: string;
  score: number;
}

interface FormTitle {
  title:string;
}

const Formulaire: React.FC= () => {
  
  
  ChartJS.register(RadialLinearScale,PointElement,LineElement,Tooltip,Legend);
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
  const [formTitle,setformTitle]= useState<FormTitle>({title: "",});


  const [formDonnee, setformDonnee] = useState<FormData>({
    name: "",
    score: 0,
  });

  

  const [chartDonnee, setchartDonnee] = useState({
    labels: [] as string[],
    datasets: [
      {
        label:formTitle.title,
        data: [] as number [],
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
      [event.target.name]:event.target.value
    })
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formDonnee.name==="" 
    ? setchartDonnee({
      labels: [...chartDonnee.labels],
      datasets: [
        {
          ...chartDonnee.datasets[0],
          label: formTitle.title,
          data:[...chartDonnee.datasets[0].data],
        },
      ],
    })
    : setchartDonnee({
      labels: [...chartDonnee.labels, formDonnee.name],
      datasets: [
        {
          ...chartDonnee.datasets[0],
          data:[...chartDonnee.datasets[0].data, formDonnee.score],
        },
      ],
    })
    formTitle.title="";
    formDonnee.name="";
    formDonnee.score=0;
  };
  return (
    <>
      
      <form className="selection" onSubmit={handleSubmit}>
        <div className="title">
          <label htmlFor="title">Titre :</label><br />
          <input type="text" id="title" name="title" placeholder="Entrer un titre" value={formTitle.title} onChange={handleTitleChange} />
        </div>
        <div className="name">
          <label htmlFor="name">Nom :</label><br />
          <input type="text" id="name" name="name" placeholder="Entre l'attribut" value={formDonnee.name} onChange={handleInputChange}/>
        </div>
        <div className="score">
          <label htmlFor="score">Score :</label><br />
          <input type="number" id="score" name="score" value={formDonnee.score} onChange={handleInputChange}/>
        </div>
        <br /><button className="submitForm" type="submit">Soumettre</button>
      </form>
      <div className="formulaire"><Radar  className="spiderchart" data={chartDonnee} options={reglage}/></div>
    </>
  );
};

export default Formulaire;

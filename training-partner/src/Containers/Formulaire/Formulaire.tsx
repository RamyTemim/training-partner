import React, { useState } from "react";
import { Radar } from "react-chartjs-2";
import './Formulaire.css';
import {Chart,RadialLinearScale,PointElement,LineElement,Tooltip,Legend} from 'chart.js';
import trash from './trash.png';

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
    if(formDonnee.name===""){
      alert("Entrer un nom d'attribut ");
    }
    else{
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
  setformDonnee({name :"",score :0});
  };

  const handleSave=(event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    if (formTitle.title != ""){
      setchartDonnee({
        labels: [...chartDonnee.labels],
        datasets: [
          {
            ...chartDonnee.datasets[0],
            label: formTitle.title,
            data:[...chartDonnee.datasets[0].data,],
          },
        ],
      })}
      setformTitle({title:""});

  }
  const handleDelete = (id: string) => {
    setchartDonnee((prevState) => ({
      ...prevState,
      labels: prevState.labels.filter((label) => label !== id),
      datasets: [
        {
          ...prevState.datasets[0],
          data: prevState.datasets[0].data.filter((data, index) => {
            return prevState.labels[index] !== id;
          }),
        },
      ],
    }));
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
      <div className='listeAttribut'>
        <h1 id='listeTitre'>Vos attributs</h1>
          <table>
            <thead id='headTab'>
              <tr>
                <th>Attribut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {chartDonnee.labels.map((value: string, index: number) => (
                <tr key={index}>
                  <td>{value}</td>
                  <td>
                    <button className="trashButton" onClick={() => handleDelete(value)}>
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>


      <div className="chart">
        <Radar className="spiderchart" data={chartDonnee} options={reglage}/>
      </div>

      <form className="save" onSubmit={handleSave}>
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
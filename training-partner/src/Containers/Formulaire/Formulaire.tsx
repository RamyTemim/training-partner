import React, { useState } from "react";
import { Bar, PolarArea, Radar } from 'react-chartjs-2';
import './Formulaire.css';
import {Chart,RadialLinearScale,PointElement,LineElement,Filler,Tooltip,Legend,LinearScale,CategoryScale,BarElement,Title,ArcElement} from 'chart.js';





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
type GraphType = "spiderchart" | "bar" | "polar";

const Formulaire: React.FC = () => {

  const [formTitle,setformTitle]= useState<FormTitle>({title: ""});
  const [formDonnee, setformDonnee]= useState<FormData>({name: "",score : 0});
  const [formSport,setformSport]= useState<FormSport>({sport: ""});
  
  const [chartDonnee, setchartDonnee] = useState({
    labels: [] as string[],
    datasets: [
      {
        label:formTitle.title,
        data: [] as number[],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: 'DDDDDD',
        borderWidth: 2,
      },
    ],
  });
  const reglage={
    scales: {
        r: {
            angleLines: {display: true,color:'green'},
            grid:{display:true,color:'black'},
            suggestedMin: 0,
            suggestedMax: 10
        }
    }
};

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

  const handleEdit = () => {
//TO DO
  };

  const [selectedType, setSelectedType] = useState<GraphType>("spiderchart");

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value as GraphType);
  };

    const getGraph = () => {
      switch (selectedType) {
        case "bar":{
          Chart.register(CategoryScale,Filler,LinearScale,BarElement,Title,Tooltip,Legend,);
      
          return <Bar className="graphBar" data={chartDonnee} options={reglage}/>;
      }
        case "polar":{
          Chart.register(RadialLinearScale,Filler, ArcElement, Tooltip, Legend);

          return <PolarArea className="graphPolar" data={chartDonnee} options={reglage}/>;
        }
        case "spiderchart":{
          Chart.register(RadialLinearScale,Filler,PointElement,LineElement,Tooltip,Legend,);
          return <Radar className="graphRadar" data={chartDonnee} options={reglage} />;
        }
      }
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
          <table className="table-auto">
            <thead>
              <tr>
                <th scope="col">Attribut</th>
                <th scope="col">Valeur</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {chartDonnee.labels.map((value: string, index: number) => (
                <tr key={index}>
                  <td>{value}</td>
                  <td>{chartDonnee.datasets[0].data[index]}</td>
                  <td><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => handleEdit()}className="editButton">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                      <svg xmlns="http://www.w3.org/2000/svg" className="trashButton" onClick={() => handleDelete(value)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg></td>  
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <div>
      <label id="choisirGraph" htmlFor="typeList">Choisir le graphique </label>
        <select  id="typeList" value={selectedType} onChange={handleTypeChange}>
          <option value="spiderchart">Spider Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="polar">Polar Chart</option>
        </select>
        </div>

      <div className="chart">
        {getGraph()}
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
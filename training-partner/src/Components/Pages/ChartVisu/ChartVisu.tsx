import React, {useEffect, useState} from 'react';
import "./ChartVisu.css";
import {Chart,RadialLinearScale,PointElement,LineElement,Filler,Tooltip,Legend,LinearScale,CategoryScale,BarElement,Title,ArcElement} from 'chart.js';
import { Bar, PolarArea, Radar } from 'react-chartjs-2';

function ChartVisu(){
    const [lstGraph, setLstGraph] = useState<any[]>([""])// Liste des graphiques disponible pour le sport.
  
    
    const changeLst = (lst : Array<DonneeGraph>)=>{ // fonction qui permet de changer les graphiques disponible pour le sport. Elle est passé en props de BoxSport et lst viens de l'appel à l'api.
        setLstGraph(lst);
    }


    return (
        <div id="main">
            <BoxSport onCall = {changeLst}/>
            <BoxGraphique donnee = {lstGraph}/>
        </div>
    );

}

interface Donneeback{
    idGraph : number;
    typeGraph : string;
    nomSport : string;
    titre : string;
    donneeGraph : DonneeGraph[];
};

interface DonneeGraph{
  idDonnee: number;
  nomAttribut : string;
  valeur : number;
}

function BoxSport(props : any){ // Fonction qui contient le composant correspondant à la liste de sélection des sports.
    const [save,setSave] = useState("escalade")
    const [dataFromBack, setDataFromBack] = useState<Donneeback[]>()

    useEffect(() => {
      const user = localStorage.getItem('user')
      const fetchDonnee = async () => {
          try{
              const reponse = await fetch(`http://localhost:3001/graphique/graph`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({pseudo : user})
              });
              var donnee = await reponse.json();
              if(donnee){
                  setDataFromBack(donnee);
              }
          }
          catch(error){
              console.error(error);
          }
      }
      fetchDonnee();
  },[]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>)=>{
      const filter = dataFromBack?.filter(data => data.nomSport === event.target.value).map(data => data);
      props.onCall(filter);
      }
        
    
    return(
        //Select le sport
    <div>
        <select className='SportVisu' onChange={handleSelect} value={undefined}>
            <option> Selectionnez un sport</option>
            <option value="escalade">Escalade</option>
            <option value="course">Course</option>
            <option value="musculation">Musculation</option>
        </select>
    </div>
    );
}   

function BoxGraphique(donnee : any){ // Fonction contenant le composant affichant le select des séances et le graphique.
    const [selectedOption, setSelectedOption] = useState(""); 
    const [donneeGraph, setDonneeGraph] = useState({
        attribut : [""],
        score : [],
        type : ""
    }) // State pour stocker les données du graphique.
    
    const [chartDonnee, setchartDonnee] = useState({
        labels: donneeGraph.attribut as string[],
        datasets: [
          {
            label:"Graphique" ,
            data: donneeGraph.score as number[],
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
      }) // State pour stocker les options du graphique
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

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === "base"){
          //rien
        }
        else{
        let temp = JSON.parse(event.target.value) // nom de la séance
        var tempname = temp.donneeGraph.map((valeur : any) => {return valeur.nomAttribut})
        var tempscore = temp.donneeGraph.map((valeur : any) => {return valeur.valeur})
        setSelectedOption(event.target.value);
        setDonneeGraph({attribut: tempname, score: tempscore, type: temp.typeGraph}); // On modifie les donneés du graphes
        setchartDonnee({
            labels: tempname,
            datasets: [
              {
                label: "Graphique",
                data: tempscore,
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
          });} // Et ses paramètres.
      }
    const getGraph = () => { // Fonction affichant le graphe.
      switch (donneeGraph.type) {
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
    //Affichage du select.
    return(
        <>
        <div>
        <select value={selectedOption} onChange={handleChange} className = "ListGraph">
            <option value = "base">Choisir un Graph</option>
            {donnee.donnee.map((graph : any) =>(
                    <option value={JSON.stringify(graph)}>
                        {graph.titre}
                    </option>
                ))}
        </select>
        </div>
        <div className="chartVisu">
            {getGraph()}
        </div>
        </>
    )

}


export default ChartVisu;
import React, {useState} from 'react';
import "./ChartVisu.css";
import {Chart,RadialLinearScale,PointElement,LineElement,Filler,Tooltip,Legend,LinearScale,CategoryScale,BarElement,Title,ArcElement} from 'chart.js';
import { Bar, PolarArea, Radar } from 'react-chartjs-2';

function ChartVisu(){
    const [lstGraph, setLstGraph] = useState<any[]>([""])
    const changeLst = (lst : Array<any>)=>{
        setLstGraph(lst);
    }

    return (
        <div id="main">
            <BoxSport onCall = {changeLst}/>
            <BoxGraphique donnee = {lstGraph}/>
        </div>
    );

}

function BoxSport(props : any){
    const [save,setSave] = useState("escalade")

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>)=>{
    
        const value = JSON.stringify({
            sport : event.target.value
        })
        fetch("http://localhost:3001/chartVisu/getlstGraph",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
              },
            body: value
        })
        .then(response => response.json())
        .then((data) => {
            let temp2 = Object.values(data);
            props.onCall(temp2);

        });
    }
    return(
        //Select le sport
    <div className='boxSport'>
        <select className='selectSport' onChange={handleSelect} value={undefined}>
            <option> Selectionnez un sport</option>
            <option value="escalade">Escalade</option>
            <option value="course">Course</option>
            <option value="musculation">Musculation</option>
        </select>
    </div>
    );
}   

function BoxGraphique(donnee : any){
    const [selectedOption, setSelectedOption] = useState("");
    const [donneeGraph, setDonneeGraph] = useState({
        attribut : [""],
        score : [],
        type : ""
    })
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

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value == "base"){
            
        }
        else{
        let temp = JSON.parse(event.target.value)
        setSelectedOption(event.target.value);
        setDonneeGraph({attribut: temp.labels, score: temp.values, type: temp.graph});
        setchartDonnee({
            labels: temp.labels,
            datasets: [
              {
                label: "Graphique",
                data: temp.values,
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
          });}
      }
    const getGraph = () => {
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
    
    return(
        <>
        <div className ="boxGraphique">
        <select value={selectedOption} onChange={handleChange} id = "typeList">
            <option value = "base">Choisir un Graph</option>
            {donnee.donnee.map((graph : any) =>(
                    <option value={JSON.stringify(graph)}>
                        {graph.title}
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
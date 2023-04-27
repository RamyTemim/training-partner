import "./Battle.css";
import Menus from './Menus/Menus';

function Battle(){
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
    return (
        <div>
            <div className='containerParagraphe'>
                <p className="paragraphe">Vous etes votre plus grand rival, et qui de mieux que vous pour le surpasser?
                Cette section vous permet de vous comparer avec une ancienne version de vous-même,
                et de mieux constater vos amélioration !</p>
            </div>
            <Menus/>
        </div>
    )
}

export default Battle;
import react, { useState } from 'react';
import './Menus.css';

function Menus(){
    const [isOpen, setIsOpen] = useState(false);
    const sports = ["Escalade", "Natation"];
    const [isOpenX, setIsOpenX] = useState(false);
    const seanceX = ["Seance1", "Seance2"];
    const [isOpenY, setIsOpenY] = useState(false);
    const seanceY = ["Seance1", "Seance2"];

    return (
        <div className='containerMenus'>
            <button className="Sport" onClick={() => setIsOpen(!isOpen)}>
                <span>Sports</span>
                <span className={`icon ${isOpen ? 'up' : 'down'}`}>&#9660;</span>
            </button>
            {isOpen && (
                <ul className="dropMenu">
                    {sports.map(sport =>(
                        <li key = {sport}>
                            <a href="#">{sport}</a>
                        </li>
                    ))}
                </ul>
            )}
            <button className="SeanceX" onClick={() => setIsOpenX(!isOpenX)}>
                <span>seanceX</span>
                <span className={`icon ${isOpenX ? 'up' : 'down'}`}>&#9660;</span>
            </button>
            {isOpenX && (
                <ul className="dropMenuSeanceX">
                    {seanceX.map(seance =>(
                        <li key = {seance}>
                            <a href="#">{seance}</a>
                        </li>
                    ))}
                </ul>
            )}
            <button className="SeanceY" onClick={() => setIsOpenY(!isOpenY)}>
                <span>seanceY</span>
                <span className={`icon ${isOpenY ? 'up' : 'down'}`}>&#9660;</span>
            </button>
            {isOpenY && (
                <ul className="dropMenuSeanceY">
                    {seanceY.map(seance =>(
                        <li key = {seance}>
                            <a href="#">{seance}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Menus;
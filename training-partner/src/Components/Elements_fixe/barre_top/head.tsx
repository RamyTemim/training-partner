import React, {useState} from 'react';
import './head.css';
import Date from './Date';
import logo from './logo.png';
import UserMenu from './menuUser/user_menu';

function Header(){
    const [showmenu, setshowmenu] = useState(false);

    const affMenu = ()=>{
        setshowmenu(!showmenu);
    }
    return (
        <header className='head'>
            <nav>
                <p className='Date'>
                    <Date />
                </p>
                <div className='container'>
                    
                    <img src={logo}  alt="logo.png" id = "logo_top"/>
                    <a href ="#" className='Title'>Training Partner</a>
                </div>
                <div className='Pseudo'>
                    <button onClick={affMenu}>Pseudo</button>
                    {showmenu && <UserMenu/>}
                </div>
            </nav>
        </header>
    )
}

export default Header;
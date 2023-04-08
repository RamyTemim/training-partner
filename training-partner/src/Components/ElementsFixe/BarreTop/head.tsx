import React, {useState} from 'react';
import './head.css';
import Date from './Date';
import logo from './logo.png';
import logo_user from './logo_user.png';
import UserMenu from './MenuUser/UserMenu';

function Header(){
    const [showMenu, setShowMenu] = useState(false);

    const affMenu = ()=>{
        setShowMenu(!showMenu);
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
                    <button onClick={affMenu} id="buttonUser"><img title='photo profil' alt='photo profil' src={logo_user} id = "logo_user"/>Pseudo</button>
                    {showMenu && <UserMenu />}

                </div>
            </nav>
        </header>
    )
}

export default Header;
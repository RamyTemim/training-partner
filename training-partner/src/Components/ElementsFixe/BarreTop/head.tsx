import React, {useState} from 'react';
import './head.css';
import Date from './Date';
import logo from './logo.png';
import logo_user from './logo_user.png';
import UserMenu from './MenuUser/UserMenu';

function Header(props : any){
    const [showmenu, setshowmenu] = useState(false);
    const pseudo = localStorage.getItem('user');
    const setdeco = ()=>{
        props.deco()
    }

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
                    <button onClick={affMenu} id="buttonUser">
                        {pseudo}
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg"  onClick={affMenu} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" id="logo_user" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {showmenu && <UserMenu deco = {setdeco}/>}
                </div>
              
            </nav>
        </header>
    )
}

export default Header;
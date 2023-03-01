import React from 'react';
import './head.css';
import Date from './Date';
import logo from './logo.png';

function Header(){
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
                <p className='Pseudo'>Pseudo</p>
            </nav>
        </header>
    )
}

export default Header;
import React from 'react';
import './head.css';
import Date from './Date';

function Header(){
    return (
        <header className='head'>
            <nav>
                <p className='Date'>
                    <Date />
                </p>
                <div className='container'>
                    <a href ="#" className='Title'>Training Partner</a>
                </div>
                <p className='Pseudo'>Pseudo</p>
            </nav>
        </header>
    )
}

export default Header;
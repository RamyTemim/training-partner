import React, { useState } from 'react';
import './user_menu.css'
import mail from './mail.png';
import deconnexion from './deconnexion.png';
import user from './user.png';

function UserMenu(){

  return (
    <div id= "user_menu">
      <p><button id ="b1"> <img src={mail}/>Email</button></p>
      <p><button id ="b2"><img src={user}/>Information Utilisateur</button></p>
      <p><button id ="b3"><img src={deconnexion}/>Déconnexion</button></p>
    </div>
  )
};

export default UserMenu;
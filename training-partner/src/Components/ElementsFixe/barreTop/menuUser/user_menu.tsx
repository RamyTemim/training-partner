import React, { useState } from 'react';
import './user_menu.css'
import mail from './mail.png';
import deconnexion from './deconnexion.png';
import user from './user.png';

function UserMenu(){

  return (
    <div id= "user_menu">
      <p><button id ="b1"> <img src={mail}/> <span style={{paddingLeft: '10px', paddingRight: '10px'}}/>Email</button></p>
      <p><button id ="b2"><img src={user}/> <span style={{paddingLeft: '10px', paddingRight: '10px'}}/> Profil Utilisateur</button></p>
      <p><button id ="b3"><img src={deconnexion}/> <span style={{paddingLeft: '10px', paddingRight: '10px'}}/>Déconnexion</button></p>
    </div>
  )
};

export default UserMenu;
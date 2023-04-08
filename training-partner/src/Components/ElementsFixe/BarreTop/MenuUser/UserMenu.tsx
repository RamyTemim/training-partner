import React, { useState } from 'react';
import './UserMenu.css'
import mail from './mail.png';
import deconnexion from './deconnexion.png';
import user from './user.png';
import Informations from './Informations';

function UserMenu(){
  const [userInfo, setUserInfo] = useState(false);

  function handleProfil(){
    setUserInfo(true)
    if(userInfo){
      return <Informations />
    }
  }


  return (
    <div id= "user_menu">
      <p><button id ="b1"> <img title='Email' alt='Email' src={mail}/> Email</button></p>
      <p><button id ="b2" onClick= {handleProfil}><img title='Profil' alt='Profil' src={user}/>Profil Utilisateur</button></p>
      <p><button id ="b3"><img title='deconnexion' alt='deconnexion' src={deconnexion}/>Déconnexion</button></p>
    </div>
  )
};

export default UserMenu;
import { useState } from 'react';
import './UserMenu.css'
import mail from './mail.png';
import deconnexion from './deconnexion.png';
import user from './user.png';
import Informations from './Profil';

function UserMenu(){

  const info = ()=>{
    console.log("info")
    return(
        <Informations/>
    )
  }

  return (
    <div id= "user_menu">
      <pre><button id ="btt_email"> <img title='Email' alt='Email' src={mail}/>    Email</button></pre>
      <pre><button id ="btt_profil" onClick={info}><img title='Profil' alt='Profil' src={user}/>    Profil Utilisateur</button></pre>
      <pre><button id ="btt_deco"><img id ="btt_deco_img"title='deconnexion' alt='deconnexion' src={deconnexion}/>    Déconnexion</button></pre>
    </div>
  )
};

export default UserMenu;
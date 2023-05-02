import { useState } from 'react';
import './UserMenu.css'
import mail from './mail.png';
import deconnexion from './deconnexion.png';
import user from './user.png';
import Profil from './Profil';

function UserMenu(props : any){

  const info = ()=>{
    console.log("info")
    return(
        <Profil/>
    )
  }
  const handleLogout = async() => {
        try {
        const reponse = await fetch ('http://localhost:3001/user/logout', {method : "POST"})
        const donnee = await reponse.text();
        console.log("déconnexion réussi",donnee);//affiche déconnexion réussi dans la console
        props.deco();
        }
        catch(error){
            console.error(error)
            alert("Une erreur est survenu lors de la déconnexion !")
        }
       
    }

  return (
    <div id= "user_menu">
      <button id ="btt_email"> <img title='Email' alt='Email' src={mail}/>    Email</button>
      <button id ="btt_profil" onClick={info}><img title='Profil' alt='Profil' src={user}/>    Profil Utilisateur</button>
      <button id ="btt_deco" onClick={handleLogout}><img id ="btt_deco_img"title='deconnexion' alt='deconnexion' src={deconnexion}/>    Déconnexion</button>
    </div>
  )
};

export default UserMenu;
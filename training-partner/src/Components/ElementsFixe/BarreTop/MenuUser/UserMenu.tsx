import { useEffect, useState } from 'react';
import './UserMenu.css'
import mail from './mail.png';
import deconnexion from './deconnexion.png';
import user from './user.png';
import Profil from './Profil';
import { User } from '../../../../Interfaces/User';

function UserMenu(props : any){
  const [profil ,setProfil] = useState<User>({ pseudo : '', nom : '', prenom : '', dateDeNaissance : '', email : '', messageMdp : '', reponseMessage : '', motDePasse : ''});

  useEffect(() => {
    const user = localStorage.getItem('user')
    const fetchDonnee = async () => {
        try{
            const reponse = await fetch(`http://localhost:3001/user/profil`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pseudo :user})
            });
            const donnee = await reponse.json();
            if(donnee){
                setProfil(donnee);
                console.log(donnee);
            }
        }
        catch(error){
            console.error(error);
        }
    }
    fetchDonnee();
},[]);

  const [showProfil,setShowProfil]=useState(false);
  const handleprofil = ()=>{
    setShowProfil(!showProfil);
    console.log(profil.pseudo);
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
    <>
    <div id= "user_menu">
      <img title='Email' alt='Email' id ="_email" src={mail}/><div id="emailMenuUser">{profil.email}</div>
      <button id ="btt_profil" onClick={handleprofil}><img title='Profil' alt='Profil' src={user}/>    Profil Utilisateur</button>
      <button id ="btt_deco" onClick={handleLogout}><img id ="btt_deco_img"title='deconnexion' alt='deconnexion' src={deconnexion}/>    Déconnexion</button>
      </div>
    <div className='menuProfil'>
      {showProfil && <Profil />}
      {showProfil&&<button className='btt_close_Profil' onClick={handleprofil}>Fermer</button>}
    </div>
    </>
   
  )
};

export default UserMenu;
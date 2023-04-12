import { useEffect, useState } from 'react';
import './Profil.css';
import { User } from '../../../../Interfaces/User';

function Informations(){
    const [profil ,setProfil] = useState<User>({ pseudo : '', nom : '', prenom : '', datedenaissance : '', email : '', message_mdp : '', reponse_message : '', motdepasse : ''});
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setProfil((profil)=>({...profil, [name] : value}))
    };
    useEffect(() => {
        const fetchDonnee = async () => {
            try{
                const reponse = await fetch('http://localhost:3001/user/profil', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const donnee = await reponse.json();
                setProfil(donnee);
            }
            catch(error){
                console.error(error);
            }
        }
        fetchDonnee();
    },[]);

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        try{
            const response = await fetch ('http://localhost:3001/user/profil',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(profil)
            })
            if(response.ok){
                const donnee = await response.json();
                console.log("donnee",donnee)
                console.log("Modification réussi")
            }
        }
        catch (error){
            console.error(error);
        }
    }    
    
    return (
        <div className='FormulaireProfil'>
            <form onSubmit = {handleSubmit} >
                    <label htmlFor='pseudo'>Pseudo : </label>
                    <input type='text' id='pseudo' name='pseudo' value = {profil.pseudo} onChange={handleInputChange}/>
                    <label htmlFor='nom'>Nom : </label>
                    <input type='text' id='nom' name='nom' value = {profil.nom} readOnly/>
                    <label htmlFor='prenom'>Prénom : </label>
                    <input type='texte' id='prenom' name='prenom' value = {profil.prenom} readOnly/>
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {profil.email} readOnly/>
                    <label htmlFor='motdepasse'>Mot de passe : </label>
                    <input type='password' id='motdepasse' name='motdepasse' value = {profil.motdepasse} onChange={handleInputChange}/>
            </form>
        </div>
    )
}

export default Informations;
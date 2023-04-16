import { useEffect, useState } from 'react';
import './Profil.css';
import { User } from '../../../../Interfaces/User';

function Profil(){
    const [profil ,setProfil] = useState<User>({ pseudo : '', nom : '', prenom : '', dateDeNaissance : '', email : '', messageMdp : '', reponseMessage : '', motDePasse : ''});
    
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setProfil((profil)=>({...profil, [name] : value}))
    };

    useEffect(() => {
        const fetchDonnee = async () => {
            const user = localStorage.getItem('user');
            //const us = JSON.parse(user)
            //const pseudo = user.pseudo;
            console.log("user :",user)
            try{
                const reponse = await fetch(`http://localhost:3001/user/profil?pseudo=${user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
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
                    <input type='text' id='nom' name='nom' value = {profil.nom} onChange={handleInputChange} />
                    <label htmlFor='prenom'>Prénom : </label>
                    <input type='texte' id='prenom' name='prenom' value = {profil.prenom} onChange={handleInputChange} />
                    <label htmlFor='dateDeNaissance'>Date de naissance : </label>
                    <input type="date" id='dateDeNaissance' name='dateDeNaissance' value = {profil.dateDeNaissance} onChange={handleInputChange}/>
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {profil.email} onChange={handleInputChange} />
                    <label htmlFor='messageMdp'> Question de sécurité : </label>
                    <input type='text' id='messageMdp' name='messageMdp' placeholder="Met ici une question seule toi peut répondre" value = {profil.messageMdp} onChange={handleInputChange}/>
                    <label htmlFor='reponseMessage'> Réponse : </label>
                    <input type='text' id='reponseMessage' name='reponseMessage' placeholder="Met ici la réponse à cette question" value = {profil.reponseMessage} onChange={handleInputChange}/>
                    <label htmlFor='motdepasse'>Mot de passe : </label>
                    <input type='password' id='motdepasse' name='motdepasse' value = {profil.motDePasse} onChange={handleInputChange}/>
            </form>
        </div>
    )
}

export default Profil;
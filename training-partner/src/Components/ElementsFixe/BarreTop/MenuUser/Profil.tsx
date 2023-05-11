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

    // const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
    //     event.preventDefault();
    //     const pseudo = localStorage.getItem('user')
    //     try{
    //         const response = await fetch ('http://localhost:3001/user/setProfil',{
    //             method : 'POST',
    //             headers : {'Content-Type' : 'application/json'},
    //             body : JSON.stringify({pseudo : pseudo, newPseudo : profil.pseudo})
    //         })
    //         if(response.ok){
    //             const donnee = await response.json();
    //             console.log("donnee",donnee)
    //             console.log("Modification réussi")
    //             localStorage.setItem('user', JSON.stringify(profil.pseudo))
    //         }
    //     }
    //     catch (error){
    //         console.error(error);
    //     }
    //}    
    
    return (
        <div className='FormulaireProfil'>
            <form >
                    <label htmlFor='pseudo'>Pseudo : </label>
                    <input type='text' id='pseudo' name='pseudo' value = {profil.pseudo} onChange={handleInputChange}/>
                    <label htmlFor='nom'>Nom : </label>
                    <input type='text' id='nom' name='nom' value = {profil.nom}/>
                    <label htmlFor='prenom'>Prénom : </label>
                    <input type='texte' id='prenom' name='prenom' value = {profil.prenom}/>
                    <label htmlFor='dateDeNaissance'>Date de naissance : </label>
                    <input type="date" id='dateDeNaissance' name='dateDeNaissance' value = {profil.dateDeNaissance}/>
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {profil.email} onChange={handleInputChange}/>
            </form>
        </div>
    )
}

export default Profil;
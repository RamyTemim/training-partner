import react, { useEffect, useState } from 'react';
import { User } from '../../../Interfaces/User';
import "./PageAcceuil.css";

function PageAccueil(){
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

    return (
        <div className='bonjour'>
            Bonjour {profil.pseudo},<br/>
            <p className='accroche'>La seule limite à ta réussite est ton imagination !!</p>
            <p className='presentation'>Nous sommes là pour t'aider à poursuivre tes progrès jusqu'à cet objectif à travers cette application.
                Tu pourras enregistrer tes séances, les visualiser, créer des graphiques pour les analyser et même les comparer pour constater ta progression.
            <br/>
            <br/> Bonne chance !
            </p>

        </div>
    )
}

export default PageAccueil;
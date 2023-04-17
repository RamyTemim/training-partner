import  { useState } from 'react';
import './Auth.css';
import { User } from '../../../Interfaces/User';

export function storeDataLocally(connected :boolean, user : User){
    localStorage.setItem('connected', String(connected));
    localStorage.setItem('user', JSON.stringify(user))
}

function PageLogin (props : {onLogin : () => void}) {
    //Définit le state login pour stocker les informations du formulaire
    const [login ,setLogin] = useState<User>({ pseudo : '', nom : '', prenom : '', dateDeNaissance : '', email : '', messageMdp : '', reponseMessage : '', motDePasse : ''});
    //Définit le state error pour stocker les erreurs de validation du formulaire
    const [error, setError] = useState<string>('');

    //Gère les changements dans les champs du formulaire et met à jour le state login
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setLogin({...login, [name] : value})
    };

    //Gère la soumission du formulaire
    const handleSubmitLogin = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();//Empêche la page de se recharger lors de la soumission du formulaire
        try{
            //Envoie les données du formulaire à l'API pour connecter un utilisateur
            const response = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pseudo : login.pseudo ,motDePasse : login.motDePasse })
            })
            //Si la réponse de l'API est réussi affiche un message de confirmation
            if (response.ok){
                const donnee = await response.text();
                if(donnee){
                    const donnees = JSON.parse(donnee);
                    localStorage.setItem('token', donnees.token);
                    localStorage.setItem("user", login.pseudo);
                    console.log("le json marche?")
                }
                props.onLogin();
                console.log("connecté")
            }
            else {
                setError("invalid username or password.");
            }
        }
        catch (error){
            console.error(error);
            setError("An error occur while trying to log in.")
        }    
    };

    return (
        <div>
            <div className='FormulaireAuth'>
                <form onSubmit = {handleSubmitLogin} >
                    <label htmlFor='pseudo'>Pseudo : </label>
                    <input type='text' id='pseudo' name='pseudo' value = {login.pseudo} onChange={handleInputChange}/>
                    <label htmlFor='motDePasse'>Mot de passe : </label>
                    <input type='password' id='motDePasse' name='motDePasse' value = {login.motDePasse} onChange={handleInputChange}/>
                    {error && <div>{error}</div>}
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default PageLogin;
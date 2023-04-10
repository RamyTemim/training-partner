import  { useState } from 'react';
import './Auth.css';
import { User } from '../../../Interfaces/User';

function PageLogin (props : {onLogin : () => void}) {
    const [login ,setLogin] = useState<User>({ pseudo : '', nom : '', prenom : '', datedenaissance : '', email : '', message_mdp : '', reponse_message : '', motdepasse : ''});
    const [error, setError] = useState<string>('');

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setLogin({...login, [name] : value})
    };

    const handleSubmitLogin = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pseudo : login.pseudo ,motdepasse : login.motdepasse })
            })
            if (response.ok){
                const donnee = await response.text();
                if(donnee){
                    const donnees = JSON.parse(donnee);
                    localStorage.setItem('token', donnees.token);
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
                    <label htmlFor='pseudo'>Username : </label>
                    <input type='text' id='pseudo' name='pseudo' value = {login.pseudo} onChange={handleInputChange}/>
                    <label htmlFor='motdepasse'>Mot de passe : </label>
                    <input type='password' id='motdepasse' name='motdepasse' value = {login.motdepasse} onChange={handleInputChange}/>
                    {error && <div>{error}</div>}
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default PageLogin;
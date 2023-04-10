import { useState } from 'react';
import './Auth.css';
import { User } from '../../../Interfaces/User';

const PageSignUp : React.FC = () => {
    const [signUp ,setSignUp] = useState<User>({ pseudo : '', nom : '', prenom : '', datedenaissance : '', email : '', message_mdp : '', reponse_message : '', motdepasse : ''});
    const [error, setError] = useState<string>('');

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
            setSignUp((signUp)=>({...signUp, [name] : value}))
    };
    const handleSubmitSignUp = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        try{
            console.log(signUp)
            const response = await fetch ('http://localhost:3001/signUp',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(signUp)
            })
            console.log("response")
            if(response.ok){
                const donnee = await response.json();
                console.log("donnee",donnee)
                console.log("inscription réussi")
            }
            else {
                setError("Nom d'utilisateur ou email déjà existant.")
            }
            
        }
        catch (error){
            console.error(error);
        }
    };

    return(
        <div>
            <div className='FormulaireAuth'>
                <form onSubmit = {handleSubmitSignUp} >
                    <label htmlFor='pseudo'>Pseudo : </label>
                    <input type='text' id='pseudo' name='pseudo' value = {signUp.pseudo} onChange={handleInputChange}/>
                    <label htmlFor='nom'>Nom : </label>
                    <input type='text' id='nom' name='nom' value = {signUp.nom} onChange={handleInputChange}/>
                    <label htmlFor='prenom'>Prénom : </label>
                    <input type='texte' id='prenom' name='prenom' value = {signUp.prenom} onChange={handleInputChange}/>
                    <label htmlFor='datedenaissance'>Date de naissance : </label>
                    <input type="date" id='datedenaissance' name='datedenaissance' value = {signUp.datedenaissance} onChange={handleInputChange}/>
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {signUp.email} onChange={handleInputChange}/>
                    <label htmlFor='message_mdp'> Question de sécurité : </label>
                    <input type='text' id='message_mdp' name='message_mdp' placeholder="Met ici une question seule toi peut répondre" value = {signUp.message_mdp} onChange={handleInputChange}/>
                    <label htmlFor='reponse_message'> Réponse : </label>
                    <input type='text' id='answerreponse_message' name='reponse_message' placeholder="Met ici la réponse à cette question" value = {signUp.reponse_message} onChange={handleInputChange}/>
                    <label htmlFor='motdepasse'>Mot de passe : </label>
                    <input type='password' id='motdepasse' name='motdepasse' value = {signUp.motdepasse} onChange={handleInputChange}/>
                    {error && <div>{error}</div>}
                    <button type='submit'>Inscription</button>
                </form>
            </div>
        </div>
    );
}

export default PageSignUp;
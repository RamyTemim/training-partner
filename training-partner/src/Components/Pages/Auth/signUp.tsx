import { useState } from 'react';
import './Auth.css';
import { User } from '../../../Interfaces/User';

const PageSignUp : React.FC = () => {
    //Définit le state signUp pour stocker les informations du formulaire
    const [signUp ,setSignUp] = useState<User>({ pseudo : '', nom : '', prenom : '', dateDeNaissance : '', email : '', messageMdp : '', reponseMessage : '', motDePasse : ''});
    
    //Définit le state error pour stocker les erreurs de validation du formulaire
    const [error, setError] = useState<string>('');

    //Gère les changements dans les champs du formulaire et met à jour le state signUp
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
            setSignUp((signUp)=>({...signUp, [name] : value}))
    };

    //Gère la soumission du formulaire
    const handleSubmitSignUp = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();//Empêche la page de se recharger lors de la soumission du formulaire
        try{
            //Envoie les données du formulaire à l'API pour enregistrer un nouvel utilisateur
            const response = await fetch ('http://localhost:3001/user/signUp',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(signUp)
            })
            //Si la réponse de l'API est réussi affiche un message de confirmation
            if(response.ok){
                const donnee = await response.json();
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
                    <label htmlFor='dateDeNaissance'>Date de naissance : </label>
                    <input type="date" id='dateDeNaissance' name='dateDeNaissance' value = {signUp.dateDeNaissance} onChange={handleInputChange}/>
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {signUp.email} onChange={handleInputChange}/>
                    <label htmlFor='messageMdp'> Question de sécurité : </label>
                    <input type='text' id='messageMdp' name='messageMdp' placeholder="Met ici une question seule toi peut répondre" value = {signUp.messageMdp} onChange={handleInputChange}/>
                    <label htmlFor='reponseMessage'> Réponse : </label>
                    <input type='text' id='reponseMessage' name='reponseMessage' placeholder="Met ici la réponse à cette question" value = {signUp.reponseMessage} onChange={handleInputChange}/>
                    <label htmlFor='motDePasse'>Mot de passe : </label>
                    <input type='password' id='motDePasse' name='motDePasse' value = {signUp.motDePasse} onChange={handleInputChange}/>
                    {error && <div>{error}</div>}
                    <button type='submit'>Inscription</button>
                </form>
            </div>
        </div>
    );
}

export default PageSignUp;
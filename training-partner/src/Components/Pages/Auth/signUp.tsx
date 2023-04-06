import react , { useState } from 'react';
import axios from 'axios';
import './auth.css';

interface signUp {
    username : string;
    lastname : string;
    firstname : string;
    birthdate : string;
    email : string;
    password : string;
    confirmedpassword : string;
    question : string;
    answer : string;
}

const PageSignUp : React.FC = () => {
    const [signUp ,setSignUp] = useState<signUp>({ username : '', lastname : '', firstname : '', birthdate : '', email : '', password : '', confirmedpassword : '', question : '', answer : ''});
    const [error, setError] = useState<string>('');

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setSignUp((signUp)=>({...signUp, [name] : value}))
    };
    const handleSubmitSignUp = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        try{
            const response = await axios.post ('http://localhost:3001/user/signUp', signUp)
        }
        catch (error){
            console.error(error);
        }
    };

    return(
        <div>
            <div className='FormulaireAuth'>
                <form onSubmit = {handleSubmitSignUp} >
                    <label htmlFor='username'>Username : </label>
                    <input type='text' id='username' name='username' value = {signUp.username} onChange={handleInputChange}/>
                    <label htmlFor='lastname'>Lastname : </label>
                    <input type='text' id='lastname' name='lastname' value = {signUp.lastname} onChange={handleInputChange}/>
                    <label htmlFor='firstname'>Firstname : </label>
                    <input type='texte' id='firstname' name='firstname' value = {signUp.firstname} onChange={handleInputChange}/>
                    <label htmlFor='birthdate'>Birthdate : </label>
                    <input type="date" id='birthdate' name='birthdate' value = {signUp.birthdate} onChange={handleInputChange}/>
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {signUp.email} onChange={handleInputChange}/>
                    <label htmlFor='password'>Mot de passe : </label>
                    <input type='password' id='password' name='password' value = {signUp.password} onChange={handleInputChange}/>
                    <label htmlFor='confirmedpassword'> Confirmer mot de passe : </label>
                    <input type='password' id='confirmedpassword' name='confirmedpassword' value = {signUp.confirmedpassword} onChange={handleInputChange}/>
                    <label htmlFor='question'> Question de sécurité : </label>
                    <input type='text' id='question' name='question' placeholder="Met ici une question seule toi peut répondre" value = {signUp.question} onChange={handleInputChange}/>
                    <label htmlFor='answer'> Réponse : </label>
                    <input type='text' id='answer' name='answer' placeholder="Met ici la réponse à cette question" value = {signUp.answer} onChange={handleInputChange}/>
                    {error && <div>{error}</div>}
                    <button type='submit'>SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default PageSignUp;
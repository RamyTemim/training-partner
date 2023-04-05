import react , { useState } from 'react';
import axios from 'axios';
import './auth.css';
import Head from './head';

interface signUp {
    firstname : string;
    lastname : string;
    username : string;
    email : string;
    password : string;
    confirmedpassword : string;
}

const PageSignUp : React.FC = () => {
    const [signUp ,setSignUp] = useState<signUp>({ firstname : '', lastname : '', username : '', email : '', password : '', confirmedpassword : ''});
    const [error, setError] = useState<string>('');

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setSignUp((signUp)=>({...signUp, [name] : value}))
    };
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
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
                <form onSubmit = {handleSubmit} >
                <label htmlFor='username'>Username : </label>
                    <input type='username' id='username' name='username' value = {signUp.username} onChange={handleInputChange}/>
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {signUp.email} onChange={handleInputChange}/>
                    <label htmlFor='password'>Mot de passe : </label>
                    <input type='password' id='password' name='password' value = {signUp.password} onChange={handleInputChange}/>
                    <label htmlFor='confirmedpassword'> Confirmer mot de passe : </label>
                    <input type='password' id='confirmedpassword' name='confirmedpassword' value = {signUp.confirmedpassword} onChange={handleInputChange}/>
                    {error && <div>{error}</div>}
                    <button type='submit'>SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default PageSignUp;
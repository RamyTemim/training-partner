import react , { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import 'auth.css';
import Head from './head';

interface Login {
    email : string;
    password : string;
}

const PageLogin : React.FC = () => {
    const [login ,setLogin] = useState<Login>({email : '', password : ''});
    const [error, setError] = useState<string>('');

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setLogin({...login, [name] : value})
    };
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        try{
            const response = await axios.post ('http://localhost:3000/user/login', {
                method : 'POST',
                headers : { 'Content-Type' : 'application/json'},
                body : JSON.stringify(login),
            });
            if (response.status >= 200 && response.status < 300){
                const donnee = await response.data;
                localStorage.setItem('token', donnee.token);
            }
        }
        catch (error){
            console.error(error);
        }
    };
    return (
        <div>
            <Head />
            <div className='FormulaireAuth'>
                <form onSubmit = {handleSubmit} >
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {login.email} onChange={handleInputChange}/>
                    <label htmlFor='password'>Mot de passe : </label>
                    <input type='password' id='password' name='password' value = {login.password} onChange={handleInputChange}/>
                    {error && <div>{error}</div>}
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default PageLogin;
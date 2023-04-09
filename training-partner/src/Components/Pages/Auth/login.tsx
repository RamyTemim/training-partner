import react , { useState, useEffect } from 'react';
import './auth.css';

interface Login {
    username : string;
    password : string;
}

function PageLogin (props : {onLogin : () => void}) {
    const [login ,setLogin] = useState<Login>({username : '', password : ''});
    const [error, setError] = useState<string>('');

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setLogin({...login, [name] : value})
    };

    const handleSubmitLogin = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username : login.username ,password : login.password })
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
                    <label htmlFor='username'>Username : </label>
                    <input type='text' id='username' name='username' value = {login.username} onChange={handleInputChange}/>
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
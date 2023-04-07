import react , { useState, useEffect } from 'react';
import './auth.css';

interface Login {
    username : string;
    password : string;
}

function PageLogin (props : any) {
    const [login ,setLogin] = useState<Login>({username : '', password : ''});
    const [error, setError] = useState<string>('');
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const message = {
            username: "Gabriel",
            password : "root",
        };
        fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(response => response.text())
        .then(data => console.log(data))
    }, []);

    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setLogin({...login, [name] : value})
    };
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
       console.log("submit");
        
    };
    return (
        <div>
            <div className='FormulaireAuth'>
                <form onSubmit = {handleSubmit} >
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
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Informations.css';

interface Info {
    username : string;
    lastname : string;
    firstname : string;
    email : string;
    password : string;
}

function Informations(){
    const [info ,setInfo] = useState<Info>({ username : '', lastname : '', firstname : '', email : '', password : ''});
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        const { name, value } = event.target;
        setInfo((info)=>({...info, [name] : value}))
    };
    useEffect(() => {
        const message = {
            username: "Gabriel",
            password : "root",
        };
        fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(response => response.text())
        .then(data => console.log(data))
    }, []);

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        try{
            const response = await axios.post ('http://localhost:3001/',{
                withCredentials : true,
                headers : { 
                    'Content-Type' : 'application/json',
                },
            })
            if (response.status >= 200 && response.status < 300){
                const donnee = await response.data;
                localStorage.setItem('token', donnee.token);
            }
        }
        catch (error){
            console.error(error);
        }
    }
    
    return (
        <div className='FormulaireInfos'>
            <form onSubmit = {handleSubmit} >
                    <label htmlFor='username'>Username : </label>
                    <input type='text' id='username' name='username' value = {info.username} onChange={handleInputChange}/>
                    <label htmlFor='lastname'>Lastname : </label>
                    <input type='text' id='lastname' name='lastname' value = {info.lastname} readOnly/>
                    <label htmlFor='firstname'>Firstname : </label>
                    <input type='texte' id='firstname' name='firstname' value = {info.firstname} readOnly/>
                    <label htmlFor='birthdate'>Birthdate : </label>
                    <input type='email' id='email' name='email' value = {info.email} readOnly/>
                    <label htmlFor='password'>Mot de passe : </label>
                    <input type='password' id='password' name='password' value = {info.password} onChange={handleInputChange}/>
            </form>
        </div>
    )
}

export default Informations;
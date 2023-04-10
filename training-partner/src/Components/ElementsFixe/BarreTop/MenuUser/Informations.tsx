import axios from 'axios';
import { useEffect, useState } from 'react';
import './Informations.css';
import { User } from '../../../../Interfaces/User';

function Informations(){
    const [info ,setInfo] = useState<User>({ pseudo : '', nom : '', prenom : '', datedenaissance : '', email : '', message_mdp : '', reponse_message : '', motdepasse : ''});
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
                    <label htmlFor='pseudo'>Pseudo : </label>
                    <input type='text' id='pseudo' name='pseudo' value = {info.pseudo} onChange={handleInputChange}/>
                    <label htmlFor='nom'>Nom : </label>
                    <input type='text' id='nom' name='nom' value = {info.nom} readOnly/>
                    <label htmlFor='prenom'>Prénom : </label>
                    <input type='texte' id='prenom' name='prenom' value = {info.prenom} readOnly/>
                    <label htmlFor='email'>Email : </label>
                    <input type='email' id='email' name='email' value = {info.email} readOnly/>
                    <label htmlFor='motdepasse'>Mot de passe : </label>
                    <input type='password' id='motdepasse' name='motdepasse' value = {info.motdepasse} onChange={handleInputChange}/>
            </form>
        </div>
    )
}

export default Informations;
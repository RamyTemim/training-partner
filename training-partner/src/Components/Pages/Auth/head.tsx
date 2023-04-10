import { useState } from 'react';
import './Auth.css';

function Head(props : any){
    const [isCLicked, setIsClicked] = useState(false);
    const handleClick = () => {
        setIsClicked(!isCLicked);
    }

    const Auth =(nbr : number) => {props.onPageChange(nbr)}

    const signUp = ()=> {Auth(0); console.log("passe dans signUp")}
    const login =()=> {Auth(1);console.log("passe dans login")}
    const forgotPassword =()=> {Auth(2);console.log("passe dans forgotPassword")}

    const handleLogout = async() => {
        try {
        const reponse = await fetch ('/logout', {method : "POST"})
        const donnee = await reponse.text();
        console.log(donnee);//affiche déconnexion réussi dans la console
        }
        catch(error){
            console.error(error)
            alert("Une erreur est survenu lors de la déconnexion !")
        }
       
    }
    

    return ( 
        <div>
            <nav className="navigation" onClick={handleClick}>
                <h1>TrainingPartner</h1>
                <ul>
                    <li><button className="nav" onClick={()=>{signUp()}}>Inscription</button></li>
                    <li><button className="nav" onClick={()=>{login()}}>Connexion</button></li>
                    <li>
                        <form onSubmit={(event) => {event.preventDefault(); handleLogout();}}>
                            <button type="submit">Deconnexion</button>
                        </form>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Head;
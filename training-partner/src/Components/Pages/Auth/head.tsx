import react from 'react';
import './auth.css';

function Head(){
    return ( 
        <div>
            <nav className="navigation">
                <h1>TrainingPartner</h1>
                <ul>
                    <li><a href="/user/signUp">Inscription</a></li>
                    <li><a href="/user/login">Connexion</a></li>
                    <li>
                        <form action="/user/logout" method="post">
                            <button type="submit">Deconnexion</button>
                        </form>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Head;
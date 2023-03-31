import react from 'react';
import './auth.css';

function Head(){
    return ( 
        <div>
            <nav className="navigation">
                <h1>TrainingPartner</h1>
                <ul>
                    <li><button className="nav" onClick={() => {}}>Inscription</button></li>
                    <li><button className="nav" onClick={() => {}}>Connexion</button></li>
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
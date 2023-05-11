//Library
import {useState, useEffect} from 'react';
import Head from './head';
import PageSignUp from './signUp';
import PageLogin from './login';
import Accueil from '../Accueil/Acceuil';

//Components

function Auth() {
    const [SignUp, setSignUp] = useState(false);
    const [Login, setLogin] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    
    const setdeco = ()=> {
        setIsConnected(false);
    }
    const onClick = (page : number)=>{
        if (page === 0){
            setSignUp(true);setLogin(false);
        }
        if (page === 1){
            setLogin(true);setSignUp(false);
        }
        if (page === 2){
            setSignUp(false);setLogin(false);
        }
    }

    useEffect(() =>{
        if(isConnected){
            setLogin(false);
        }
    },[isConnected])
   
    return(
    <div>
        {!isConnected && <Head onPageChange = {onClick}/>}
        {SignUp && <PageSignUp />}
        {Login && <PageLogin onLogin = { () => setIsConnected(true) }/>}
        {isConnected && <Accueil deco = {setdeco}/>}

    </div>
 )
}

export default Auth;
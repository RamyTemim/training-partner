//Library
import React, {useState, useEffect} from 'react';
import Head from './head';
import PageSignUp from './signUp';
import PageLogin from './login';
import Accueil from '../Accueil/Accueil';

//Components

type AuthProps ={
    onLogin : () => void
}

function Auth(props : AuthProps) {
    const [SignUp, setSignUp] = useState(true);
    const [Login, setLogin] = useState(false);
    const [ForgotPassword, setForgotPassword] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
  
    const onClick = (page : number)=>{
        if (page === 0){
            setSignUp(true);setLogin(false);setForgotPassword(false);
        }
        if (page === 1){
            setLogin(true);setSignUp(false);setForgotPassword(false);
        }
        if (page === 2){
            setForgotPassword(true);setSignUp(false);setLogin(false);
        }
    }

    useEffect(() =>{
        if(isConnected){
            setLogin(false);
        }
    },[isConnected])
    //{isConnected && <Accueil />}

   
    return(
    <div>
        {!isConnected && <Head onPageChange ={onClick}/>}
        {SignUp && <PageSignUp/>}
        {Login && <PageLogin onLogin = { () => setIsConnected(true) }/>}
        {ForgotPassword && null }
    </div>
 )
}

export default Auth;
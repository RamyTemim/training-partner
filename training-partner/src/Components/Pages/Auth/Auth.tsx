//Library
import React, {useState, useEffect} from 'react';
import Head from './head';
import PageSignUp from './signUp';
import PageLogin from './login';

//Components

function Auth() {
    const [SignUp, setSignUp] = useState(true);
    const [Login, setLogin] = useState(false);
    const [ForgotPassword, setForgotPassword] = useState(false);
  
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
    
    return(
    <div className='App'>
        <Head onPageChange ={onClick}/>
        {SignUp && <PageSignUp/>}
        {Login && <PageLogin/>}
        {ForgotPassword && null }
    </div>
 );
}

export default Auth;
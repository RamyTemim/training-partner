//Library
import React, {useState, useEffect} from 'react';
import './App.css';

//Components


import Auth from '../Pages/Auth/Auth';
import Accueil from '../Pages/Accueil/Accueil';




function App() {    
  const [isConnected,setIsConnected] = useState(false);


  const handleLogin = () => {
    setIsConnected(true);
  }
  //{isConnected && <PageBattle />}

  return(
    <div className='App'>
      {!isConnected && <Auth onLogin={handleLogin} />}   
    </div>
  );
}

export default App;
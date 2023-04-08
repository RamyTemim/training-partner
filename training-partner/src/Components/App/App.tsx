//Library
import React, {useState, useEffect} from 'react';
import './App.css';

//Components

import Accueil from '../Pages/Accueil/Accueil';

function App() {    
  const [isConnected,setIsConnected] = useState(true);


  const handleLogin = () => {
    setIsConnected(true);
  }

  return(
    <div className='App'>
      {isConnected && <Accueil/>}
    </div>
  );
}
export default App;
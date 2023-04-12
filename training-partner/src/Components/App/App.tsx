//Library
import { useState } from 'react';
import Accueil from '../Pages/Accueil/Acceuil';
import Auth from '../Pages/Auth/Auth';


//Components


function App() { 
  const [isConnected,setIsConnected] = useState(false);


  const handleLogin = () => {
    setIsConnected(true);
  }

  return(
    <div className='App'>
      {!isConnected && <Accueil />}
    </div>
  );
}
export default App;
//Library
import { useState } from 'react';
import Auth from '../Pages/Auth/Auth';


//Components


function App() { 
  const [isConnected,setIsConnected] = useState(false);


  const handleLogin = () => {
    setIsConnected(true);
  }

  return(
    <div className='App'>
      {!isConnected && <Auth onLogin={handleLogin} />}
    </div>
  );
}
export default App;
//Library
import React, {useState} from 'react';
import './App.css';

//Components



import ChartCreate from '../Pages/ChartCreate/ChartCreate';
import ChartVisu from '../Pages/ChartVisu/ChartVisu';
import Header from '../ElementsFixe/BarreTop/head';
import TabBord from '../ElementsFixe/TableauDeBord/TabBord';
import PageLogin from '../Pages/Auth/login';
//import PageSignUp from '../Pages/Auth/signUp';
import Auth from '../Pages/Auth/Auth';


function App() {    

  return(
    <div className='App'>
      <Auth />
    </div>
  );
}

export default App;

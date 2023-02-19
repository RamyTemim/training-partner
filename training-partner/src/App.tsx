import './App.css';
import LifeCycle from './LifeCycle';
import React, { useEffect, useState } from "react";

function App() {

    useEffect(() => {
        console.log("[App] componentDidMount");
    },[]);

    useEffect(() => {
        console.log("[App] componentDidUpdate");
    })

    useEffect(() => {
      return ()  => {
          console.log("[App] composentWillUnmount");
      }
    },[]);

  return (
    <div className="App">
      <LifeCycle />
    </div>
  );
}

export default App;

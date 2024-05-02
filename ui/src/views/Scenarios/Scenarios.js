import React,  { useState, useEffect } from 'react';
import { fetchScenarios } from '../../services/scenarioService';

const Scenarios = () => {
  const [scenarios, setScenarios] = useState([]);

    useEffect(() => {
      fetchScenarios()
      .then(data => setScenarios(data.body))
      .catch(error => console.error('Failed to fetch scenarios:', error));
      }, []);

    return (
      <div>
        <h1>Scenarios Page</h1>
        <p>{scenarios ? <span>{scenarios}</span> : 'Loading...'}</p>
      </div>
    );
  }
  
  export default Scenarios;
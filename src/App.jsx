
import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'

/* import.meta.env.VITE_BACK_URL */

function App() {
  const [gods, setGods] = useState([]);

  const getAllGods = () => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/gods`)
      .then((response) => setGods(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllGods();
  }, [] );

  return (
    <>
      <h1>MythLog</h1>

      {gods.map((god) => {
          return (
            <div className="ProjectCard card" key={god.id} >
              
                <h3>{god.name}</h3>
                <img className="card-image" src={god.image} alt="" />
                <h4>{god.category}</h4>
                <p>{god.description}</p>
                <p>{god.attributes.stories}</p>
            </div>
          );
        })}
      
      {/* <p className="read-the-docs">
        
      </p> */}
    </>
  )
}

export default App

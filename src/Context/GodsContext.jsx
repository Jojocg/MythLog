/* import { createContext, useState, useEffect, useContext } from 'react';
import { fetchGods } from '../api/getGods';

// Crear el contexto
export const GodsContext = createContext();

export const GodsProvider = ({ children }) => {
  const [gods, setGods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar los dioses desde la API
  const setInitialGods = async () => {
    setLoading(true);
    try {
      const godsList = await fetchGods();
      setGods(godsList);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInitialGods();
  }, []);

  // Función para agregar un nuevo dios a la lista
  const addGod = (newGod) => {
    setGods((prevGods) => [...prevGods, newGod]);
  };

  // Función para actualizar un dios en la lista
  const updateGod = (updatedGod) => {
    setGods((prevGods) =>
      prevGods.map((god) => (god.id === updatedGod.id ? updatedGod : god))
    );
  };

  // Función para eliminar un dios de la lista
  const removeGodFromList = (godId) => {
    setGods((prevGods) => prevGods.filter((god) => god.id !== godId));
  };

  // Función para cargar los dioses desde un listado dado (para usar en otros casos)
  const loadGods = (godList) => {
    setGods(godList);
  };

  return (
    <GodsContext.Provider value={{ 
        gods, 
        loading, 
        error, 
        addGod,
        updateGod,
        removeGodFromList,
        loadGods 
    }}>
      {children}
    </GodsContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useGods = () => {
    return useContext(GodsContext);
}; */
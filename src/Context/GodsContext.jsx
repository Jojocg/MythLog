import { createContext, useState, useEffect } from 'react';
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

  return (
    <GodsContext.Provider value={{ gods, loading, error }}>
      {children}
    </GodsContext.Provider>
  );
};
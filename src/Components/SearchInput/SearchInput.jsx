import Fuse from "fuse.js";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GodsContext } from "../../Context/GodsContext";

export default function SearchInput() {
    const { gods, loading, error } = useContext(GodsContext); // Usamos el contexto
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Opciones de Fuse.js para búsqueda difusa
    const options = {
        keys: ['name'], // Solo buscar en el campo 'name'
        threshold: 0.2, // Cuanto más bajo el umbral, más estricta es la búsqueda
    };

    const fuse = new Fuse(gods, options);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

        if (e.target.value) {
            // Realizar la búsqueda con Fuse.js
            const results = fuse.search(e.target.value).map(result => result.item);
            navigate('/gods', { state: { searchResults: results } }); // Pasamos los resultados a la página de dioses
        } else {
            // Si no hay término de búsqueda, se envian todos los dioses
            navigate('/gods', { state: { searchResults: gods } });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading gods: {error.message}</p>;

    return (
        <div className="form-control navbar-end mr-8">
            <input 
                type="text" 
                placeholder="Search" 
                className="input input-bordered w-24 md:w-auto"
                value={searchTerm}
                onChange={handleSearch} />
        </div>
    )
}

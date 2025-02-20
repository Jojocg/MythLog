import Fuse from "fuse.js";

import { useState } from "react";

export default function SearchInput({ gods, onSearchResults }) {
    const [searchTerm, setSearchTerm] = useState('');

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
            onSearchResults(results); // Actualizamos los resultados filtrados
        } else {
           // Si no hay término de búsqueda, mostramos todos los dioses
           onSearchResults(gods);
        }
    };

    return (
        <div className="form-control my-8 ml-16">
            <input 
                type="text" 
                placeholder="Search" 
                className="input input-bordered w-24 md:w-auto"
                value={searchTerm}
                onChange={handleSearch} />
        </div>
    )
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchGods } from "../../api/getGods"

import SearchInput from "../../Components/SearchInput/SearchInput";

export default function AllGodsPage() {
    const [gods, setGods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filteredGods, setFilteredGods] = useState([]); // Estado para los dioses filtrados

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;

    const setInitialGods = async () => {
        setLoading(true)
        setError(null)
        try {
            const godsList = await fetchGods();
            setGods(godsList);
            setFilteredGods(godsList); // Al cargar los dioses, mostramos todos inicialmente
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        setInitialGods();
    }, []);
    
    // Función para manejar la actualización de los resultados de búsqueda
    const handleSearchResults = (results) => {
        setFilteredGods(results); // Actualizamos los dioses filtrados con los resultados
    };

    // Lógica para mostrar solo 'cardsPerPage' cards por página
    const indexOfLastCard = currentPage * cardsPerPage; // Última card de la página
    const indexOfFirstCard = indexOfLastCard - cardsPerPage; // Primera card de la página
    const currentGods = filteredGods.slice(indexOfFirstCard, indexOfLastCard); // Cards que se mostrarán en la página actual

    // Cambiar de página
    const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

    // Número total de páginas
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredGods.length / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (loading) return (
        <div className="flex justify-center my-24">
            <p className="text-xl">Loading...</p><span className="loading loading-ring loading-lg"></span>
        </div>
    )

    return (
        <div className="mt-24">
             <SearchInput gods={gods} onSearchResults={handleSearchResults} /> {/* Pasamos la función de resultados de búsqueda */}
            <div className="flex flex-wrap gap-8 justify-around">
                {currentGods && !loading && !error &&
                    currentGods.map((god) => {
                        return (
                            <div className="card bg-base-100 w-96 shadow-xl transform transition-transform duration-300 ease-in-out hover:scale-102" key={god.id}>
                                <figure className="h-80 relative overflow-hidden">
                                    <img
                                        className="object-cover w-full h-full object-[center_4%] transition-transform duration-300 ease-in-out hover:scale-110"
                                        src={god.image}
                                        alt={`${god.name} image`} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{god.name}</h2>
                                    <p>{god.description}</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/gods/${god.id}`}><button className="btn">See more</button></Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                {error && <p>{error.message}</p>}
            </div>

            {/* Paginación */}
            <div className="join flex justify-center my-4">
                {pageNumbers.map((number) => (
                    <input
                        key={number}
                        onClick={() => handlePaginate(number)}
                        className="join-item btn btn-square"
                        type="radio"
                        name="options"
                        aria-label={`${number}`}
                        defaultChecked={currentPage === number}
                    />
                ))}
            </div>
        </div>
    )
}

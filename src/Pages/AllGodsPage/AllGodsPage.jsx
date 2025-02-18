import { useEffect, useState } from "react";
/* import Link from "daisyui/components/link"; */
import { Link } from "react-router-dom";

import { fetchGods } from "../../api/getGods";

export default function AllGodsPage() {
    const [gods, setGods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const setInitialGods = async () => {
        setLoading(true)
        setError(null)
        try {
            const gods = await fetchGods()
            setGods(gods)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        setInitialGods();
    }, []);

    return (
        <div className="flex flex-wrap gap-8 justify-around">
            {loading ? "Loading..." : ""}
            {gods && !loading && !error &&
                gods.map((god) => {
                    return (
                        <div className="card bg-base-100 w-96 shadow-xl" key={god.id}>
                            <figure className="h-80 relative">
                                <img
                                    className="object-cover w-full h-full object-[center_4%]"
                                    src={god.image}
                                    alt="deity image" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{god.name}</h2>
                                <p>{god.description}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/gods/${god.id}`}><button className="btn btn-info">See more</button></Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            {error && <p>{error.message}</p>}
        </div>
    )
}

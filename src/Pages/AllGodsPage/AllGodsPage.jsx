import axios from "axios";
import { useEffect, useState } from "react";

export default function AllGodsPage() {
    const [gods, setGods] = useState([]);

    const getAllGods = () => {
        axios
            .get(`${import.meta.env.VITE_BACK_URL}/gods`)
            .then((response) => setGods(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllGods();
    }, []);

    return (
        <div className="flex flex-wrap gap-8 justify-around mt-24">
            {gods &&
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
                                    <button className="btn btn-info">See more</button>
                                </div>
                            </div>
                        </div>
                );
            })}
        </div>
    )
}

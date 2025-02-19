import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchOneGod } from "../../api/getOneGod"
import { removeOneGod } from "../../api/deleteOneGod";


export default function GodDetailsPage() {
    const [god, setGod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // React Router hook for navigation. We use it for the back button. You can leave this as it is.
    const navigate = useNavigate();

    const { godId } = useParams();

    const setOneGodDetails = async () => {
        setLoading(true)
        setError(null)
        try {
            const godData = await fetchOneGod(godId)
            setGod(godData)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        setOneGodDetails();
    }, [godId]);

    const handleDeleteGod = async () => {
        setLoading(true)
        setError(null)
        try {
            /* const result = */ await removeOneGod(godId)
            /* setMessage(result) */ //Faltaría implementar un mensaje de éxito
            navigate("/gods");
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    };


    if (loading) return (
        <div className="flex justify-center my-24">
            <p className="text-xl">Loading...</p><span className="loading loading-ring loading-lg"></span>
        </div>
    )
    if (error) return <p>{error.message}</p>;

    return (
        <div /* className="card bg-base-100 shadow-xl w-96 mx-auto mt-8" */>
            {god && !loading && !error && (
                <div className="container mx-auto mt-8 p-6 flex gap-8">
                    {/* Imagen del dios */}
                    <div className="w-1/3">
                        <figure className="h-full relative">
                            <img
                                className="object-cover w-full h-full rounded-lg"
                                src={god.image}
                                alt={`${god.name} image`}
                            />
                        </figure>
                    </div>

                    {/* Información del dios */}
                    <div className="w-2/3">
                        <div>
                            <button className="btn btn-secondary w-24" onClick={handleDeleteGod}>
                                Delete
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3.5"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-semibold">{god.name}</h2>
                            <p className="text-lg">{god.description}</p>
                            <p className="text-sm text-gray-600">{god.category}</p>
                        </div>

                        {/* Atributos */}
                        <div className="space-y-4 mb-8">
                            <h3 className="text-2xl font-semibold">Attributes</h3>
                            <div className="flex flex-wrap gap-4">
                                <div className="card w-1/2 p-4 shadow-xl rounded-lg">
                                    <h4 className="font-semibold">Origin:</h4>
                                    <p>{god.attributes.origin}</p>
                                </div>

                                <div className="card w-1/2 p-4 shadow-xl rounded-lg">
                                    <h4 className="font-semibold">Abode:</h4>
                                    <p>{god.attributes.abode}</p>
                                </div>
                            </div>

                            {/* Symbols */}
                            <div className="card p-4 shadow-xl rounded-lg">
                                <h4 className="font-semibold">Symbols:</h4>
                                <ul className="list-none pl-6">
                                    {god.attributes.symbols.map((symbol, index) => (
                                        <li key={index}>{symbol}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Powers */}
                            <div className="card p-4 shadow-xl rounded-lg">
                                <h4 className="font-semibold">Powers:</h4>
                                <ul className="list-none pl-6">
                                    {god.attributes.powers.map((power, index) => (
                                        <li key={index}>{power}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Family */}
                        <div className="space-y-4 mb-8">
                            <h3 className="text-2xl font-semibold">Family</h3>
                            <div className="flex flex-wrap gap-4">
                                <div className="card w-1/2 p-4 shadow-xl rounded-lg">
                                    <h4 className="font-semibold">Parents:</h4>
                                    <ul className="list-none pl-6">
                                        {god.attributes.family.parents.map((parent, index) => (
                                            <li key={index}>{parent}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="card w-1/2 p-4 shadow-xl rounded-lg">
                                    <h4 className="font-semibold">Siblings:</h4>
                                    <ul className="list-none pl-6">
                                        {god.attributes.family.siblings.map((sibling, index) => (
                                            <li key={index}>{sibling}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="card w-1/2 p-4 shadow-xl rounded-lg">
                                    <h4 className="font-semibold">Spouse:</h4>
                                    <ul className="list-none pl-6">
                                        {god.attributes.family.spouse.map((spouse, index) => (
                                            <li key={index}>{spouse}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Stories */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-semibold">Stories</h3>
                            <div className="card p-4 shadow-xl rounded-lg">
                                <ul className="list-none pl-6">
                                    {god.attributes.stories.map((story, index) => (
                                        <li key={index}>{story}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                className="btn btn-active btn-neutral btn-wide mt-8"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

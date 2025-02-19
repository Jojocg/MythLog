import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchOneGod } from "../../api/getOneGod";
import { updateGod } from "../../api/putOneGod";
import Form from "../../Components/Form/Form";

export default function EditGodPage() {
    const navigate = useNavigate();
    const { godId } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        attributes: {
            origin: "",
            symbols: [""],
            abode: "",
            powers: [""],
            family: {
                parents: [""],
                siblings: [""],
                spouse: [""],
            },
            stories: [""],
        },
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getGodData = async () => {
        setLoading(true)
        setError(null)
        try {
            const godData = await fetchOneGod(godId)
            setFormData(godData)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getGodData();
    }, [godId]);


    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            name: formData.name,
            description: formData.description,
            category: formData.category,
            attributes: formData.attributes,
            image: formData.image,
        };

        try {
            setLoading(true)
            await updateGod(godId, requestBody)
            navigate(`/gods/${godId}`)
        } catch (error) {
            setError(error)
            console.log("Error:", error);
        } finally {
            setLoading(false)
        }

    };

    return (
        <div className="max-w-3xl mx-auto mt-24 p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-center mb-8">Update this Deity</h3>

            {/* Info en casos de loading o error */}
            {loading &&
                <div className="flex justify-center my-24">
                    <p className="text-xl">Loading...</p><span className="loading loading-ring loading-lg"></span>
                </div>}

            {error &&
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>}

            {/* Formulario */}
            <Form formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
        </div>
    )
}

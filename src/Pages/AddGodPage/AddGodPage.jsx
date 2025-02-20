import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createNewGod } from "../../api/postOneGod";
import Form from "../../Components/Form/Form";

export default function AddGodPage() {
  const navigate = useNavigate();

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

    /* axios
      .post(`${BACK_API}/gods`, requestBody)
      .then((response) => {
        console.log("Data submitted:", response.data); //SUSTITUIR por un modal que avise que se ha creado con éxito
        // Después de la respuesta exitosa, redirigir o hacer alguna otra acción
        navigate("/gods");
      })
      .catch((error) => console.log("Error:", error)); */

    try {
      setLoading(true)
      await createNewGod(requestBody)
      navigate("/gods")
    } catch (error) {
      setError(error)
      console.log("Error:", error);
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="max-w-3xl mx-auto my-24 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex">
        <button
          className="btn btn-outline btn-ghost mt-2 ml-2"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>

      <h3 className="text-2xl font-semibold text-center mb-8">Add a new Deity</h3>

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
  );
}


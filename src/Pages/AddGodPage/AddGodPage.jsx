import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createNewGod } from "../../api/postOneGod";

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

  // Manejo de cambios en los inputs generales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manejo de cambios en los inputs de atributos
  const handleAttributeChange = (e, index, field) => {
    const { value } = e.target;

    setFormData((prevState) => {
      const newAttributes = { ...prevState.attributes };

      // Si el campo es 'family' (parents, siblings, spouse), manejamos con la misma lógica
      if (field === "parents" || field === "siblings" || field === "spouse") {
        const newFamily = { ...newAttributes.family };
        newFamily[field][index] = value;
        newAttributes.family = newFamily;
      } else {
        // Asegurémonos de que `field` sea siempre un array antes de acceder a un índice
        if (Array.isArray(newAttributes[field])) {
          newAttributes[field][index] = value;
        } else {
          // Si no es un array, es el caso de origin y abode que son strings
          newAttributes[field] = value;
        }
      }

      return { ...prevState, attributes: newAttributes };
    });
  };

  // Función para añadir nuevos inputs a los arrays
  const addInputField = (field) => {
    setFormData((prevState) => {
      //Deep copy para poder llegar a las propiedades anidadas en family, y así conseguir que no se duplique el nuevo input
      const newAttributes = JSON.parse(JSON.stringify(prevState.attributes));

      // Verificamos si el campo es parte de `family`, y si es así, lo actualizamos dentro de `family`
      if (field === "parents" || field === "siblings") {
        if (!Array.isArray(newAttributes.family[field])) {
          newAttributes.family[field] = [];
        }
        newAttributes.family[field] = [...newAttributes.family[field], ""]; // Añadir un nuevo valor vacío al array
      } else {
        // Para otros campos como `symbols`, `powers` o `stories`
        if (!Array.isArray(newAttributes[field])) {
          newAttributes[field] = [];
        }
        newAttributes[field] = [...newAttributes[field], ""]; // Añadir un nuevo valor vacío al array
      }

      return { ...prevState, attributes: newAttributes };
    });
  };

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
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-white shadow-lg rounded-lg">
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
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center w-full">
        {/* Campos básicos */}
        <label className="input input-bordered flex items-center gap-2">Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Deity Name"
            className="grow"
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-6/12">
          <div className="label mb-2">
            <span className="label-text">Description:</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-full h-24" placeholder="Deity Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label mb-2">
            <span className="label-text">Category:</span>
          </div>
          <select name="category" value={formData.category} className="select select-bordered" onChange={handleChange}>
            <option disabled selected value="">Pick one category</option>
            <option value="God">God</option>
            <option value="Goddess">Goddess</option>
            <option value="Gods">Gods</option>
          </select>
        </label>


        {/* Atributos (symbols, powers, etc.) */}
        <label className="input input-bordered flex items-center gap-2">Origin:
          <input
            type="text"
            name="origin"
            value={formData.attributes.origin}
            className="grow"
            onChange={(e) => handleAttributeChange(e, 0, "origin")}
            placeholder="Son of.../Self-formed at..."
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">Symbols:
          {formData.attributes.symbols.map((symbol, index) => (
            <div key={`symbol-${index}`} className="input-group">
              <input
                type="text"
                value={symbol}
                className="grow"
                onChange={(e) => handleAttributeChange(e, index, "symbols")}
                placeholder={`Symbol ${index + 1}`}
              />
            </div>
          ))}
        </label>
        <button
          className="btn btn-outline btn-accent"
          type="button"
          onClick={() => addInputField("symbols")}
        >
          Add Symbol
        </button>

        <label className="input input-bordered flex items-center gap-2">Abode:
          <input
            type="text"
            name="abode"
            value={formData.attributes.abode}
            className="grow"
            onChange={(e) => handleAttributeChange(e, 0, "abode")}
            placeholder="Deity Abode"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">Powers:
          {formData.attributes.powers.map((power, index) => (
            <div key={`power-${index}`} className="input-group">
              <input
                type="text"
                value={power}
                className="grow"
                onChange={(e) => handleAttributeChange(e, index, "powers")}
                placeholder={`Power ${index + 1}`}
              />
            </div>
          ))}
        </label>
        <button
          className="btn btn-outline btn-accent"
          type="button"
          onClick={() => addInputField("powers")}
        >
          Add Power
        </button>

        {/* Family */}
        <label className="input input-bordered flex items-center gap-2">Parent/s:
          {formData.attributes.family.parents.map((parent, index) => (
            <div key={`parent-${index}`} className="input-group">
              <input
                type="text"
                value={parent}
                className="grow"
                onChange={(e) => handleAttributeChange(e, index, "parents")}
                placeholder={`Parent ${index + 1}`}
              />
            </div>
          ))}
        </label>
        <button
          className="btn btn-outline btn-accent"
          type="button"
          onClick={() => addInputField("parents")}
        >
          Add Parent
        </button>

        <label className="input input-bordered flex items-center gap-2">Siblings:
          {formData.attributes.family.siblings.map((sibling, index) => (
            <div key={`sibling-${index}`} className="input-group">
              <input
                type="text"
                value={sibling}
                className="grow"
                onChange={(e) => handleAttributeChange(e, index, "siblings")}
                placeholder={`Sibling ${index + 1}`}
              />
            </div>
          ))}
        </label>
        <button
          className="btn btn-outline btn-accent"
          type="button"
          onClick={() => addInputField("siblings")}
        >
          Add Sibling
        </button>

        <label className="input input-bordered flex items-center gap-2">Spouse:
          <input
            type="text"
            name="spouse"
            value={formData.attributes.family.spouse[0]}
            className="grow"
            onChange={(e) => handleAttributeChange(e, 0, "spouse")}
            placeholder="Spouse"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">Stories:
          {formData.attributes.stories.map((story, index) => (
            <div key={`story-${index}`} className="input-group">
              <input
                type="text"
                value={story}
                className="grow"
                onChange={(e) => handleAttributeChange(e, index, "stories")}
                placeholder={`Story ${index + 1}`}
              />
            </div>
          ))}
        </label>
        <button
          className="btn btn-outline btn-accent"
          type="button"
          onClick={() => addInputField("stories")}
        >
          Add Story
        </button>

        <label className="input input-bordered flex items-center gap-2">Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            className="grow"
            onChange={handleChange}
          />
        </label>

        <button className="btn btn-neutral" type="submit">Submit</button>
      </form>
    </div>
  );
}


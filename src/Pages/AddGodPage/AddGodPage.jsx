import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BACK_API } from "../../api/index"

export default function AddGodPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    attributes: {
      origin: "",
      symbols: [""], // Solo un input por defecto
      abode: "",
      powers: [""], // Solo un input por defecto
      family: {
        parents: [""], 
        siblings: [""], // Solo un input por defecto
        spouse: [""],
      },
      stories: [""],
    },
    image: "",
  });

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

       // Asegurémonos de que `field` sea siempre un array antes de acceder a un índice
      if (Array.isArray(newAttributes[field])) {
        newAttributes[field][index] = value;
      } else {
        // Si no es un array, convertimos en array (esto puede pasar si accidentalmente se guarda como string)
        newAttributes[field] = [value];
      }

      // Si el campo es 'family' (parents, siblings, spouse), manejamos con la misma lógica
      if (field === "parents" || field === "siblings" || field === "spouse") {
        const newFamily = { ...newAttributes.family };
        newFamily[field][index] = value;
        newAttributes.family = newFamily;
      }

      return { ...prevState, attributes: newAttributes };
    });
  };

  // Función para añadir nuevos inputs a los arrays
  const addInputField = (field) => {
    setFormData((prevState) => {
      const newAttributes = { ...prevState.attributes };

      // Asegurémonos de que siempre estamos trabajando con un array
      if (!Array.isArray(newAttributes[field])) {
        newAttributes[field] = [];
      }
      
      newAttributes[field] = [...newAttributes[field], ""]; // Añadir un nuevo valor vacío al array

      return { ...prevState, attributes: newAttributes };
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      attributes: formData.attributes,
      image: formData.image,
    };

    axios
      .post(`${BACK_API}/gods`, requestBody)
      .then((response) => {
        console.log("Data submitted:", response.data);
        // Después de la respuesta exitosa, redirigir o hacer alguna otra acción
        navigate("/gods");
      })
      .catch((error) => console.log("Error:", error));
  };

  return (
    <div /* className="CreateDeityPage" */>
      <h3>Add New Deity</h3>

      <form onSubmit={handleSubmit}>
        {/* Campos básicos */}
        <label className="input input-bordered flex items-center gap-2">Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Type here"
            className="grow" //SUSTITUIR TODOS POR GROW COMO ESTE
            onChange={handleChange}
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description:</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24" placeholder="Deity Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        {/* <label className="input input-bordered flex items-center gap-2">Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label> */}

        {/* Atributos (symbols, powers, etc.) */}
        <label className="input input-bordered flex items-center gap-2">Origin:
          <input
            type="text"
            name="origin"
            value={formData.attributes.origin}
            onChange={(e) => handleAttributeChange(e, 0, "origin")}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">Symbols:
          {formData.attributes.symbols.map((symbol, index) => (
            <div key={`symbol-${index}`} className="input-group">
              <input
                type="text"
                value={symbol}
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
            onChange={(e) => handleAttributeChange(e, 0, "abode")}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">Powers:
          {formData.attributes.powers.map((power, index) => (
            <div key={`power-${index}`} className="input-group">
              <input
                type="text"
                value={power}
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
            onChange={handleChange}
          />
        </label>

        <button className="btn btn-neutral" type="submit">Submit</button>
      </form>
    </div>
  );
}


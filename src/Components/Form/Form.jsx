import { useNavigate } from "react-router-dom";

export default function Form({ formData, setFormData, handleSubmit }) {
    
    const navigate = useNavigate();

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


    return (
        <>
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
                        <option disabled defaultValue={""} value="">Pick one category</option>
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

                <div className="flex justify-between m-4 w-xs">
                    <button className="btn btn-accent btn-lg" type="submit">Submit</button>
                    <button
                        className="btn btn-outline btn-ghost btn-lg"
                        type="button"
                        onClick={(e) => {
                            // Esto previene el submit del formulario
                            e.preventDefault();
                            navigate(-1);
                        }}
                    >
                        Back
                    </button>
                </div>
            </form>
        </>
    )
}

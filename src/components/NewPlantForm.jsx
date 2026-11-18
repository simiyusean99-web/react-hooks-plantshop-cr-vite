import React, { useState } from "react";

// Controlled form that creates a new plant on the backend
function NewPlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  // Update the matching field as the user types (uses the input's name attribute)
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // POST the new plant, then pass the saved plant up to PlantPage
  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        image: formData.image,
        price: formData.price, // store price as a number
      }),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onAddPlant(newPlant);
        setFormData({ name: "", image: "", price: "" }); // clear the form
      })
      .catch((error) => console.error("Failed to add plant:", error));
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

// Parent component that owns the shared state: the plant list and search text
function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch all plants once, when the page first loads
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Failed to fetch plants:", error));
  }, []); // empty dependency array = run only on mount

  // Add a newly created plant (returned by the server, so it has an id) to state
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // Case-insensitive name match; an empty search matches every plant,
  // so clearing the search box shows the full list again
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search search={search} onSearchChange={setSearch} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
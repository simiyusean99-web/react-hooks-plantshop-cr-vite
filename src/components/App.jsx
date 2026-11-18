import React from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

// Root component: renders the site header and the main plant page
function App() {
  return (
    <div className="app">
      <Header />
      <PlantPage />
    </div>
  );
}

export default App;
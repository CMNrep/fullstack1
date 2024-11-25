import React from "react";
import { Routes, Route } from "react-router-dom";
import CardsAtalho from "./components/CardsAtalho/CardsAtalho";
import CadAssociado from "./components/CadAssociado";
import ListarAssociados from "./components/ListarAssociados";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CardsAtalho />} />
      <Route path="/CadAssociados" element={<CadAssociado />} />
      <Route path="/ListarAssociados" element={<ListarAssociados />} />
      <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
    </Routes>
  );
}

export default App;

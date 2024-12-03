import React from "react";
import { Routes, Route } from "react-router-dom";
import CardsAtalho from "./components/CardsAtalho/CardsAtalho";
import FormAssociados from "./components/associados";
import ListarAssociados from "./components/ListarAssociados";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CardsAtalho />} />
      <Route path="/associados/:cpf?" element={<FormAssociados />} />
      <Route path="/ListarAssociados" element={<ListarAssociados />} />
      <Route path="*" element={<h1>Página não encontrada (404)</h1>} />
    </Routes>
  );
}

export default App;

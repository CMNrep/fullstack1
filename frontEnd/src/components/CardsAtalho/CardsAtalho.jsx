import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import NavBar from "../Nav"; // Supondo que o componente NavBar esteja no mesmo diretório

export default function CardsAtalho() {
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Row className="justify-content-center ">
          <h1 className="text-center mb-4 d-none d-sm-block">
            Atalhos
          </h1>
          <h2 className="text-center mb-4 d-block d-sm-none">
            Atalhos
          </h2>
        </Row>
        <div className="cards">
          <div className="card">
            <Link to="/campanha">
              <h3>Cadastrar Campanha</h3>
            </Link>
          </div>

          <div className="card">
            <Link to="/associados">
              <h3>Cadastrar Associado</h3>
            </Link>
          </div>

          <div className="card">
            <h3>Cadastrar Doação</h3>
          </div>

          <div className="card">
            <Link to="/campanhas">
              <h3>Campanhas Cadastradas</h3>
            </Link>
          </div>

          <div className="card">
            <Link to="/ListarAssociados">
              <h3>Consultar Associados</h3>
            </Link>
          </div>

          <div className="card">
            <h3>Cadastrar Doação</h3>
          </div>

          <div className="card">
            <h3>Cadastrar Produtos</h3>
          </div>
        </div>
      </Container>
    </>
  );
}

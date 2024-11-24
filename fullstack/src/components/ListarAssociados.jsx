import React, { useState, useEffect } from "react";
import NavBar from "./Nav";
import { Container, Table, Button } from "react-bootstrap";

function ListarAssociados() {
  const [associados, setAssociados] = useState([]);

  // Função para carregar os dados do LocalStorage
  const carregarAssociados = () => {
    const associadosSalvos = JSON.parse(localStorage.getItem("associados")) || [];
    setAssociados(associadosSalvos);
  };

  // Função para excluir um associado
  const excluirAssociado = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este associado?")) {
      const novosAssociados = [...associados];
      novosAssociados.splice(index, 1); // Remove o associado da lista
      setAssociados(novosAssociados); // Atualiza o estado
      localStorage.setItem("associados", JSON.stringify(novosAssociados)); // Atualiza o LocalStorage
    }
  };

  // Carregar os associados ao montar o componente
  useEffect(() => {
    carregarAssociados();
  }, []);

  return (
    <>
      <NavBar Title="Listar  Associados" />
      <Container className="mt-4">
        <h3 className="text-center mb-4">Associados Cadastrados</h3>
        {associados.length === 0 ? (
          <p className="text-center">Nenhum associado cadastrado.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {associados.map((associado, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={associado.foto || "https://via.placeholder.com/50"}
                      alt="Foto do associado"
                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
                    />
                  </td>
                  <td>{associado.nome}</td>
                  <td>{associado.email}</td>
                  <td>{associado.telefone}</td>
                  <td>{associado.status}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => excluirAssociado(index)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}

export default ListarAssociados;

import React, { useState, useEffect } from "react";
import NavBar from "./Nav";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

function ListarAssociados() {
  const [associados, setAssociados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Função para carregar os dados dos associados do backend
   */
  const carregarAssociados = async () => {
    setIsLoading(true); // Ativa estado de carregamento
    try {
      const response = await axios.get("http://localhost:3000/associados");
      setAssociados(response.data); // Define os associados retornados pela API
    } catch (error) {
      console.error("Erro ao carregar associados:", error);
      alert("Erro ao carregar a lista de associados. Tente novamente.");
    } finally {
      setIsLoading(false); // Finaliza o estado de carregamento
    }
  };

  /**
   * Função para excluir um associado do backend
   * @param {string} cpf - CPF do associado a ser excluído
   */
  const excluirAssociado = async (cpf) => {
    if (window.confirm("Tem certeza que deseja excluir este associado?")) {
      try {
        await axios.delete(`http://localhost:3000/associados/${cpf}`);
        alert("Associado excluído com sucesso!");
        carregarAssociados(); // Recarrega a lista de associados
      } catch (error) {
        console.error("Erro ao excluir associado:", error);
        alert("Erro ao excluir associado. Tente novamente.");
      }
    }
  };

  /**
   * Função para formatar datas no padrão brasileiro (dd/mm/yyyy)
   * @param {string} data - Data no formato ISO (yyyy-mm-dd)
   * @returns {string} - Data formatada
   */
  const formatarData = (data) => {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  /**
   * Carregar os associados ao montar o componente
   */
  useEffect(() => {
    carregarAssociados();
  }, []);

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <h3 className="text-center mb-4">Associados Cadastrados</h3>
        {isLoading ? (
          <p className="text-center">Carregando...</p>
        ) : associados.length === 0 ? (
          <p className="text-center">Nenhum associado cadastrado.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Data de Nascimento</th>
                <th>Data de Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {associados.map((associado) => (
                <tr key={associado.cpf}>
                  <td>
                    <img
                      src={associado.foto || "https://via.placeholder.com/50"}
                      alt="Foto do associado"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "10%",
                      }}
                    />
                  </td>
                  <td>{associado.nome}</td>
                  <td>{associado.cpf}</td>
                  <td>{associado.email}</td>
                  <td>{associado.telefone}</td>
                  <td>{associado.status}</td>
                  <td>{formatarData(associado.dataNascimento)}</td>
                  <td>{formatarData(associado.dataCadastro) || "N/A"}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => excluirAssociado(associado.cpf)}
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

import React, { useState, useEffect } from "react";
import NavBar from "./Nav";
import { Container, Table, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function ListarAssociados() {
  const [associados, setAssociados] = useState([]);

  const navigate = useNavigate();

  const { cpf } = useParams();

  const fetchAssociado =  (cpf) => {
    fetch(`http://localhost:3000/associados/${cpf}`)
    .then((res) => res.json()).then((json) => {
      setAssociados(json.data || [])}).catch ((err) => console.log(err))
  };

  const handleDelete = (cpf) => {
    if (window.confirm("Tem certeza que deseja excluir o associado?")) {
      fetch(`http://localhost:3000/associados/${cpf}`, {
        method: "DELETE",
      }).then(() => {
        setAssociados(associados.filter((associado) => associado.cpf !== cpf));
      }).catch((err) => console.log(err));
    }
  }


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
    fetchAssociado();
  }, []);

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <h3 className="text-center mb-4">Associados Cadastrados</h3>
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
                  <td>{formatarData(associado.dataNascimento) || "N/A"}</td>
                  <td>{formatarData(associado.dataCadastro) || "N/A"}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => navigate(`/associados/${associado.cpf}`)}
                    >
                      Excluir
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleDelete(associado.cpf)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
      </Container>
    </>
  );
}

export default ListarAssociados;

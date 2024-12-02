import React, { useState, useEffect } from "react";
import NavBar from "./Nav";
import { Container, Table, Button, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function ListarAssociados() {
  const [associados, setAssociados] = useState([]);
  const [cpfBusca, setCpfBusca] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { cpf } = useParams();
  
  const navigate = useNavigate();
  

    /**
   * Função para buscar associados.
   * Se `cpf` for fornecido, busca apenas um associado; caso contrário, busca todos.
   */
    const fetchAssociado = (cpf = "") => {
      setIsLoading(true);
      const url = cpf
        ? `http://localhost:3000/associados/${cpf}`
        : "http://localhost:3000/associados";
  
      fetch(url, { method: "GET" })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar associados");
          return res.json();
        })
        .then((json) => setAssociados(json.data || []))
        .catch((err) => {
          console.error(err);
          alert("Erro ao buscar associados. Tente novamente.");
        })
        .finally(() => setIsLoading(false));
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
    const dataFormatada = data.slice(0, 10).split("T")[0]
    const [ano, mes, dia] = dataFormatada.split("-");
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
          <Row className="justify-content-center mb-2">
            <input
              className="form-control w-25"
              type="text"
              placeholder="Buscar por CPF"
              value={cpfBusca}
              onChange={(e) => setCpfBusca(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchAssociado(cpfBusca)}
            />
          </Row>
          <Row className="justify-content-center">
          {isLoading ? (
            <p>Carregando...</p>
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
                {associados.length > 0 ? (
                  associados.map((associado) => (
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
                      <td>{associado.email || "Não informado"}</td>
                      <td>{associado.telefone || "Não informado"}</td>
                      <td>{associado.status || "N/A"}</td>
                      <td>{formatarData(associado.dataNascimento)}</td>
                      <td>{formatarData(associado.dataCadastro)}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-1"
                          onClick={() => navigate(`/associados/${associado.cpf}`) && console.log("CPF enviado para edição:", associado.cpf)} 
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(associado.cpf)}
                        >
                          Excluir
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      Nenhum associado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Row>
      </Container>
    </>
  );
}

export default ListarAssociados;

import React, { useState, useEffect } from "react";
import NavBar from "./Nav";
import { Form, Image, Container, Table, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import addAssociado from "../assets/Icons/addAssociadoIcon.svg";


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
      })
      .finally(() => setIsLoading(false));
  };

  const handleDelete = (cpf) => {
    if (window.confirm("Tem certeza que deseja excluir o associado?")) {
      fetch(`http://localhost:3000/associados/${cpf}`, {
        method: "DELETE",
      })
        .then(() => {
          setAssociados(
            associados.filter((associado) => associado.cpf !== cpf)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchAssociadoStatus = (status = "%") => {
    setIsLoading(true);
    setAssociados([]);
    const url = `http://localhost:3000/associados/${status}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar associados.");
        return res.json();
      })
      .then((json) => setAssociados(json.data || []))
      .catch((err) => {
        console.error(err);
        alert(err.message || "Erro ao buscar associados.");
      })
      .finally(() => setIsLoading(false));
  };

  /**
   * Função para formatar datas no padrão brasileiro (dd/mm/yyyy)
   * @param {string} data - Data no formato ISO (yyyy-mm-dd)
   * @returns {string} - Data formatada
   */
  const formatarData = (data) => {
    if (!data) return "";
    const dataFormatada = data.slice(0, 10).split("T")[0];
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
          <Col className="col-5">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar por CPF nao funciona ainda"
              value={cpfBusca}
              onChange={(e) => setCpfBusca(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && cpfBusca.trim() !== "") {
                  fetchAssociado(cpfBusca.trim());
                }
              }}
            />
          </Col>
          <Col className="col-3">
            <Button
              variant="primary"
              className="ms-2"
              onClick={() => {
                if (cpfBusca.trim() !== "") {
                  fetchAssociado(cpfBusca.trim());
                }
              }}
            >
              Buscar
            </Button>
          </Col>
          <Col className="col-2">
            <Row className="justify-content-center align-items-center">
              <Col className="col-3">
                <Form.Label>Status:</Form.Label>
              </Col>
              <Col className="col-9">
                <Form.Select onChange={(e) => fetchAssociadoStatus(e.target.value)}>
                  <option value="">Todos</option>
                  <option value="Ativo">Ativos</option>
                  <option value="Inativo">Inativos</option>
                </Form.Select>
              </Col>
            </Row>
          </Col>
          <Col className="col-1 ms-auto">
              <Image src={addAssociado} alt="Adicionar Associado" roundedCircle style={{ maxHeight: "42px", padding: "2px", cursor: "pointer"}}/>
          </Col>
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
                          src={
                            associado.foto || "https://via.placeholder.com/50"
                          }
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
                          onClick={() =>
                            navigate(`/associados/${associado.cpf}`) &&
                            console.log(
                              "CPF enviado para edição:",
                              associado.cpf
                            )
                          }
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

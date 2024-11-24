import React, { useState } from "react";
import NavBar from "./Nav";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import InputMask from "react-input-mask";

function CadAssociado() {
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
    status: "Ativo",
    dataNascimento: "",
    foto: "",
  });

  /**
   * Handles change events for controlled form elements
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   * @returns {void}
   *  função handleChange que atualiza o estado formData quando 
   *  o valor de um elemento de formulário muda. Ele extrai o nome e o valor do elemento alterado 
   *  e mescla o novo valor no objeto formData existente.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles file input changes for the avatar upload
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   * @returns {void}
   *  função handleFileChange que atualiza o estado formData com o conteúdo do arquivo 
   *  selecionado no input de arquivo. Ela usa o construtor FileReader para ler o arquivo 
   *  e, quando a leitura termina, atualiza o estado formData com o resultado da leitura.
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

/**
 * Handles the form submission for associating registration.
 * Prevents the default form submission behavior, validates required fields,
 * and stores the form data in LocalStorage if all fields are filled.
 * Alerts the user in case of missing fields or successful registration.
 * Resets the form data to initial state after submission.
 * @param {React.FormEvent<HTMLFormElement>} e - The form submit event
 * @returns {void}
 */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.telefone) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    // LocalStorage
    const associados = JSON.parse(localStorage.getItem("associados")) || [];
    localStorage.setItem("associados", JSON.stringify([...associados, formData]));
    alert("Associado cadastrado com sucesso!");


    setFormData({
      nome: "",
      endereco: "",
      email: "",
      telefone: "",
      status: "Ativo",
      dataNascimento: "",
      foto: "",
    });
  };

  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="p-4 bg-white rounded shadow-sm">
              <Row className="justify-content-center ">
                <h3 className="text-center mb-4 d-none d-sm-block">Cadastro de Associados</h3>
                <h5 className="text-center mb-4 d-block d-sm-none">Cadastro de Associados</h5>
              </Row>
              <Row>
                {/* Formulário */}
                <Col md={12}>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      {/* Coluna de Foto */}
                      <Col md={5} className="mb-2">
                        <Row
                          className="border rounded mb-1"
                          style={{
                            height: "248px",
                            maxWidth: "298px",
                            backgroundColor: "#f8f9fa",
                          }}
                        >
                          <Image
                            src={formData.foto || "https://via.placeholder.com/298x248"}
                            alt="Foto"
                            className="img-fluid mx-auto my-auto"
                            style={{ height: "100%", objectFit: "cover" }}
                          />
                        </Row>
                        <Form.Group controlId="formFileSm">
                          <Form.Label>Selecione uma foto</Form.Label>
                          <Form.Control
                            type="file"
                            size="sm"
                            onChange={handleFileChange}
                          />
                        </Form.Group>
                      </Col>

                      {/* Coluna de Dados */}
                      <Col md={7}>
                        <Form.Group className="mb-3" controlId="formNome">
                          <Form.Label>Nome</Form.Label>
                          <Form.Control
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Digite seu nome"
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEndereco">
                          <Form.Label>Endereço</Form.Label>
                          <Form.Control
                            type="text"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            placeholder="Digite seu endereço"
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                          <Form.Label>E-mail</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Digite seu e-mail"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Linha com Telefone, Status e Data de Nascimento */}
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="formTelefone">
                          <Form.Label>Telefone</Form.Label>
                          <InputMask
                            className="form-control"
                            mask="(99) 99999-9999"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="Digite seu telefone"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3" controlId="formStatus">
                          <Form.Label>Status</Form.Label>
                          <Form.Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <option>Ativo</option>
                            <option>Inativo</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group
                          className="mb-3"
                          controlId="formDataNascimento"
                        >
                          <Form.Label>Data de Nascimento</Form.Label>
                          <Form.Control
                            type="date"
                            name="dataNascimento"
                            value={formData.dataNascimento}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Botão Salvar */}
                    <Row className="mt-3">
                      <Col className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                          Salvar
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CadAssociado;

import React, { useState } from "react";
import {  Row, Col, Form, Button, Image } from "react-bootstrap";
import InputMask from "react-input-mask";
import FormsBase from "./FormsBase";

/**
 * CadAssociado is a React functional component that provides a form for associating
 * registration. It allows users to input and manage personal details such as name,
 * CPF, address, email, phone number, status, date of birth, and an avatar photo.
 * The component handles changes to form inputs, processes avatar image uploads,
 * and manages form submission to store the data in LocalStorage. It also resets
 * the form to its initial state after a successful submission.
 */
function FormAssociados() {
  const [formData, setFormData] = useState({
    cpf: null,
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
    status: "Ativo",
    dataNascimento: "",
    foto: "",
    dataCadastro: new Date().toISOString().slice(0, 10),
  });

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles changes to form inputs by updating the formData state
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The change event
   * @returns {void}
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.telefone) {
      alert("Por favor, preencha todos os campos obrigatórios!");
      return;
    }

    setIsLoading(true);

    try {
      // Chamada à API do backend (rota POST para cadastro)

      alert("Associado cadastrado com sucesso!");

      // Reseta o formulário após o sucesso
      setFormData({
        cpf: "",
        nome: "",
        endereco: "",
        email: "",
        telefone: "",
        status: "Ativo",
        dataNascimento: "",
        foto: "",
        dataCadastro: new Date().toISOString().slice(0, 10).split("T")[0],
      });
    } catch (error) {
      console.error("Erro ao cadastrar associado:", error);
      alert(
        "Ocorreu um erro ao tentar cadastrar o associado. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormsBase title="Cadastro de Associados">
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
                      src={
                        formData.foto || "https://via.placeholder.com/298x248"
                      }
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
                      minLength={10}
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Digite seu nome"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCPF">
                    <Form.Label>CPF</Form.Label>
                    <InputMask
                      mask="999.999.999-99"
                      value={formData.cpf}
                      minLength={28}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Digite seu CPF"
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
                  <Form.Group className="mb-3" controlId="formDataNascimento">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control
                      type="date"
                      name="dataNascimento"
                      max={(() => {
                        const today = new Date();
                        today.setDate(today.getDate() - 0);
                        return today.toISOString().split("T")[0];
                      })()}
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
      </FormsBase>
    </>
  );
}

export default FormAssociados;

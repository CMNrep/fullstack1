import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import InputMask from "react-input-mask";
import FormsBase from "./FormsBase";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

function FormAssociados() {
  const [initialValues, setInitialValues] = useState({
    cpf: "",
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
    status: "Ativo",
    dataNascimento: "",
    foto: "",
    dataCadastro: "",
  });

  const { cpf } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cpf) {
      setLoading(true);
      const cpfSemFormatacao = cpf.replace(/\D/g, "");
      fetch(`http://localhost:3000/associados/${cpfSemFormatacao}`)
        .then((res) => res.json())
        .then((json) => {
          const data = json.data;
          setInitialValues({
            ...data,
            dataNascimento: data.dataNascimento ? formatarDataParaInput(data.dataNascimento) : "",
            dataCadastro: data.dataCadastro ? formatarDataParaInput(data.dataCadastro) : "",
          });
          
            console.log("CPF recebido na URL:", cpf);
            console.log("Dados recebidos do backend:", json.data);

          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar associado:", err);
          setLoading(false);
        });
    }
  }, [cpf]);


  const handleSubmit = (values) => {
    const method = cpf ? "PUT" : "POST";
    const url = cpf
      ? `http://localhost:3000/associados/${cpf}`
      : "http://localhost:3000/associados";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(() => navigate("/listarAssociados"), console.log("Dados enviados para salvar:", values))
      .catch((err) => console.error("Erro ao salvar associado:", err));
  };

  const handleFileChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Por favor, selecione um arquivo de imagem.");
        return;
      }
      if (file.size > 4 * 1024 * 1024) {
        // Limite de 2MB
        alert("O tamanho da imagem deve ser menor que 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFieldValue("foto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatarDataParaInput = (data) => {
    if (!data) return "";
    return data.split("T")[0];
  };

  const validationSchema = Yup.object({
    nome: Yup.string()
      .min(8, "O nome deve ter pelo menos 8 caracteres.")
      .required("Nome obrigatório"),
    
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Formato de CPF inválido (123.456.789-XX).")
      .test("cpf-valido", "CPF inválido", function (value) {
        if (!value) return true; // Não valida se estiver vazio
        const cpf = value.replace(/\D/g, "");
        let soma = 0;
        let resto;
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
        for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
        soma = 0;
        for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
        return true;
      })
      .required("CPF obrigatório"),
    
    dataNascimento: Yup.date()
      .max(new Date(), "A data de nascimento não pode ser no futuro.")
      .required("Data de nascimento obrigatória."),
    endereco: Yup.string()
      .min(3, "O endereço deve ter pelo menos 3 caracteres.")
      .required("Endereço obrigatório."),
    email: Yup.string().email("Email inválido").required("Email obrigatório."),
    telefone: Yup.string().required("Telefone obrigatório."),
    status: Yup.string()
      .oneOf(["Ativo", "Inativo"])
      .required("Status obrigatório."),
  });

  return (
    <FormsBase title="Cadastro de Associados">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
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
                    src={values.foto || "https://via.placeholder.com/720x405"}
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
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                  />
                </Form.Group>
              </Col>

              <Col md={7}>
                <Form.Group className="mb-3" controlId="formNome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome"
                    isInvalid={touched.nome && !!errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCPF">
                  <Form.Label>CPF</Form.Label>
                  <InputMask
                    mask="999.999.999-99"
                    name="cpf"
                    value={values.cpf}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.cpf && errors.cpf ? "is-invalid" : ""
                    }`}
                    disabled={!!cpf} // Desabilita o campo se estiver editando
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEndereco">
                  <Form.Label>Endereço</Form.Label>
                  <Form.Control
                    type="text"
                    name="endereco"
                    value={values.endereco}
                    onChange={handleChange}
                    placeholder="Digite o endereço"
                    isInvalid={touched.endereco && !!errors.endereco}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endereco}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Digite o email"
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="formTelefone">
                  <Form.Label>Telefone</Form.Label>
                  <InputMask
                    mask="(99) 99999-9999"
                    name="telefone"
                    value={values.telefone}
                    onChange={handleChange}
                    className={`form-control ${
                      touched.telefone && errors.telefone ? "is-invalid" : ""
                    }`}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telefone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    isInvalid={touched.status && !!errors.status}
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.status}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="formDataNascimento">
                  <Form.Label>Data de Nascimento</Form.Label>
                  <Form.Control
                    type="date"
                    name="dataNascimento"
                    max={new Date().toISOString().split("T")[0]}
                    value={values.dataNascimento}
                    onChange={handleChange}
                    isInvalid={
                      touched.dataNascimento && !!errors.dataNascimento
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataNascimento}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col className="d-flex justify-content-end">
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </FormsBase>
  );
}

export default FormAssociados;

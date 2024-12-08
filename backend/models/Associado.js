const AssociadoDAO = require("../DAOs/AssociadoDAO.js");

class Associado {
  #cpf;
  #nome;
  #endereco;
  #email;
  #telefone;
  #status;
  #dataNascimento;
  #urlFoto;
  #dataCadastro;

  constructor(
    cpf,
    nome,
    endereco,
    email,
    telefone,
    status,
    dataNascimento,
    urlFoto,
    dataCadastro
  ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#endereco = endereco;
    this.#email = email;
    this.#telefone = telefone;
    this.#status = status;
    this.#dataNascimento = dataNascimento;
    this.#urlFoto = urlFoto;
    this.#dataCadastro = dataCadastro;
  }

  get cpf() {
    return this.#cpf;
  }
  set cpf(cpf) {
    this.#cpf = cpf;
  }

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }

  get endereco() {
    return this.#endereco;
  }
  set endereco(endereco) {
    this.#endereco = endereco;
  }

  get email() {
    return this.#email;
  }
  set email(email) {
    this.#email = email;
  }

  get telefone() {
    return this.#telefone;
  }
  set telefone(telefone) {
    this.#telefone = telefone;
  }

  get status() {
    return this.#status;
  }
  set status(status) {
    this.#status = status;
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }
  set dataNascimento(dataNascimento) {
    this.#dataNascimento = dataNascimento;
  }

  get urlFoto() {
    return this.#urlFoto;
  }
  set urlFoto(urlFoto) {
    this.#urlFoto = urlFoto;
  }

  get dataCadastro() {
    return this.#dataCadastro;
  }
  set dataCadastro(dataCadastro) {
    this.#dataCadastro = dataCadastro;
  }

  toJSON() {
    return {
      cpf: this.#cpf,
      nome: this.#nome,
      endereco: this.#endereco,
      email: this.#email,
      telefone: this.#telefone,
      status: this.#status,
      dataNascimento: this.#dataNascimento,
      urlFoto: this.#urlFoto,
      dataCadastro: this.#dataCadastro,
    };
  }
  static async criar(associadoData) {
    const dao = new AssociadoDAO();
    const associado = new Associado(
      associadoData.cpf,
      associadoData.nome,
      associadoData.endereco,
      associadoData.email,
      associadoData.telefone,
      associadoData.status,
      associadoData.dataNascimento,
      associadoData.urlFoto
    );

    await dao.inserir(associado);
    return associado;
  }

  static async filtrarStatus(status) {
    const dao = new AssociadoDAO();
    const rows = await dao.filtroStatus(status);
    return rows.map(row => new Associado(row.cpf, row.nome, row.endereco, row.email, row.telefone, row.status, row.data_nascimento, row.foto, row.data_cadastro));
  }

  /**
   * Busca associados que contenham o termo de pesquisa na base de dados.
   * @param {string} termo - O termo de pesquisa.
   * @returns {Associado[]} - Os associados encontrados.
   */
  static async buscarPorFiltro(termo) {
    const dao = new AssociadoDAO();
    const rows = await dao.buscarPorTermo(termo);
    return rows.map(row => new Associado(row.cpf, row.nome, row.endereco, row.email, row.telefone, row.status, row.data_nascimento, row.foto, row.data_cadastro));
  }

  /**
   * Busca um associado pelo CPF no banco de dados.
   * @returns {Associado|null} - O associado encontrado ou null se n o encontrado.
   */
  static async buscaPorCpf(cpf) {
    const dao = new AssociadoDAO();
    const data = await dao.buscarPorCpf(cpf);
    if (!data) return null;
    return new Associado(data.cpf, data.nome, data.endereco, data.email, data.telefone, data.status, data.data_nascimento, data.foto, data.data_cadastro);
  }

  async deletar() {
    const dao = new AssociadoDAO();
    return await dao.deletar(this.#cpf);
  }

  async atualizar() {
    const dao = new AssociadoDAO();
    return await dao.atualizar(this);
  }

}

module.exports = Associado;

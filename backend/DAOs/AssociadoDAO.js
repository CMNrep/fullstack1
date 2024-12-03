const db = require("../config/db.js");

class AssociadoDAO {
    
    /**
     * Insere um associado na base de dados.
     * @param {Object} associado - Um objeto com as seguintes propriedades:
     *     - cpf: string - O CPF do associado.
     *     - nome: string - O nome do associado.
     *     - endereco: string - O endere o do associado.
     *     - email: string - O e-mail do associado.
     *     - telefone: string - O telefone do associado.
     *     - status: string - O status do associado.
     *     - dataNascimento: string - A data de nascimento do associado.
     *     - urlFoto: string - A URL da foto do associado.
     *     - dataCadastro: string - A data de cadastro do associado.
     * @returns {Promise<Object>} - A resposta da consulta, que cont m o ID do associado inserido.
     */
    async inserir(associado) {

        console.log('associado',associado)
        const { cpf, nome, endereco, email, telefone, status, dataNascimento, urlFoto, dataCadastro } = associado;  
        const query = "INSERT INTO associados (cpf, nome, endereco, email, telefone, status, data_nascimento, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const [result] = await db.execute(query,[cpf, nome, endereco, email, telefone, status, dataNascimento, urlFoto]);
        return result;
    }

    async buscarPorTermo(termo) {
try {
      let query, params;

      if (!termo) {
        query = "SELECT * FROM associados";
        params = [];
      } else {
        query = "SELECT * FROM associados WHERE nome LIKE ?";
        params = [`%${termo}%`];
      }

      const [rows] = await db.execute(query, params);
      return rows;
    } catch (err) {
      throw new Error("Erro ao buscar associados por termo: " + err.message);
    }
    }

    async buscarPorCpf(cpf) {
        try {
            const query = "SELECT * FROM associados WHERE cpf = ?";
            const [rows] = await db.execute(query, [cpf]);
            return rows[0] || null; // Retorna o primeiro resultado ou null se vazio
          } catch (err) {
            throw new Error("Erro ao buscar associado por CPF: " + err.message);
          }
    }

    async deletar(cpf) {
        const query = "DELETE FROM associados WHERE cpf = ?";
        const [result] = await db.execute(query, [cpf]);
        return result;
    }   

    async atualizar(associado) {
      const { cpf, nome, endereco, email, telefone, status, dataNascimento, urlFoto, dataCadastro } = associado;
      const query = `
        UPDATE associados
        SET nome = ?, endereco = ?, email = ?, telefone = ?, status = ?, data_nascimento = ?, foto = ?, data_cadastro = ?
        WHERE cpf = ?
      `;
  
      try {
        const [result] = await db.execute(query, [nome, endereco, email, telefone, status, dataNascimento, urlFoto, dataCadastro, cpf]);
        return result.affectedRows > 0;
      } catch (err) {
        throw new Error("Erro ao atualizar associado: " + err.message);
      }
    
    }

}

module.exports = AssociadoDAO;
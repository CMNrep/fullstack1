const Associado = require("../models/Associado.js");
const AssociadoDAO = require("../DAOs/AssociadoDAO.js");
const e = require("cors");

class AssociadosCtrl {

   removeCpfMask(cpf) {
    return cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
}
  async inserir(req, res) {
    try {
      const {
        cpf,
        nome,
        endereco,
        email,
        telefone,
        status,
        dataNascimento,
        urlFoto,
        dataCadastro,
      } = req.body;
      const associadoData = {
        cpf:cpf.replace(/\D/g, ''),
        nome,
        endereco,
        email,
        telefone,
        status,
        dataNascimento,
        urlFoto:""
      };

      
         console.log('associadoData',dataCadastro)
      const associado = await Associado.criar(associadoData);
      res.status(201).json({
        message: "Associado inserido com sucesso",
        data: associado.toJSON(),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Erro ao inserir associado",
        err: err.message,
      });
    }
  }

  async FiltrarStatus(req, res) {
    try {
        const { status } = req.params;
        const associados = await Associado.filtrarStatus(status);
  
        if (associados.length === 0) {
          return res.status(200).json({ message: "Nenhum associado encontrado." });
        }
  
        res.status(200).json({
          message: "Associados encontrados",
          data: associados.map(associado => associado.toJSON()),
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: "Erro ao buscar associados",
          error: err.message,
        });
      }
  }

  async buscarPorFiltro(req, res) {

    console.log('sdsds')
    try {
        const termo = req.query.termo || ""; // Busca termo na query string
        const associados = await Associado.buscarPorFiltro(termo);
       
        if (associados.length === 0) {
          return res.status(200).json({ message: "Nenhum associado encontrado." });
        }
       
  
        res.status(200).json({
          message: "Associados encontrados",
          data: associados.map(associado => associado.toJSON()),
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: "Erro ao buscar associados",
          error: err.message,
        });
      }
  }

  async buscarPorCpf(req, res) {
    try {
        const { cpf } = req.params;
        const associado = await Associado.buscaPorCpf(cpf);
  
        if (!associado) {
          return res.status(404).json({ message: "Associado não encontrado." });
        }
  
        res.status(200).json({
          message: "Associado encontrado",
          data: associado.toJSON(),
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: "Erro ao buscar associado",
          error: err.message,
        });
    }
  }

  async deletar(req, res) {
    try {
      const { cpf } = req.params;
      const associado = await Associado.buscaPorCpf(cpf);
      
      if (!associado) {
        return res.status(404).json({
          message: "Associado não encontrado",
        });
      } 
        
      await associado.deletar();
        
      res.status(200).json({
            message: "Associado deletado com sucesso",
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Erro ao deletar associado",
        err: err.message,
      });
    }
  }

  async atualizar(req, res) {
    try {
      const { cpf } = req.params;
      const { nome, email, telefone, status, dataNascimento, urlFoto, dataCadastro } = req.body

      const associado = await Associado.buscaPorCpf(cpf);


      if (!associado) {
        return res.status(404).json({
          message: "Associado não encontrado",
        });
      }
      
        associado.nome = nome
        associado.email = email
        associado.telefone = telefone
        associado.status = status
        associado.dataNascimento = dataNascimento
        associado.urlFoto = urlFoto
        associado.dataCadastro = dataCadastro

        await associado.atualizar();
        
        res.status(200).json({
          message: "Associado atualizado com sucesso",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({    
        message: "Erro ao atualizar associado",
        err: err.message,
      });
    }
  }
}

module.exports = new AssociadosCtrl();

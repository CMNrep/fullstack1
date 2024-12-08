const express = require("express");
const AssociadosCtrl = require("../controllers/AssociadosCtrl.js")

const router = express.Router();

router.post("/", AssociadosCtrl.inserir);
router.put("/:cpf", AssociadosCtrl.atualizar);
router.get("/", AssociadosCtrl.buscarPorFiltro);
router.get("/:status", AssociadosCtrl.FiltrarStatus );
router.get("/:cpf", AssociadosCtrl.buscarPorCpf);
router.delete("/:cpf", AssociadosCtrl.deletar);

module.exports = router;


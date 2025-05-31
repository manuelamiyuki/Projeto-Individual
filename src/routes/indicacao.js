var express = require("express");
var router = express.Router();

var indicacaoController = require("../controllers/indicacaoController");


router.post("/indicar", function (req, res) {
    indicacaoController.indicar(req, res);
});

router.get("/listarIndicacoes/:idUsuario", function (req, res) {
    indicacaoController.listarIndicacoes(req, res);
});


module.exports = router;
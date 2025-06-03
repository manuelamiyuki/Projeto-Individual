var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");


router.post("/enviarQuiz", function (req, res) { // inserir
    quizController.enviarQuiz(req, res);
});

router.get("/listar/:idUsuario", function (req, res) { //selecionar -- : referencia um valor (idUsuario - que é obrigatorio)
    quizController.listar(req, res);
});


module.exports = router;
var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");


router.get("/listarPersonagensFavoritos", function (req, res){
    dashController.listarPersonagensFavoritos(req, res)
});


router.get("/listarTentativaQuiz/:idUsuario", function (req, res) {
    dashController.listarTentativaQuiz(req, res);
});

module.exports = router;

var dashModel = require("../models/dashModel");

function listarPersonagensFavoaritos(req, res) {
    dashModel.listarPersonagensFavoaritos()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os personagens favoritos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function listarTentativaQuiz(req, res) {
    var idUsuario = req.params.idUsuario;

    dashModel.listarTentativaQuiz(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
module.exports = {
    listarPersonagensFavoaritos,
    listarTentativaQuiz,
};
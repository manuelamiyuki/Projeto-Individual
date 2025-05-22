var quizModel = require("../models/quizModel");


function enviar(req,res) {
    var qtd_respostas_erradas = req.body.perguntasErradasServer;
    var qtd_respostas_certas = req.body.perguntasCertasServer;
    var idUsuario = req.body.idUsuario;

        quizModel.enviar(qtd_respostas_erradas,qtd_respostas_certas,idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o envio! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }



    
function listar(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.listar(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    enviar,
    listar,
}
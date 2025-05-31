var indicacaoModel = require("../models/indicacaoModel");

function indicar(req,res) {

    var probabilidade = req.body.probabilidadeServer;
    var idUsuario = req.body.idUsuario;

        indicacaoModel.indicar(probabilidade,idUsuario)
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



    function listarIndicacoes(req, res){
            var idUsuario = req.params.idUsuario;
        
            indicacaoModel.listarIndicacoes(idUsuario)
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
    indicar,
    listarIndicacoes,
}
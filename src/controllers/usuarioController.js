

var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer; //traz o valor que foi passado no login no .json
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) { //se for 1 é true (ta ok, pode mandar pra funçaõ principal no js)
                        console.log(resultadoAutenticar);

                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                    });
                
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var userName = req.body.userNameServer;
    var personagemFavorito = req.body.personagemFavoritoServer;


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (userName == undefined) {
        res.status(400).send("Seu nick está undefined!");
    } else if (personagemFavorito == undefined) {
        res.status(400).send("Seu personagem favorito está undefined!");
    }
      else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, userName, email, personagemFavorito, senha)
            .then(
                function (resultado) {
                    res.json(resultado); // armazena em um arq json o paramtro da função q veio do banco (models) - insert do banco
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// nomea as funções (da onde ta vindo e oq ta exigindo)
module.exports = {
    autenticar,
    cadastrar
}
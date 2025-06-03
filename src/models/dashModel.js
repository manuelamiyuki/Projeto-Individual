var database = require("../database/config");

function listarPersonagensFavoritos() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Chandler') as Chandler ,
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Ross') as Ross,
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Monica') as Monica,
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Rachel') as Rachel,
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Joey') as Joey,
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Phoebe') as Phoebe  
            from usuarios;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listarTentativaQuiz(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():",idUsuario);
    var instrucaoSql = `
    SELECT COUNT(fkUsuarios) as tentativas ,u.nome as nome from quiz q inner join usuarios u on q.fkUsuarios = u.id  WHERE fkUsuarios = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listarPersonagensFavoritos,
    listarTentativaQuiz,
};


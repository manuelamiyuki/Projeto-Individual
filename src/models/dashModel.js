var database = require("../database/config");

function listarPersonagensFavoaritos() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Chandler') as Chandler ,(SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Ross') as Ross,
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Monica') as Monica,(SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Rachel') as Rachel,
            (SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Joey') as Joey,(SELECT COUNT(personagemFavorito) FROM usuarios WHERE personagemFavorito = 'Phoebe') as Phoebe
            from usuarios;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPersonagensFavoaritos,
};

// 'Chandler','Ross','Monica','Rachel','Joey','Phoebe'
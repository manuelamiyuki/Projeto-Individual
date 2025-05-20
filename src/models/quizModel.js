var database = require("../database/config");


function enviar(qtd_respostas_certas, idUsuario) {
    console.log("ACESSEI O quiz MODEL - função enviar():", qtd_respostas_certas, idUsuario);
    
    var instrucaoSql = `
        INSERT INTO quiz (qtd_respostas_certas,qtd_perguntas,fkUsuarios) VALUES ('${qtd_respostas_certas}','15','${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviar,
};
var database = require("../database/config");


function enviar(qtd_respostas_erradas,qtd_respostas_certas, idUsuario) {
    console.log("ACESSEI O quiz MODEL - função enviar():", qtd_respostas_erradas,qtd_respostas_certas, idUsuario);
    
    var instrucaoSql = `
        INSERT INTO quiz (qtd_respostas_erradas,qtd_respostas_certas,qtd_perguntas,data_quiz,fkUsuarios) VALUES ('${qtd_respostas_erradas}','${qtd_respostas_certas}','15',current_timestamp(),'${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function listar(idUsuario) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar():",idUsuario);
    var instrucaoSql = `
    SELECT qtd_respostas_erradas,qtd_respostas_certas,data_quiz,fkUsuarios,u.nome as nome, u.userName as user from quiz q inner join usuarios u on q.fkUsuarios = u.id  WHERE fkUsuarios = '${idUsuario}' order by data_quiz desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    enviar,
    listar,
};
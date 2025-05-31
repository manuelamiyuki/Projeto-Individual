var database = require("../database/config");


function indicar(probabilidade, idUsuario) {
    console.log("ACESSEI O quiz MODEL - função indicar():", probabilidade, idUsuario);
    
    var instrucaoSql = `
        INSERT INTO indicacao (fkusuarios,probabilidade,tempo) VALUES ('${idUsuario}','${probabilidade}',current_timestamp())
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function listarIndicacoes(idUsuario){
     console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarIndicacoes():",idUsuario);
        var instrucaoSql = `
        SELECT fkUsuarios,probabilidade as probabilidade from indicacao i inner join usuarios u on i.fkUsuarios = u.id  WHERE fkUsuarios = '${idUsuario}' order by tempo desc limit 1;
        `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

}

module.exports = {
    indicar,
    listarIndicacoes,
};
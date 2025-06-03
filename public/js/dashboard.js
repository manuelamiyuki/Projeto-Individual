
const pontuacao = parseInt(localStorage.getItem("pontuacao")) || 0;
const porcentagem = parseInt(localStorage.getItem("porcentagem")) || 0;
const totalQuestoes = 15;
const acertos = pontuacao;
const erros = totalQuestoes - pontuacao;

// Exibir KPIs



function listarIndicacoes(){
    let idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/indicacao/listarIndicacoes/${idUsuario}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {

                    plotarGraficoIndicacao(resposta,idUsuario)
                });
            } else {
                alert("Houve um erro ao tentar puxar os dados!");
            }
        })
        .catch(function (erro) {
            console.error("#ERRO: ", erro);
            alert("Erro ao comunicar com o servidor.");
        });

    return false;

}

function plotarGraficoIndicacao(resposta,idUsuario) {
    console.log('iniciando plotagem do gráfico...');
    console.log('teste4',idUsuario)
    console.log('teste5',resposta)

    const labels = [];
    const dataValues = [];

    labels.push(resposta[0].user);
    dataValues.push(resposta[0].probabilidade); 

    const dados = {
        labels: labels,
        datasets: [{
            label: 'Probabilidade de Indicação',
            data: dataValues,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1
        }]
    };  

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)




    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')


    const config = {
        type: 'bar',
        data: dados,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
                
            }
        },
    };


    new Chart(
        document.getElementById(`graficoIndicacao`),
        config
    );
}


function listar() {
    console.log(sessionStorage.ID_USUARIO);
    let idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/quiz/listar/${idUsuario}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    obterDadosGrafico(idUsuario)

                    document.getElementById("kpiPontuacao").innerText = `Pontuação: ${((resposta[0].qtd_respostas_certas / 15) * 100).toFixed(2)}%`;    
                    document.getElementById("kpiAcertos").innerText = `Acertos: ${resposta[0].qtd_respostas_certas}`;
                    document.getElementById("kpiErros").innerText = `Erros: ${resposta[0].qtd_respostas_erradas}`;
                    document.getElementById("saudacoes").innerText = `Olá, ${resposta[0].user}`;
                    
                   

                    document.getElementById("graficos").innerHTML += `
                <div id="grafico${idUsuario}" class="display-none"> 
                    <h3 class="tituloGraficos">
                        <span id="tituloAquario${idUsuario}">Acertos X Erros</span>
                    </h3>
                    <div class="graph">
                        <canvas id="myChartCanvas${idUsuario}"></canvas>
                    </div>
                    <div class="label-captura">
                        <p id="avisoCaptura${idUsuario}" style="color: white"></p>
                    </div>
                </div>
            `

                });

            } else {
                alert("Houve um erro ao tentar puxar os dados!");
            }
        })
        .catch(function (erro) {
            console.error("#ERRO: ", erro);
            alert("Erro ao comunicar com o servidor.");
        });

    return false;
}


function obterDadosGrafico(idUsuario) {

    fetch(`/quiz/listar/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idUsuario);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function plotarGrafico(resposta, idUsuario) {
    console.log('iniciando plotagem do gráfico...');

    let labels = [];

    const dados = {
        labels: [
            'erradas',
            'certas',
        ],
        datasets: [{
            label: 'Quantidade:',
            data: [resposta[0].qtd_respostas_erradas,],
            backgroundColor: [
                'rgb(253, 27, 178)',
                'rgb(141, 207, 117)',
            ],
            hoverOffset: 4
        }]

    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    labels.push(resposta[0].qtd_respostas_certas);
    dados.datasets[0].data.push(resposta[0].qtd_respostas_certas);


    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')


    const config = {
        type: 'pie',
        data: dados,
    };


    new Chart(
        document.getElementById(`myChartCanvas${idUsuario}`),
        config
    );
}



function tentarNovamente() {
    // volta para a pg de quiz
    window.location.reload()
}





function listarPersonagensFavoaritos() {
    fetch(`/dash/listarPersonagensFavoaritos`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.log("Dados de personagens:", dados);
                    plotarGraficoPersonagensFavoritos(dados[0]);
                });
            } else {
                alert("Houve um erro ao tentar puxar os dados!");
            }
        })
        .catch(function (erro) {
            console.error("#ERRO: ", erro);
            alert("Erro ao comunicar com o servidor.");
        });

    return false;
}

function plotarGraficoPersonagensFavoritos(dados) {
    console.log('Plotando gráfico de personagens com os dados:', dados);

    let labels = ['Chandler', 'Ross', 'Monica', 'Rachel', 'Joey', 'Phoebe'];
    let valores = [dados.Chandler, dados.Ross, dados.Monica, dados.Rachel, dados.Joey, dados.Phoebe];

    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Personagens Favoritados',
                data: valores,
                backgroundColor: [
                    'rgb(248, 187, 126)',
                    'rgb(138, 203, 247)',
                    'rgb(119, 97, 165)',
                    'rgb(179, 255, 202)',
                    'rgb(253, 169, 235)',
                    'rgb(250, 255, 183)',
                ],
                borderColor: [
                    'rgb(255, 159, 64)',
                    'rgb(54, 162, 235)',
                    'rgb(89, 68, 136)',
                    'rgb(102, 255, 148)',
                    'rgb(255, 102, 222)',
                    'rgb(245, 255, 102)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            plugins:{
             legend:{
                display: false
             }   
            },
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0
                }
            }
        }
    };


    document.getElementById("graficoPersonagens").classList.remove("display-none");
    document.getElementById("graficoPersonagens").classList.add("display-block");

    // Criar o gráfico
    new Chart(
        document.getElementById('graficoPersonagensCanvas'),
        config
    );
}




function listarTentativaQuiz() {
    let idUsuario = sessionStorage.ID_USUARIO;
    fetch(`/dash/listarTentativaQuiz/${idUsuario}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    console.log("Dados de tentativas:", dados);

                    document.getElementById("kpiTentativa").innerHTML += `${dados[0].tentativas}`;

                
                });

            } else {
                alert("Houve um erro ao tentar puxar os dados!");
            }
        })
        .catch(function (erro) {
            console.error("#ERRO: ", erro);
            alert("Erro ao comunicar com o servidor.");
        });

    return false;
}



function plotarGraficoTentativaQuiz(resposta, idUsuario) {
    console.log('iniciando plotagem do gráfico...');

    const labels = [];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Tentativas no Quiz',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------');
    console.log('Estes dados foram recebidos pela função "obterDadosGrafico" e passados para "plotarGrafico":');
    console.log(resposta);

    labels.push("tentativas");
    data.datasets[0].data.push(resposta[0].tentativas);

    console.log('----------------------------------------------');
    console.log('O gráfico será plotado com os respectivos valores:');
    console.log('Labels:', labels);
    console.log('Dados:', data.datasets);
    console.log('----------------------------------------------');

    const config = {
        type: 'bar',
        data: data,
    };

    new Chart(
        document.getElementById(`myChartCanvasTentativa`),
        config
    );
}

function tentarNovamente(){
    window.location = "../quiz.html"
}
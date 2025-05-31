const listaDeQuestoes = [

    {
        pergunta: "Qual é o nome completo da personagem interpretada por Jennifer Aniston?",
        alternativaA: "Rachel Greene",
        alternativaB: "Rachel Geller",
        alternativaC: "Rachel Tribbiani",
        alternativaD: "Rachel Green",
        alternativaCorreta: "alternativaD"
    },

    {
        pergunta: "Qual é o nome do macaco de estimação de Ross?",
        alternativaA: "Caesar",
        alternativaB: "Mojo",
        alternativaC: "Marcel",
        alternativaD: "Max",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Quem se casa com Mike Hannigan?",
        alternativaA: "Monica",
        alternativaB: "Rachel",
        alternativaC: "Phoebe",
        alternativaD: "Janice",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Qual é a profissão do pai de Chandler?",
        alternativaA: "Advogado",
        alternativaB: "Médico",
        alternativaC: "Drag queen",
        alternativaD: "Chef",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "O que Joey nunca compartilha?",
        alternativaA: "Pizza",
        alternativaB: "Namorada",
        alternativaC: "Seu lugar no sofá",
        alternativaD: "Comida",
        alternativaCorreta: "alternativaD"
    },

    {
        pergunta: "Qual é o nome da cafeteria onde o grupo sempre se encontra?",
        alternativaA: "Daily Grind",
        alternativaB: "Central Perk",
        alternativaC: "Java House",
        alternativaD: "Coffee Central",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: "Como Monica perde o apartamento para Joey e Chandler?",
        alternativaA: "Em uma aposta de pôquer",
        alternativaB: "Por um contrato falso",
        alternativaC: "Em uma aposta de perguntas e respostas",
        alternativaD: "Em uma disputa de braço",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Qual é o segundo nome de Chandler?",
        alternativaA: "Eugene",
        alternativaB: "Muriel",
        alternativaC: "Matthew",
        alternativaD: "Nathan",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: "Quem canta a música tema 'I’ll Be There for You'?",
        alternativaA: "R.E.M.",
        alternativaB: "The Rembrandts",
        alternativaC: "Hootie & the Blowfish",
        alternativaD: "Counting Crows",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: "Qual era o nome da banda da faculdade de Ross?",
        alternativaA: "Sound Explosion",
        alternativaB: "Way, No Way",
        alternativaC: "Rock On",
        alternativaD: "College Vibes",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: "Quem foi a colega de quarto britânica de Joey?",
        alternativaA: "Janine",
        alternativaB: "Emily",
        alternativaC: "Erin",
        alternativaD: "Amanda",
        alternativaCorreta: "alternativaA"
    },

    {
        pergunta: "Qual desses personagens nunca morou com Rachel?",
        alternativaA: "Monica",
        alternativaB: "Joey",
        alternativaC: "Ross",
        alternativaD: "Phoebe",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Qual é a sobremesa que Rachel tenta fazer, mas mistura com carne?",
        alternativaA: "Tiramisu",
        alternativaB: "Pavê",
        alternativaC: "Trifle",
        alternativaD: "Bolo de camadas",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Em que país Emily morava?",
        alternativaA: "França",
        alternativaB: "Inglaterra",
        alternativaC: "Itália",
        alternativaD: "Austrália",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: "O que Phoebe encontra dentro de uma lata de refrigerante?",
        alternativaA: "Um dedo",
        alternativaB: "Um brinco",
        alternativaC: "Um rato",
        alternativaD: "Um anel",
        alternativaCorreta: "alternativaA"
    }

]

// variáveis globais    
let numeroDaQuestaoAtual = 0
let pontuacaoFinal = 0
let tentativaIncorreta = 0
let certas = 0
let erradas = 0
let quantidadeDeQuestoes = listaDeQuestoes.length
// let isUltima = numeroDaQuestaoAtual == quantidadeDeQuestoes-1 ? true : false

function onloadEsconder() {
    document.getElementById('jogo').style.display = "none"
}

function iniciarQuiz() {
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)

    btnSubmeter.disabled = false
    btnProx.disabled = true
    // btnConcluir.disabled = true

}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)
    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index
    console.log("questaoAtual")
    console.log(questaoAtual)
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option"); // recupera alternativas no html

    let hasChecked = false
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            hasChecked = true
            break
        }
    }

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.")
    } else {
        btnSubmeter.disabled = true
        btnProx.disabled = false

        habilitarAlternativas(false)

        checarResposta()
    }
}

function habilitarAlternativas(trueOrFalse) {
    let opcaoEscolhida = trueOrFalse ? false : true

    primeiraOpcao.disabled = opcaoEscolhida
    segundaOpcao.disabled = opcaoEscolhida
    terceiraOpcao.disabled = opcaoEscolhida
    quartaOpcao.disabled = opcaoEscolhida

}

function avancar() {
    btnProx.disabled = true
    btnSubmeter.disabled = false

    desmarcarRadioButtons()


    if (numeroDaQuestaoAtual <= quantidadeDeQuestoes - 1) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);
    } else {
        document.getElementById("btnFinalizar").disabled = false;
    }
    limparCoresBackgroundOpcoes()
}


function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual 
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta // qual é a resposta correta da questão atual

    const options = document.getElementsByName("option"); // recupera alternativas no html

    let alternativaCorreta = null // variável para armazenar a alternativa correta

    options.forEach((option) => {
        if (option.value === respostaQuestaoAtual) {
            console.log("alternativaCorreta está no componente: " + alternativaCorreta)
            alternativaCorreta = option.labels[0].id
        }
    })

    // verifica se resposta assinalada é correta
    options.forEach((option) => {
        if (option.checked === true && option.value === respostaQuestaoAtual) {
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            pontuacaoFinal++
            certas++
            numeroDaQuestaoAtual++
        } else if (option.checked && option.value !== respostaQuestaoAtual) {
            const wrongLabelId = option.labels[0].id

            document.getElementById(wrongLabelId).classList.add("text-danger-with-bg")
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            tentativaIncorreta++
            erradas++
            numeroDaQuestaoAtual++
        }
    })
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
        document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
    })
}

function entrar() {
    if (certas === 0) {
        alert("Você precisa responder ao menos uma questão.");
        return false;
    }

    fetch("/quiz/enviar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            perguntasErradasServer: erradas,
            perguntasCertasServer: certas,
            idUsuario: sessionStorage.ID_USUARIO,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                document.querySelector("#pontuacaoEJogo").style.display = "none";
                setTimeout(() => {
                    window.location = "dashboard.html";
                }, 2000);
            } else {
                alert("Houve um erro ao tentar enviar os dados!");
            }
        })
        .catch(function (erro) {
            console.error("#ERRO: ", erro);
            alert("Erro ao comunicar com o servidor.");
        });

    return false;

}


function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


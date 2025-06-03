const perguntas = [
    {
        pergunta: "O que fazer primeiro ao encontrar uma vítima inconsciente?",
        opcoes: [" Jogar água", "Verificar segurança", "Sacudir a vítima ", "Gritar com a vítima"],
        correta: 1 // Resposta correta: Verificar segurança
    },
    {
        pergunta: "Número do SAMU no Brasil?",
        opcoes: ["193", "190", "192", "911"],
        correta: 2 // Resposta correta: 192
    },
    {
        pergunta: "O que evitar em fratura exposta?",
        opcoes: ["Imobilizar", "Pedir ajuda", "Estancar sangue", "Colocar osso no lugar"],
        correta: 3 // Resposta correta: Colocar osso no lugar
    },
    {
        pergunta: "O que não fazer com suspeita de lesão na coluna?",
        opcoes: ["Mover a vítima", "Cobrir com cobertor", "Ficar ao lado", "Chamar ajuda"],
        correta: 0 // Resposta correta: Mover vítima
    },
    {
        pergunta: "Como estancar sangramento?",
        opcoes: ["Gelo", "Deixar escorrer", "Pressão local", "Esfregar"],
        correta: 2 // Resposta correta: Pressão local
    },
    {
        pergunta: "Qual a primeira coisa a fazer ao ver um acidente?",
        opcoes: ["Correr até vítima", "Tocar a vítima", "Gritar socorro", "Avaliar segurança"],
        correta: 3 // Resposta correta: Avaliar a segurança
    },
    {
        pergunta: "O que é um curativo compressivo?",
        opcoes: ["Gelo sobre o corte", " Gaze molhada", "Esparadrapo sem gaze", "Pressão com pano limpo"],
        correta: 3 // Resposta correta: Pressão com pano limpo
    },
    {
        pergunta: "O que fazer quando uma pessoa está inconsciente mas respirando?",
        opcoes: ["Posição lateral de segurança", "Deixar deitada de costas", "RCP", "Ventilação boca a boca"],
        correta: 0 // Resposta correta: Posição lateral de segurança
    },
    {
        pergunta: "Qual o procedimento em caso de queimadura grave?",
        opcoes: ["Passar creme", "Cobrir e chamar socorro", "Estourar bolhas", "Gelo direto"],
        correta: 1 // Resposta correta: Cobrir e chamar socorro
    },
    {
        pergunta: "O que é avaliação primária?",
        opcoes: ["Diagnóstico médico", "Aplicar curativo", "Ligar para familiares", "Avaliação inicial da vítima"],
        correta: 3 // Resposta correta: Avaliação inicial da vítima
    },
];


let indicePerguntaAtual = 0; // Armazena o índice da pergunta atual
let pontuacao = 0; // Pontuação inicial
let tempo = 60; // Tempo inicial para cada pergunta
let intervalo; // Armazena o intervalo para a contagem regressiva

if (!localStorage.getItem('paginaRecarregada')) {
    localStorage.setItem('paginaRecarregada', 'true');
    location.reload();
} else {
    localStorage.removeItem('paginaRecarregada');
}
function iniciarJogo() {
    carregarPergunta(); // Carrega a primeira pergunta ao iniciar o jogo
}

function carregarPergunta() {
    clearInterval(intervalo); // Limpa o intervalo anterior
    tempo = 60; // Reseta o tempo para 60 segundos

    if (indicePerguntaAtual >= perguntas.length) { // Verifica se não há mais perguntas
        verificarPontuacao(); // Verifica a pontuação e mostra o alerta
        window.location.href = 'feedback.html'; // Sai da função sem carregar mais perguntas
    }

    let perguntaAtual = perguntas[indicePerguntaAtual]; // Pega a pergunta atual
    document.getElementById("pergunta").innerText = perguntaAtual.pergunta; // Exibe a pergunta

    let opcoesContainer = document.getElementById("opcoes");
    opcoesContainer.innerHTML = ""; // Limpa as opções anteriores

    // Não embaralha as opções. Apenas percorre as opções na ordem original.
    perguntaAtual.opcoes.forEach((item, index) => {
        let botao = document.createElement("button");
        botao.innerText = item; // Exibe o texto da opção
        botao.onclick = () => verificarResposta(index); // Chama a função de verificação da resposta
        opcoesContainer.appendChild(botao); // Adiciona o botão ao container de opções
    });

    iniciarTimer(); // Inicia a contagem regressiva
}


function iniciarTimer() {
    const barraTempo = document.getElementById("barra-tempo");
    barraTempo.style.width = "100%"; // Começa com a barra cheia

    intervalo = setInterval(function() {
        tempo--; // Diminui 1 segundo
        barraTempo.style.width = `${(tempo / 60) * 100}%`; // Atualiza a barra conforme o tempo diminui
        if (tempo <= 0) {
            clearInterval(intervalo); // Para o timer quando o tempo acabar
            setTimeout(() => {
                indicePerguntaAtual++; // Avança para a próxima pergunta quando o tempo chega a zero
                carregarPergunta(); // Carrega a próxima pergunta
            }, 5000); // Espera 5 segundo para carregar a próxima pergunta
        } 
    }, 1000); // Atualiza a cada 1 segundo
}

function verificarResposta(escolha) {
    clearInterval(intervalo);

    let perguntaAtual = perguntas[indicePerguntaAtual];
    let botoes = document.querySelectorAll("#opcoes button");

    // Impede múltiplas respostas desabilitando todos os botões
    botoes.forEach(botao => botao.disabled = true);

    if (escolha === perguntaAtual.correta) {
        botoes[escolha].classList.add("correta");
        pontuacao += 100;
    } else {
        if (escolha !== -1) {
            botoes[escolha].classList.add("errada");
        }
        botoes[perguntaAtual.correta].classList.add("correta");
    }

    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`;

    setTimeout(() => {
        indicePerguntaAtual++;
        carregarPergunta();
    }, 1000);
}
function verificarPontuacao() {
      if (pontuacao) {
        localStorage.setItem("pontuacao", pontuacao);
        
    }
}


window.onload = iniciarJogo; // Inicia o jogo assim que a página for carregada

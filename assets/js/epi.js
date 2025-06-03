
const perguntas = [
    {
        pergunta: "Acima de qual altura é preciso cinto de segurança?",
        opcoes: ["1 METRO", "2 METROS", "3 METROS ", "4 METROS"],
        correta: 1 // Resposta correta: 2 Metros
    },
    {
        pergunta: "Qual EPI é obrigatório quando existe risco de queda de objetos?",
        opcoes: ["Máscara", "Protetor auricular", "Casquete", "Luvas"],
        correta: 2 // Resposta correta: Casquete
    },
    {
        pergunta: "Qual a primeira atitude em caso de vasamento de gás?",
        opcoes: ["Avisar o EHS", "Acender a luz", "Correr", "Acender uma vela"],
        correta: 0 // Resposta correta: Avisar o EHS
    },
    {
        pergunta: "O que deve ser feito antes de utilizar um equipamento industrial?",
        opcoes: ["Inspecionar", "Ligar direto", "Comer", "Desligar"],
        correta: 0 // Resposta correta: Inspecionar
    },
    {
        pergunta: "Qual atitude é proibida ao operar máquinas ou equipamentos?",
        opcoes: ["Estar concentrado", "Seguir o manual","Usar o celular","Ligar"],
        correta: 2 // Resposta correta: Usar o celular
    },
    {
        pergunta: "Ao utilizar produtos químicos deve-se usar qual EPI?",
        opcoes: ["Casquete", "Luva", "Bota", "Máscara"],
        correta: 3 // Resposta correta: Máscara
    },
    {
        pergunta: "Qual o EPI indicado para soldagem?",
        opcoes: ["Protetor auricular", "Máscara de solda", "Luvas de lã", "Casquete"],
        correta: 1 // Resposta correta: Máscara de solda
    },
    {
        pergunta: "Qual o EPI obrigatório para o uso em plataformas movéis/P.T.A?",
        opcoes: ["Casquete", "Camiseta", "Luva", "Cinto de segurança"],
        correta: 3 // Resposta correta: Cinto de segurança
    },
    {
        pergunta: "A falta de manutenção em máquinas pode causar:?",
        opcoes: ["Redução de custos", "Acidentes e falhas", "Promoções", "Redução de riscos"],
        correta: 1 // Resposta correta: Acidentes e falhas
    },
    {
        pergunta: "O que fazer ao presenciar um quase-acidente?",
        opcoes: ["Comunicar o superior", "Rir", "Ignorar", "Fazer piada"],
        correta: 0 // Resposta correta: Comunicar o superior
    }
];


let indicePerguntaAtual = 0; // Armazena o índice da pergunta atual
let pontuacao = 0; // Pontuação inicial
let tempo = 60; // Tempo inicial para cada pergunta
let intervalo; // Armazena o intervalo para a contagem regressiva

 
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

const perguntas = [
    {
        pergunta: "Qual a capital do Brasil?",
        opcoes: ["São Paulo", "Brasília", "Rio de Janeiro", "Belo Horizonte"],
        correta: 1 // Índice da resposta correta
    },
    {
        pergunta: "Quem pintou a Mona Lisa?",
        opcoes: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"],
        correta: 1 // Resposta correta: Da Vinci
    },
    {
        pergunta: "Quantos continentes existem?",
        opcoes: ["5", "6", "7", "8"],
        correta: 2 // Resposta correta: 7
    }
];

let indicePerguntaAtual = 0; // Armazena o índice da pergunta atual
let pontuacao = 0; // Pontuação inicial
let tempo = 10; // Tempo inicial para cada pergunta
let intervalo; // Armazena o intervalo para a contagem regressiva

function iniciarJogo() {
    carregarPergunta(); // Carrega a primeira pergunta ao iniciar o jogo
}

function carregarPergunta() {
    clearInterval(intervalo); // Limpa o intervalo anterior
    tempo = 10; // Reseta o tempo para 10 segundos

    if (indicePerguntaAtual >= perguntas.length) { // Verifica se não há mais perguntas
        verificarPontuacao(); // Verifica a pontuação e mostra o alerta
        return; // Sai da função sem carregar mais perguntas
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
        barraTempo.style.width = `${(tempo / 10) * 100}%`; // Atualiza a barra conforme o tempo diminui

        if (tempo <= 0) {
            clearInterval(intervalo); // Para o timer quando o tempo acabar
            // Pode adicionar lógica aqui para o que acontece quando o tempo acaba
        }
    }, 1000); // Atualiza a cada 1 segundo
}

function verificarResposta(escolha) {
    clearInterval(intervalo); // Limpa o intervalo ao verificar a resposta

    let perguntaAtual = perguntas[indicePerguntaAtual]; // Pega a pergunta atual
    let botoes = document.querySelectorAll("#opcoes button"); // Pega todos os botões de resposta

    if (escolha === perguntaAtual.correta) { // Se a escolha for correta
        botoes[escolha].classList.add("correta"); // Adiciona a classe 'correta' ao botão
        pontuacao += 100; // Aumenta a pontuação
    } else { // Se a escolha for errada
        if (escolha !== -1) { // Se o jogador não optou por não responder
            botoes[escolha].classList.add("errada"); // Adiciona a classe 'errada' ao botão
        }
        botoes[perguntaAtual.correta].classList.add("correta"); // Marca a resposta correta
    }

    document.getElementById("pontuacao").innerText = `Pontuação: ${pontuacao}`; // Exibe a pontuação atual

    setTimeout(() => {
        indicePerguntaAtual++; // Avança para a próxima pergunta
        carregarPergunta(); // Carrega a próxima pergunta
    }, 1000); // Espera 1 segundo para carregar a próxima pergunta
}

function verificarPontuacao() {
    if (pontuacao >= 300) {
        alert(`Level-UP! Sua pontuação foi ${pontuacao}`);
    } else if (pontuacao === 100) {
        alert(`Game-Over! Mais sorte na próxima vez!`);
    } else {
        alert(`Game-Over! Mais sorte na próxima vez!`);
    }
}

window.onload = iniciarJogo; // Inicia o jogo assim que a página for carregada

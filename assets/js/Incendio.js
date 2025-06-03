const perguntas = [
    {
        pergunta: "Qual o primeiro passo ao identificar um princípio de incêndio?",
        opcoes: ["Fugir", "Registrar o incêndio", "Tentar apagar sozinho", "Acionar a brigada"],
        correta: 3 // Resposta correta: Acionar a brigada
    },
    {
        pergunta: "Sinalizações de emergência devem ser:",
        opcoes: ["Escondidas", "Visíveis e iluminadas", "Pintadas no chão", "Somente em locais de risco"],
        correta: 1 // Resposta correta: Visiveis e iluminadas
    },
    {
        pergunta: "Ao combater fogo em equipamentos elétricos, deve-se usar:",
        opcoes: ["Água", "Areia", "Extintor de CO₂", "Espuma"],
        correta: 2 // Resposta correta: Extintor de CO²
    },
    {
        pergunta: "Qual deve ser a atitude do brigadista em uma evacuação?",
        opcoes: ["Sair primeiro", "Ajudar e orientar", "Ignorar a situação", "Gritar"],
        correta: 1 // Resposta correta: Ajudar e orientar
    },
    {
        pergunta: "Qual é o número do Corpo de Bombeiros?",
        opcoes: ["180", "190", "191", "193"],
        correta: 3 // Resposta correta: 193
    },
    {
        pergunta: "O uso correto do extintor começa por:",
        opcoes: ["Apontar para cima", "Retirar o pino de segurança", "Testar o gatilho", "Abaixar o equipamento"],
        correta: 1 // Resposta correta: Retirar o pino de segurança
    },
    {
        pergunta: "O que fazer ao ouvir o alarme de incêndio?",
        opcoes: ["Continuar trabalhando", "Se esconder", "Iniciar evacuação", "Ligar para a gerência"],
        correta: 2 // Resposta correta: Iniciar a evacuação
    },
    {
        pergunta: "Qual o principal risco de incêndios elétricos?",
        opcoes: ["Gases tóxicos", "Explosão", "Choques", "Barulho"],
        correta: 2 // Resposta correta: Coque
    },
    {
        pergunta: "A fumaça sobe porque:",
        opcoes: ["É mais densa", "É fria", "Tem muito oxigênio", "É mais leve"],
        correta: 3 // Resposta correta: É mais leve que o ar
    },
    {
        pergunta: "A brigada atua apenas em incêndios?",
        opcoes: ["Sim", "Não, também em emergências", "Só em fábricas", "Só em escolas"],
        correta: 1 // Resposta correta: Não, também em emergências
    },
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

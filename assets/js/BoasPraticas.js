const perguntas = [
    {
        pergunta: "O que significa reciclar?",
        opcoes: ["Jogar lixo fora", "Reutilizar materiais descartados", "Comprar produtos novos", "Queimar lixo"],
        correta: 1
    },
    {
        pergunta: "Qual material não pode ser reciclado?",
        opcoes: ["Espelho", "Garrafa PET", "Isopor", "Papelão"],
        correta: 0
    },
    {
        pergunta: "Pilhas devem ser descartadas onde?",
        opcoes: ["Coleta seletiva comum", "Lixo orgânico", "Postos de coleta específicos", "Vasos de plantas"],
        correta: 2
    },
    {
        pergunta: "O que é compostagem?",
        opcoes: ["Queimar lixo", "Enterrar plásticos", "Transformar orgânicos em adubo", "Lavar o lixo"],
        correta: 2
    },
    {
        pergunta: "Qual a atitude mais sustentável?",
        opcoes: ["Usar descartáveis", "Jogar lixo no chão", "Comprar mais roupas", "Plantar árvores"],
        correta: 3
    },
    {
        pergunta: "O que é consumo consciente?",
        opcoes: ["Comprar tudo", "Pensar antes de comprar", "Gastar mais", "Comprar por impulso"],
        correta: 1
    },
    {
        pergunta: "Separar o lixo corretamente ajuda a:",
        opcoes: ["Reduzir o impacto ambiental ", "Contaminar a água", "Gastar mais", " Poluir o ar"],
        correta: 0
    },
    {
        pergunta: "Ter um local para cada tipo de lixo é:",
        opcoes: ["Desperdício", "Inútil", "Lento", "Organização"],
        correta: 3
    },
    {
        pergunta: "Organizar produtos por data evita:",
        opcoes: ["Desperdício", "Limpeza", "Poluição", "Trabalho"],
        correta: 0
    },
    {
        pergunta: "Qual é uma atitude ecológica no dia a dia?",
        opcoes: ["Usar canudo de plástico", "Reutilizar sacolas", "Lavar calçada com mangueira", "Comprar tudo novo"],
        correta: 1
    },
];

let indicePerguntaAtual = 0;
let pontuacao = 0;
let tempo = 60;
let intervalo;

function iniciarJogo() {
    carregarPergunta();
}

function carregarPergunta() {
    clearInterval(intervalo);
    tempo = 60;

    if (indicePerguntaAtual >= perguntas.length) {
        verificarPontuacao();
        window.location.href = 'feedback.html';
        return;
    }

    let perguntaAtual = perguntas[indicePerguntaAtual];
    document.getElementById("pergunta").innerText = perguntaAtual.pergunta;

    let opcoesContainer = document.getElementById("opcoes");
    opcoesContainer.innerHTML = "";

    perguntaAtual.opcoes.forEach((item, index) => {
        let botao = document.createElement("button");
        botao.innerText = item;
        botao.onclick = () => verificarResposta(index);
        opcoesContainer.appendChild(botao);
    });

    iniciarTimer();
}

function iniciarTimer() {
    const barraTempo = document.getElementById("barra-tempo");
    barraTempo.style.width = "100%";

    intervalo = setInterval(function () {
        tempo--;
        barraTempo.style.width = `${(tempo / 60) * 100}%`;

        if (tempo <= 0) {
            clearInterval(intervalo);
            setTimeout(() => {
                indicePerguntaAtual++;
                carregarPergunta();
            }, 5000);
        }
    }, 1000);
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

window.onload = iniciarJogo;

    const nome = localStorage.getItem("username");
            if (nome) {
            document.getElementById("saudacao").innerText = `${nome}`;
            };

 const pontuacao = localStorage.getItem("pontuacao");
            if (nome) {
            document.getElementById("pontuacao1").innerText = `${pontuacao}`;
            };

   const status = localStorage.getItem("Status");
        const botao = document.getElementById("botaoSeguir");
                    if (pontuacao >= 500) {
                    document.getElementById("result-valor").innerText = `APROVADO`;
                    document.getElementById("result-valor").style.color = "green";
                    
                    } else {
                    document.getElementById("result-valor").innerText = `REPROVADO`;
                    document.getElementById("result-valor").style.color = "red";
                    botao.style.display = "inline"; 
                    };
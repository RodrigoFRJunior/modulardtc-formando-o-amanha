 // Script para validar se é o admin ou usuario para redirecionar a tela correta
    function validarLogin(event) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const emailAdministrador = 'admin@gmail.com';
        const passwordAdministrador = 'admin';
                    
        if (email === emailAdministrador && password === passwordAdministrador) {
            alert('Bem-vindo, Administrador!');

            window.location.href = 'pages/painelAdministrador.html'
                                    
        } else {

            window.location.href = 'pages/select_minigame.html';
            }
        }

document.addEventListener("DOMContentLoaded", function () {
    const cpfInput = document.getElementById("cpf");

    cpfInput.addEventListener("input", function () {
        let cpf = cpfInput.value;

        // Remove tudo que não for número
        cpf = cpf.replace(/\D/g, "");

        // Formata o CPF (000.000.000-00)
        if (cpf.length > 3 && cpf.length <= 6) {
            cpf = cpf.replace(/(\d{3})(\d+)/, "$1.$2");
        } else if (cpf.length > 6 && cpf.length <= 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
        } else if (cpf.length > 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
        }

        // Atualiza o valor no input
        cpfInput.value = cpf;
    });
});
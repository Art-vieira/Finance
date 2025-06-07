document.addEventListener("DOMContentLoaded", () => {

    const botaovolta = document.querySelector(".voltar");
    const botaosimula = document.querySelector(".next");

    const taxas = {
        'Caixa': 1.0487,
        'Santander': 1.0567,
        'Bradesco': 1.0532,
        'Itaú': 1.0519,
        'Nubank': 1.0595,
        'Inter': 1.0602
    };

    function formatarCampo(valor) {
        return Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    if (botaosimula) {
        botaosimula.addEventListener('click', () => {
            const valorinput = document.getElementById('amount').value.replace(/\D/g, '');
            const banco = document.getElementById('banco').value;
            const parcela = document.getElementById('parcela').value;
            const mesesopcoes = [6, 12, 18, 24, 36, 48, 60, 72];

console.log(parcela)

            if (!valorinput || !banco || !parcela) {
                alert("Preencha todos os campos!");
                return;
            }

            const valor = parseFloat(valorinput);
            const meses = parcela;
            const taxa = taxas[banco];
            const valorfinal = valor * Math.pow(taxa, meses);
            const valorparcela = valorfinal / meses;

            // usar na outra pagina
            sessionStorage.setItem('parcela', formatarCampo(valorparcela));
            sessionStorage.setItem('valorfinal', formatarCampo(valorfinal));
            sessionStorage.setItem('meses', `${meses} meses`);

            window.location.href = "simulacao.html";
        });
    }

    // outra pagina

    if (botaovolta) {
        document.querySelector('.parcela').textContent = sessionStorage.getItem('parcela');
        document.querySelector('.valor_final').textContent = sessionStorage.getItem('valorfinal');
        document.querySelector('.financia').textContent = sessionStorage.getItem('meses');

        botaovolta.addEventListener('click', () => {
            window.location.href = "index.html";
        });
    }
})
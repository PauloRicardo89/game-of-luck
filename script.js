var numeroPensado = Math.floor(Math.random() * 10) + 1;
var tentativas = 3;
var vitorias = 0;
var derrotas = 0;

function verificarResposta() {
    var chute = parseInt(document.getElementById("chute").value);
    var resultado = document.getElementById("resultado");
    if (chute == numeroPensado) {
        resultado.innerHTML =
            "<span style='color: green;'>Parabéns, você acertou!!!</span>";
        mostrarFogos();
        tentativas = 3;
        numeroPensado = Math.floor(Math.random() * 10); // Novo número para a próxima rodada
        vitorias++;
        document.getElementById("placar-vitorias").textContent =
            "Vitórias: " + vitorias;
    } else {
        tentativas--;
        if (tentativas == 2) {
            resultado.innerHTML =
                "<span style='color: red;'>Você errou, e está quase acabando as tentativas. Você tem " +
                tentativas +
                " tentativas restantes.</span>";
        } else if (tentativas == 1) {
            resultado.innerHTML =
                "<span style='color: red;'>Você errou, e está azarado demais, ultima chance. Você tem " +
                tentativas +
                " tentativa restante.</span>";
        } else {
            resultado.innerHTML =
                "<span style='color: red;'>Você errou todas! SAI DAQUI SEU AZARADO. O número era " +
                numeroPensado +
                ". Continue tentando.</span>";
            tentativas = 3;
            numeroPensado = Math.round(Math.random() * 10); // Novo número para a próxima rodada
            derrotas++;
            document.getElementById("placar-derrotas").textContent =
                "Derrotas: " + derrotas;
        }
    }
}
function reiniciarJogo() {
    numeroPensado = Math.floor(Math.random() * 10) + 1; // Gera um novo número
    document.getElementById("chute").value = ""; // Limpa o campo de entrada
    document.getElementById("resultado").innerHTML = ""; // Limpa a mensagem de resultado
    tentativas = 3; // Restaura o número de tentativas

    // Zera o placar
    vitorias = 0;
    derrotas = 0;
    document.getElementById("placar-vitorias").textContent =
        "Vitórias: " + vitorias;
    document.getElementById("placar-derrotas").textContent =
        "Derrotas: " + derrotas;
}
function mostrarFogos() {
    var fireworks = document.getElementById("fireworks");
    fireworks.innerHTML = "";
    for (var i = 0; i < 150; i++) {
        // Aumentando o número de fogos de artifício
        var firework = document.createElement("div");
        firework.classList.add("firework");
        firework.style.left = `${50 + (Math.random() - 0.5) * 100}%`;
        firework.style.backgroundColor = `hsl(${
            Math.random() * 360
        }, 100%, 50%)`;
        firework.style.animationDelay = `${i * 20}ms`; // Reduzindo o atraso para uma sequência mais rápida
        fireworks.appendChild(firework);
        // Criando explosões secundárias
        for (var j = 0; j < 5; j++) {
            var miniExplosion = document.createElement("div");
            miniExplosion.classList.add("mini-explosion");
            miniExplosion.style.left = `${firework.style.left}`;
            miniExplosion.style.backgroundColor =
                firework.style.backgroundColor;
            miniExplosion.style.animationDelay = `${800 + i * 20 + j * 100}ms`; // Atraso para coincidir com a explosão principal
            fireworks.appendChild(miniExplosion);
        }
    }
    fireworks.style.display = "block";
    setTimeout(() => {
        fireworks.style.display = "none";
    }, 7000); // Aumentando o tempo total da animação
}

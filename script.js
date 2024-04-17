// Função para gerar um número aleatório
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 10) + 1;
}

let numeroPensado = gerarNumeroAleatorio();
let tentativas = 3;
let vitorias = 0;
let derrotas = 0;

function verificarResposta() {
    let chute = parseInt(document.getElementById('chute').value);
    let resultado = document.getElementById('resultado');
    if (chute === numeroPensado) {
        resultado.textContent = "Parabéns, você acertou!!!";
        resultado.style.color = 'green';
        mostrarFogos();
        tentativas = 3;
        numeroPensado = gerarNumeroAleatorio(); // Novo número para a próxima rodada
        vitorias++;
        document.getElementById('placar-vitorias').textContent = `Vitórias: ${vitorias}`;
    } else {
        tentativas--;
        if(tentativas > 0) {
            resultado.textContent = `Você errou, Você tem ${tentativas} tentativas restantes.`;
            resultado.style.color = 'red';
        } else {
            resultado.textContent = `Você errou todas! O número era ${numeroPensado}. Continue tentando.`;
            resultado.style.color = 'red';
            tentativas = 3;
            numeroPensado = gerarNumeroAleatorio(); // Novo número para a próxima rodada
            derrotas++;
            document.getElementById('placar-derrotas').textContent = `Derrotas: ${derrotas}`;
        }
    }
}
function reiniciarJogo() {
    // Exibe uma caixa de diálogo de confirmação
    let confirmacao = confirm("Tem certeza de que deseja reiniciar o jogo? Todas as pontuações serão perdidas.");
    
    // Se o usuário clicar em "OK", o jogo será reiniciado
    if (confirmacao == true) {
        numeroPensado = gerarNumeroAleatorio(); // Gera um novo número
        document.getElementById('chute').value = ''; // Limpa o campo de entrada
        document.getElementById('resultado').textContent = ''; // Limpa a mensagem de resultado
        tentativas = 3; // Restaura o número de tentativas

        // Zera o placar
        vitorias = 0;
        derrotas = 0;
        document.getElementById('placar-vitorias').textContent = `Vitórias: ${vitorias}`;
        document.getElementById('placar-derrotas').textContent = `Derrotas: ${derrotas}`;
    }
}

function mostrarFogos() {
    let fireworks = document.getElementById('fireworks');
    fireworks.innerHTML = '';
    for (let i = 0; i < 150; i++) { 
        let firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${50 + (Math.random() - 0.5) * 100}%`;
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        firework.style.animationDelay = `${i * 20}ms`; 
        fireworks.appendChild(firework);
        for (let j = 0; j < 5; j++) {
            let miniExplosion = document.createElement('div');
            miniExplosion.classList.add('mini-explosion');
            miniExplosion.style.left = `${firework.style.left}`;
            miniExplosion.style.backgroundColor = firework.style.backgroundColor;
            miniExplosion.style.animationDelay = `${800 + i * 20 + j * 100}ms`;
            fireworks.appendChild(miniExplosion);
        }
    }
    fireworks.style.display = 'block';
    setTimeout(() => { fireworks.style.display = 'none'; }, 7000); 
}
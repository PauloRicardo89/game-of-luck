document.addEventListener("DOMContentLoaded", function () {
  // Variáveis do jogo
  let minNum = 1;
  let maxNum = 10;
  let numeroPensado;
  let tentativas;
  let vitorias = localStorage.getItem("vitorias")
    ? parseInt(localStorage.getItem("vitorias"))
    : 0;
  let derrotas = localStorage.getItem("derrotas")
    ? parseInt(localStorage.getItem("derrotas"))
    : 0;
  let timer;
  let segundos = 0;
  let jogoAtivo = false;
  let melhorTempo = localStorage.getItem("melhorTempo")
    ? parseInt(localStorage.getItem("melhorTempo"))
    : null;

  // Elementos DOM
  const chuteInput = document.getElementById("chute");
  const verificarBtn = document.getElementById("verificar-btn");
  const reiniciarBtn = document.getElementById("reiniciar-btn");
  const resultadoDiv = document.getElementById("resultado");
  const dicaDiv = document.getElementById("dica");
  const dificuldadeSelect = document.getElementById("dificuldade");
  const placarVitorias = document.getElementById("placar-vitorias");
  const placarDerrotas = document.getElementById("placar-derrotas");
  const timerDisplay = document.getElementById("timer");
  const melhorTempoDisplay = document.getElementById("melhor-tempo");
  const gameImage = document.getElementById("game-image");

  // Função para gerar um número aleatório com base na dificuldade
  function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Inicializar o jogo
  function iniciarJogo() {
    minNum = 1;
    maxNum = getMaxNumByDifficulty();

    document.getElementById("min-num").textContent = minNum;
    document.getElementById("max-num").textContent = maxNum;
    chuteInput.setAttribute("max", maxNum);

    numeroPensado = gerarNumeroAleatorio(minNum, maxNum);
    tentativas = getDificuldadeTentativas();
    jogoAtivo = true;

    chuteInput.value = "";
    resultadoDiv.textContent = "";
    resultadoDiv.className = "mensagem";
    dicaDiv.textContent = "";

    segundos = 0;
    timerDisplay.textContent = `Tempo: ${segundos}s`;
    clearInterval(timer);

    timer = setInterval(() => {
      segundos++;
      timerDisplay.textContent = `Tempo: ${segundos}s`;
    }, 1000);

    // Atualizar o placar
    atualizarPlacar();

    // Set focus to input
    chuteInput.focus();
  }

  // Funções para configurações de dificuldade
  function getMaxNumByDifficulty() {
    const dificuldade = dificuldadeSelect.value;

    switch (dificuldade) {
      case "facil":
        return 10;
      case "medio":
        return 50;
      case "dificil":
        return 100;
      default:
        return 10;
    }
  }

  function getDificuldadeTentativas() {
    const dificuldade = dificuldadeSelect.value;

    switch (dificuldade) {
      case "facil":
        return 3;
      case "medio":
        return 5;
      case "dificil":
        return 7;
      default:
        return 3;
    }
  }

  // Verificar a resposta do usuário
  function verificarResposta() {
    if (!jogoAtivo) return;

    let chute = parseInt(chuteInput.value);

    // Validação da entrada
    if (isNaN(chute) || chute < minNum || chute > maxNum) {
      resultadoDiv.textContent = `Por favor, digite um número válido entre ${minNum} e ${maxNum}.`;
      resultadoDiv.className = "mensagem error";
      return;
    }

    if (chute === numeroPensado) {
      resultadoDiv.textContent = "Parabéns, você acertou!!!";
      resultadoDiv.className = "mensagem success";
      mostrarFogos();
      jogoAtivo = false;
      clearInterval(timer);

      // Verificar e atualizar melhor tempo
      if (melhorTempo === null || segundos < melhorTempo) {
        melhorTempo = segundos;
        localStorage.setItem("melhorTempo", melhorTempo);
        melhorTempoDisplay.textContent = `Melhor tempo: ${melhorTempo}s`;
      }

      vitorias++;
      localStorage.setItem("vitorias", vitorias);
      gameImage.src = "sorte3.jpeg"; // Mudar para a imagem da vitória

      setTimeout(() => {
        iniciarJogo(); // Iniciar novo jogo após a comemoração
        gameImage.src = "sorte 2.jpeg"; // Voltar para a imagem padrão
      }, 7000); // Aumentado para corresponder ao tempo da animação
    } else {
      tentativas--;
      if (tentativas > 0) {
        resultadoDiv.textContent = `Você errou! Você tem ${tentativas} tentativas restantes.`;
        resultadoDiv.className = "mensagem error";

        // Dar dica para o usuário
        dicaDiv.textContent =
          chute > numeroPensado
            ? "Dica: O número é menor!"
            : "Dica: O número é maior!";
      } else {
        resultadoDiv.textContent = `Você errou todas! O número era ${numeroPensado}.`;
        resultadoDiv.className = "mensagem error";
        jogoAtivo = false;
        clearInterval(timer);

        derrotas++;
        localStorage.setItem("derrotas", derrotas);

        setTimeout(iniciarJogo, 3000); // Iniciar novo jogo após 3 segundos
      }
    }

    atualizarPlacar();
    chuteInput.value = "";
    chuteInput.focus();
  }

  // Reiniciar o jogo completamente
  function reiniciarJogo() {
    let confirmacao = confirm(
      "Tem certeza de que deseja reiniciar o jogo? Todas as pontuações serão perdidas."
    );

    if (confirmacao) {
      vitorias = 0;
      derrotas = 0;
      melhorTempo = null;

      localStorage.setItem("vitorias", vitorias);
      localStorage.setItem("derrotas", derrotas);
      localStorage.removeItem("melhorTempo");

      melhorTempoDisplay.textContent = "Melhor tempo: --";

      iniciarJogo();
    }
  }

  // Atualizar o placar
  function atualizarPlacar() {
    placarVitorias.textContent = `Vitórias: ${vitorias}`;
    placarDerrotas.textContent = `Derrotas: ${derrotas}`;

    if (melhorTempo !== null) {
      melhorTempoDisplay.textContent = `Melhor tempo: ${melhorTempo}s`;
    }
  } // Animação de comemoração aprimorada
  function mostrarFogos() {
    let fireworks = document.getElementById("fireworks");
    fireworks.innerHTML = "";

    // Verificar se é um dispositivo de baixo desempenho
    const lowPerfMode = isLowPerfDevice();

    // Adicionar flash de luz inicial
    const flash = document.createElement("div");
    flash.classList.add("flash");
    fireworks.appendChild(flash);

    // Adicionar texto de parabéns
    const congratsText = document.createElement("div");
    congratsText.classList.add("congrats-text");
    congratsText.textContent = "PARABÉNS!";
    fireworks.appendChild(congratsText);

    // Definir quantidade de efeitos baseado na performance do dispositivo
    const fogoQtd = lowPerfMode ? 10 : 20;
    const particulasQtd = lowPerfMode ? 15 : 30;
    const confetesQtd = lowPerfMode ? 100 : 300;
    const estrelasQtd = lowPerfMode ? 20 : 50;
    const segundaOndaQtd = lowPerfMode ? 50 : 150;

    // Criar fogos de artifício em posições aleatórias
    for (let i = 0; i < fogoQtd; i++) {
      let firework = document.createElement("div");
      firework.classList.add("firework");
      firework.style.left = `${Math.random() * 100}%`;
      firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      firework.style.animationDelay = `${i * 100}ms`;
      fireworks.appendChild(firework);

      // Criar partículas para cada explosão
      setTimeout(() => {
        const explosionX = firework.getBoundingClientRect().left;
        const explosionY = firework.getBoundingClientRect().top;

        // Criar partículas em cada explosão, quantidade adaptável
        for (let j = 0; j < particulasQtd; j++) {
          const particle = document.createElement("div");
          particle.classList.add("particle");
          particle.style.left = `${explosionX}px`;
          particle.style.top = `${explosionY}px`;
          // Velocidade e direção aleatória - melhorando a distribuição
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 15;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;

          // Cor da partícula
          particle.style.backgroundColor = firework.style.backgroundColor;

          // Aplicar movimento via animação
          particle.style.transform = `translate(${vx * 20}px, ${vy * 20}px)`;

          fireworks.appendChild(particle);
        }
      }, 800 + i * 100);
    }

    // Criar confetes caindo - quantidade adaptativa
    for (let i = 0; i < confetesQtd; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 3}s`;
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

      // Formas aleatórias mais variadas para os confetes
      const shapes = ["5px", "0 0 5px 5px", "50%", "0", "0 50% 50% 0"];
      confetti.style.borderRadius =
        shapes[Math.floor(Math.random() * shapes.length)];

      // Tamanhos mais variados
      const size = 4 + Math.random() * 12;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      // Opacidade variada para dar mais profundidade
      confetti.style.opacity = `${0.7 + Math.random() * 0.3}`;

      fireworks.appendChild(confetti);
    }

    // Criar estrelas brilhantes - mais estrelas e com mais brilho
    for (let i = 0; i < estrelasQtd; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 4}s`;

      // Tamanho variável das estrelas
      const starSize = 8 + Math.random() * 18;
      star.style.width = `${starSize}px`;
      star.style.height = `${starSize}px`;

      // Cores variadas para algumas estrelas
      if (Math.random() > 0.7) {
        star.style.backgroundColor = `hsl(${
          Math.random() * 60 + 40
        }, 100%, 80%)`;
      }

      // Algumas estrelas com efeito de piscar
      if (Math.random() > 0.6) {
        star.style.animation = `starFall 2s ease-in-out forwards, blink ${
          0.3 + Math.random() * 0.7
        }s infinite alternate`;
      }

      fireworks.appendChild(star);
    }

    // Segunda onda de confetes após um tempo, se não estiver em modo de baixa performance
    if (!lowPerfMode) {
      setTimeout(() => {
        for (let i = 0; i < segundaOndaQtd; i++) {
          const confetti = document.createElement("div");
          confetti.classList.add("confetti");
          confetti.style.left = `${Math.random() * 100}%`;
          confetti.style.animationDelay = `${Math.random() * 1}s`;
          confetti.style.backgroundColor = `hsl(${
            Math.random() * 360
          }, 100%, 50%)`;
          confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
          const size = 3 + Math.random() * 8;
          confetti.style.width = `${size}px`;
          confetti.style.height = `${size}px`;
          fireworks.appendChild(confetti);
        }
      }, 1200);
    }

    fireworks.style.display = "block";

    setTimeout(() => {
      fireworks.style.display = "none";
      fireworks.innerHTML = "";
    }, 7000);
  }

  // Detectar dispositivos de menor desempenho para otimização
  function isLowPerfDevice() {
    // Verificando se é um dispositivo móvel (heurística simples)
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Se for mobile, assumimos que provavelmente tem menor capacidade de processamento
    // Poderíamos adicionar mais verificações aqui para refinar essa detecção
    return isMobile;
  }

  // Event Listeners
  verificarBtn.addEventListener("click", verificarResposta);
  reiniciarBtn.addEventListener("click", reiniciarJogo);

  chuteInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      verificarResposta();
    }
  });

  dificuldadeSelect.addEventListener("change", iniciarJogo);

  // Iniciar jogo ao carregar
  atualizarPlacar();
  iniciarJogo();
});

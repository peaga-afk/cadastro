// ===== HEARTS FLOATING =====
const heartEmojis = ['❤️','💕','💗','💓','💘','💝','🌹','✨','💋','💞','🫶','💌'];
function spawnHeart() {
  const el = document.createElement('span');
  el.className = 'floating-heart';
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
  const dur = 8 + Math.random() * 10;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = Math.random() * 4 + 's';
  document.getElementById('heartsBg').appendChild(el);
  setTimeout(() => el.remove(), (dur + 4) * 1000);
}
setInterval(spawnHeart, 700);
for (let i = 0; i < 8; i++) spawnHeart();

// ===== FLOATING ROMANTIC QUOTES =====
const quotes = [
  'Você é o motivo do meu sorriso 💕',
  'Queria te mandar uma mensagem, mas meu coração já foi na frente 💌',
  'Tem uma vaga aberta no meu coração. Candidata-se?',
  'Você brilha mais que as estrelas ✨',
  'Meu coração tem seu nome escrito 🌹',
  'Eu te escolheria sempre 💗',
  'Sorri só de pensar em você 😊',
  'A melhor parte do dia é quando você aparece',
  'Você é minha cor favorita 💕',
  'Encontrar você foi o melhor acidente da minha vida ✨'
];
function spawnQuote() {
  const el = document.createElement('div');
  el.className = 'float-quote';
  el.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  el.style.left  = (5 + Math.random() * 85) + 'vw';
  el.style.top   = (10 + Math.random() * 80) + 'vh';
  el.style.animationDuration = (6 + Math.random() * 4) + 's';
  document.getElementById('floatingQuotes').appendChild(el);
  setTimeout(() => el.remove(), 10000);
}
setInterval(spawnQuote, 4500);

// ===== CANDIDATE COUNTER =====
let count = 3847;
const countEl = document.getElementById('candidateCount');
function animateCount(target) {
  let start = 0;
  const dur = 2000;
  const step = (timestamp) => {
    if (!step.startTime) step.startTime = timestamp;
    const p = Math.min((timestamp - step.startTime) / dur, 1);
    countEl.textContent = Math.floor(p * target).toLocaleString('pt-BR');
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
animateCount(count);
setInterval(() => {
  count += Math.floor(Math.random() * 3) + 1;
  countEl.textContent = count.toLocaleString('pt-BR');
}, 5000);

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-title, .about-text, .req-col, .req-note, .testimonial-card, .love-form, .section-desc').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

document.querySelectorAll('.benefit-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 60) + 'ms';
  observer.observe(el);
});

// ===== FILE UPLOAD PREVIEW =====
const fotoInput = document.getElementById('fotoInput');
const photoPreview = document.getElementById('photoPreview');
const fileName = document.getElementById('fileName');

fotoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  fileName.textContent = file.name;
  const reader = new FileReader();
  reader.onload = (ev) => {
    photoPreview.style.display = 'block';
    photoPreview.innerHTML = `<img src="${ev.target.result}" alt="Preview" />`;
  };
  reader.readAsDataURL(file);
});

// ===== SOUND TOGGLE =====
let soundOn = false;
const soundBtn = document.getElementById('soundBtn');
soundBtn.addEventListener('click', () => {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? '🔊' : '🔇';
  soundBtn.title = soundOn ? 'Desativar som' : 'Ativar som';
});

function playHeartSound() {
  if (!soundOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(523, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(784, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch(e) {}
}

// ===== FORM SUBMISSION =====
const loveForm = document.getElementById('loveForm');

loveForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  playHeartSound();
  showAnalysis();

  const formData = new FormData(loveForm);

  try {
    const res = await fetch('/candidatar', {
      method: 'POST',
      body: formData
    });
    // Email sent silently in background
    console.log('Candidatura enviada!', await res.json());
  } catch(err) {
    console.log('Rodando localmente ou sem servidor - mostrando resultado mesmo assim!');
  }
});

// ===== ANALYSIS ANIMATION =====
const analysisSteps = [
  'Verificando nível de fofura...',
  'Analisando compatibilidade de memes...',
  'Calculando potencial de abraços...',
  'Testando resistência a apelidos bobos...',
  'Avaliando histórico de sorrisos...',
  'Confirmando disponibilidade para dates...',
  'Medindo intensidade do olhar...',
  'Compilando relatório emocional...',
  'Resultado chegando...'
];

function showAnalysis() {
  const overlay = document.getElementById('analysisOverlay');
  overlay.classList.add('active');
  overlay.style.display = 'flex';

  const progressFill = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  const scoreDiv = document.getElementById('compatibilityScore');
  const scoreNum = document.getElementById('scoreNumber');
  const finalMsg = document.getElementById('finalMessage');

  let step = 0;
  let progress = 0;
  const totalDuration = 5500;
  const stepDuration = totalDuration / analysisSteps.length;

  const interval = setInterval(() => {
    if (step < analysisSteps.length) {
      progressLabel.textContent = analysisSteps[step];
      progress = Math.min(((step + 1) / analysisSteps.length) * 95, 95);
      progressFill.style.width = progress + '%';
      step++;
    } else {
      clearInterval(interval);
      progressFill.style.width = '100%';
      progressLabel.textContent = 'Análise concluída! ✅';

      setTimeout(() => {
        scoreDiv.style.display = 'block';
        const finalScore = 85 + Math.floor(Math.random() * 15);
        let n = 0;
        const scoreTimer = setInterval(() => {
          n = Math.min(n + 2, finalScore);
          scoreNum.textContent = n;
          if (n >= finalScore) {
            clearInterval(scoreTimer);
            setTimeout(() => {
              scoreDiv.style.display = 'none';
              finalMsg.style.display = 'block';
              launchConfetti();
              playHeartSound();
            }, 1200);
          }
        }, 30);
      }, 600);
    }
  }, stepDuration);
}

// ===== CONFETTI =====
const confettiColors = ['#e8305a','#ff8fab','#d4a843','#f5d78e','#3d0c22','#ff6b8a'];
function launchConfetti() {
  const area = document.getElementById('confettiArea');
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = (Math.random() * 100) + '%';
      piece.style.top = '0';
      piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = piece.style.width;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      area.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }, i * 60);
  }
}

function restartPage() {
  document.getElementById('analysisOverlay').classList.remove('active');
  document.getElementById('analysisOverlay').style.display = 'none';
  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('progressLabel').textContent = 'Verificando nível de fofura...';
  document.getElementById('compatibilityScore').style.display = 'none';
  document.getElementById('finalMessage').style.display = 'none';
  document.getElementById('scoreNumber').textContent = '0';
  loveForm.reset();
  photoPreview.style.display = 'none';
  fileName.textContent = 'Clique para escolher uma foto';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

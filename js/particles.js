// ============================================
// Particles Background — Matrix Rain + Nodes
// ============================================

(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles, lines, animId;

  const CONFIG = {
    particleCount: 60,
    lineDistance: 140,
    particleColor: 'rgba(255, 61, 87, ',
    lineColor: 'rgba(0, 229, 255, ',
    speed: 0.4,
    radius: { min: 1, max: 2.5 },
  };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : -10;
      this.vx = (Math.random() - 0.5) * CONFIG.speed;
      this.vy = (Math.random() - 0.5) * CONFIG.speed;
      this.r = CONFIG.radius.min + Math.random() * (CONFIG.radius.max - CONFIG.radius.min);
      this.alpha = 0.2 + Math.random() * 0.5;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.03;

      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }

    draw() {
      const a = this.alpha * (0.8 + 0.2 * Math.sin(this.pulse));
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.particleColor + a + ')';
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: CONFIG.particleCount }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.lineDistance) {
          const opacity = (1 - dist / CONFIG.lineDistance) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = CONFIG.lineColor + opacity + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  // Matrix rain columns (subtle, in the background)
  let matrixColumns = [];
  const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';

  function initMatrix() {
    const cols = Math.floor(W / 20);
    matrixColumns = Array.from({ length: cols }, () => ({
      y: Math.random() * H,
      speed: 0.5 + Math.random() * 1,
      char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
      alpha: 0.03 + Math.random() * 0.04,
    }));
  }

  function drawMatrix() {
    matrixColumns.forEach((col, i) => {
      col.y += col.speed;
      if (col.y > H) {
        col.y = -20;
        col.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      }
      if (Math.random() < 0.05) {
        col.char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      }

      ctx.font = '12px "Share Tech Mono", monospace';
      ctx.fillStyle = `rgba(255, 61, 87, ${col.alpha})`;
      ctx.fillText(col.char, i * 20, col.y);
    });
  }

  function fullAnimate() {
    ctx.clearRect(0, 0, W, H);
    drawMatrix();
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(fullAnimate);
  }

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    init();
    initMatrix();
    fullAnimate();
  });

  init();
  initMatrix();
  fullAnimate();
})();

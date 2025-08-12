const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let w, h;
function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }

  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.15;
    this.speedY = (Math.random() - 0.5) * 0.15;
    this.alpha = Math.random() * 0.8 + 0.2;
    this.alphaSpeed = (Math.random() * 0.02) + 0.005;
    this.alphaDirection = Math.random() < 0.5 ? 1 : -1;
    this.color = Math.random() < 0.5 ? '#00aaff' : '#ffffff';
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > w) this.speedX *= -1;
    if (this.y < 0 || this.y > h) this.speedY *= -1;

    this.alpha += this.alphaSpeed * this.alphaDirection;
    if (this.alpha >= 1) this.alphaDirection = -1;
    if (this.alpha <= 0.2) this.alphaDirection = 1;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, 'rgba(0, 170, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const particles = [];
const PARTICLE_COUNT = 120;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.update();
    p.draw(ctx);
  });
  requestAnimationFrame(animate);
}

animate();

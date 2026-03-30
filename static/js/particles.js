// Particle Field — drift mode, adapted for kengru.do palette
// Needs <canvas id="bg"> and window._gen = 0
(function () {
  var gen = window._gen;
  var canvas = document.getElementById("bg");
  var ctx = canvas.getContext("2d");

  var width, height, cx, cy;
  var maxParticles = 200;
  var connectionDist = 110;
  var particles = [];

  var holeRadius = 30;
  var gravityStrength = 15;
  var eventHorizon = 15;

  // Detect color scheme
  var darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Dark: digital-slate bg, nordic-mist particles
  // Light: light bg, digital-slate particles
  var BG = darkMode ? "rgba(15,24,34," : "rgba(248,249,250,";
  var RGB = darkMode ? [214, 215, 213] : [15, 24, 34];
  var ACCENT = [221, 230, 31]; // golden-glow

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    darkMode = e.matches;
    BG = darkMode ? "rgba(15,24,34," : "rgba(248,249,250,";
    RGB = darkMode ? [214, 215, 213] : [15, 24, 34];
  });

  function spawnParticle() {
    var angle = Math.random() * Math.PI * 2;
    var dist = holeRadius * 2 + Math.random() * (Math.min(width, height) * 0.45);
    var speed = 0.1 + Math.random() * 0.2;
    return {
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      brightness: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.01 + Math.random() * 0.02,
      life: 1.0,
      maxLife: 300 + Math.floor(Math.random() * 400),
      age: 0,
      size: 0.8 + Math.random() * 1.5,
      isAccent: Math.random() < 0.15,
    };
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cx = width / 2;
    cy = height / 2;
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < maxParticles; i++) {
      var p = spawnParticle();
      p.age = Math.floor(Math.random() * p.maxLife);
      particles.push(p);
    }
  }

  function update() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var dx = cx - p.x;
      var dy = cy - p.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1) {
        var force = Math.min(gravityStrength / (dist * dist), 0.15);
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
      p.vx *= 0.998;
      p.vy *= 0.998;
      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.phaseSpeed;
      p.age++;

      var lifeT = p.age / p.maxLife;
      if (lifeT < 0.1) p.life = lifeT / 0.1;
      else if (lifeT > 0.8) p.life = (1 - lifeT) / 0.2;
      else p.life = 1;

      if (dist < eventHorizon || p.age > p.maxLife ||
          p.x < -200 || p.x > width + 200 || p.y < -200 || p.y > height + 200) {
        particles[i] = spawnParticle();
      }
    }
  }

  function draw() {
    var r = RGB[0], g = RGB[1], b = RGB[2];
    ctx.fillStyle = BG + "1)";
    ctx.fillRect(0, 0, width, height);

    // Connection lines
    for (var i = 0; i < particles.length; i++) {
      var pi = particles[i];
      if (pi.life < 0.1) continue;
      for (var j = i + 1; j < particles.length; j++) {
        var pj = particles[j];
        if (pj.life < 0.1) continue;
        var dx = pi.x - pj.x;
        var dy = pi.y - pj.y;
        var dist = dx * dx + dy * dy;
        if (dist < connectionDist * connectionDist) {
          var d = Math.sqrt(dist);
          var alpha = (1 - d / connectionDist) * 0.08 * Math.min(pi.life, pj.life);
          var lr = r, lg = g, lb = b;
          if (pi.isAccent || pj.isAccent) {
            lr = ACCENT[0]; lg = ACCENT[1]; lb = ACCENT[2];
            alpha *= 0.6;
          }
          ctx.beginPath();
          ctx.moveTo(pi.x, pi.y);
          ctx.lineTo(pj.x, pj.y);
          ctx.strokeStyle = "rgba(" + lr + "," + lg + "," + lb + "," + alpha + ")";
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    // Particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      if (p.life < 0.05) continue;
      var alpha = (p.brightness + Math.sin(p.phase) * 0.15) * p.life;
      var pr = r, pg = g, pb = b;
      if (p.isAccent) {
        pr = ACCENT[0]; pg = ACCENT[1]; pb = ACCENT[2];
        alpha *= 0.7;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + pr + "," + pg + "," + pb + "," + alpha + ")";
      ctx.fill();
    }

    // Center vignette
    var gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, holeRadius * 2);
    gradient.addColorStop(0, BG + "1)");
    gradient.addColorStop(0.4, BG + "0.95)");
    gradient.addColorStop(0.7, BG + "0.4)");
    gradient.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, holeRadius * 2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function loop() {
    if (window._gen !== gen) return;
    update();
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", function () {
    if (window._gen !== gen) return;
    resize();
  });

  canvas.style.opacity = "0.4";
  init();
  loop();
})();

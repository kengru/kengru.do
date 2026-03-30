// Radial Probabilistic — tide rule, adapted for kengru.do palette
// Needs <canvas id="bg"> and window._gen = 0
(function () {
  var gen = window._gen;
  var canvas = document.getElementById("bg");
  var ctx = canvas.getContext("2d");

  var width, height, cx, cy;
  var cellCount = 360;
  var numStates = 4;
  var scale = 3;

  var rings = [];
  var visibleRings = 180;
  var maxRings = visibleRings + 10;
  var maxRadius;

  var holeRadius = 0.12;
  var holeFade = 0.1;

  // Detect color scheme
  var darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Dark: digital-slate bg, nordic-mist particles
  // Light: light bg, digital-slate particles
  var BG = darkMode ? [15, 24, 34] : [248, 249, 250];
  var RGB = darkMode ? [214, 215, 213] : [15, 24, 34];
  var ACCENT = [221, 230, 31]; // golden-glow

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (e) {
      darkMode = e.matches;
      BG = darkMode ? [15, 24, 34] : [248, 249, 250];
      RGB = darkMode ? [214, 215, 213] : [15, 24, 34];
    });

  // tide rule
  function rule(sum, cur) {
    var target = Math.round((sum / 9) * 3);
    if (Math.random() < 0.6) return target;
    return Math.random() < 0.5 ? Math.min(3, cur + 1) : Math.max(0, cur - 1);
  }

  var angleTable, distTable, rw, rh, rcx, rcy;

  function buildLookup() {
    rw = Math.ceil(width / scale);
    rh = Math.ceil(height / scale);
    rcx = cx / scale;
    rcy = cy / scale;
    angleTable = new Float32Array(rw * rh);
    distTable = new Float32Array(rw * rh);
    for (var py = 0; py < rh; py++) {
      for (var px = 0; px < rw; px++) {
        var dx = px - rcx;
        var dy = py - rcy;
        var idx = py * rw + px;
        distTable[idx] = Math.sqrt(dx * dx + dy * dy) * scale;
        var a = Math.atan2(dy, dx);
        angleTable[idx] = ((a + Math.PI) / (Math.PI * 2)) * cellCount;
      }
    }
  }

  function seedRing() {
    var ring = new Uint8Array(cellCount);
    for (var i = 0; i < cellCount; i++) {
      ring[i] =
        Math.random() < 0.08 ? Math.floor(Math.random() * numStates) : 0;
    }
    return ring;
  }

  function nextRing(prev) {
    var ring = new Uint8Array(cellCount);
    for (var i = 0; i < cellCount; i++) {
      var left = prev[(i - 1 + cellCount) % cellCount];
      var center = prev[i];
      var right = prev[(i + 1) % cellCount];
      ring[i] = Math.max(
        0,
        Math.min(numStates - 1, rule(left + center + right, center)),
      );
    }
    return ring;
  }

  function reset() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cx = width / 2;
    cy = height / 2;
    maxRadius = Math.sqrt(cx * cx + cy * cy);
    buildLookup();
  }

  function redraw() {
    var count = rings.length;
    var imageData = ctx.createImageData(rw, rh);
    var data = imageData.data;

    var holeR = maxRadius * holeRadius;
    var fadeEnd = maxRadius * (holeRadius + holeFade);

    for (var p = 0; p < rw * rh; p++) {
      var dist = distTable[p];
      var t = dist / maxRadius;
      var ri = Math.floor(t * count);

      var state = 0;
      if (ri >= 0 && ri < count) {
        state = rings[ri][Math.floor(angleTable[p]) % cellCount];
      }

      var intensity = state / (numStates - 1);
      if (dist < holeR) {
        intensity = 0;
      } else if (dist < fadeEnd) {
        var fade = (dist - holeR) / (fadeEnd - holeR);
        intensity *= fade * fade;
      }

      // State 3 (highest) uses golden-glow accent
      var useAccent = state === 3;
      var cr = useAccent ? ACCENT[0] : RGB[0];
      var cg = useAccent ? ACCENT[1] : RGB[1];
      var cb = useAccent ? ACCENT[2] : RGB[2];

      var idx = p * 4;
      data[idx] = BG[0] + (cr - BG[0]) * intensity * 0.35;
      data[idx + 1] = BG[1] + (cg - BG[1]) * intensity * 0.35;
      data[idx + 2] = BG[2] + (cb - BG[2]) * intensity * 0.35;
      data[idx + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(canvas, 0, 0, rw, rh, 0, 0, width, height);
  }

  var frameCount = 0;
  function loop() {
    if (window._gen !== gen) return;

    frameCount++;
    if (frameCount % 5 === 0) {
      var prev = rings[rings.length - 1];
      rings.push(nextRing(prev));
      while (rings.length > maxRings) rings.shift();
    }

    redraw();
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", function () {
    if (window._gen !== gen) return;
    reset();
  });

  canvas.style.opacity = "0.03";
  reset();
  rings = [seedRing()];
  loop();
})();

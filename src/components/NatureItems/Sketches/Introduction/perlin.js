let x = 0;
let y = 0;
let ty = 0;
let points = [];

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(700, 300);
    s.background(255);
  };

  s.draw = function() {
    s.background(255);

    y = s.noise(ty) * s.height;
    for (let p of points) {
      s.strokeWeight(2);
      s.point(p.x, p.y);
    }
    if (points.length < s.width / 2) {
      points.push(s.createVector(x, y));
    } else {
      points.shift();
      points.push(s.createVector(x, y));
    }
    x += 2;
    if (x > s.width) x = 0;

    s.textSize(15);
    s.text(`Input: ${ty.toFixed(2)}`, s.width - 100, 20);
    s.text(`Output: ${y.toFixed(2)}`, s.width - 100, 40);
    ty += 0.007;
  };
}

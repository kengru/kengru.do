// let slider;
let nspeed = 0.08;
let n = 2;
let rotAngle = 0;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 400);
    // slider = s.createSlider(0, 10, 1.2, 0.1);
  };

  s.draw = function() {
    s.background(255);
    s.translate(s.width / 2, s.height / 2);
    s.rotate(rotAngle);
    rotAngle += 0.04;
    let a = 150;
    let b = 150;
    // let r = 200;
    n += nspeed;
    if (n >= 8) {
      nspeed *= -1;
    } else if (n < 1.5) {
      nspeed *= -1;
    }
    let m = 0.8;
    // s.stroke(70);
    // s.strokeWeight(1.2);
    s.noStroke();
    s.fill(180, 0, 0,s.map(n, 1.5, 8, 180, 30));
    s.beginShape();
    for (let angle = 0; angle < s.TWO_PI; angle += 0.02) {
      // let x = r * s.cos(a);
      // let y = r * s.sin(a);
      let na = 3 / n;
      let nb = 1 / m;
      let x = s.pow(s.abs(s.cos(angle)), na) * a * sgn(s.cos(angle));
      let y = s.pow(s.abs(s.sin(angle)), nb) * b * sgn(s.sin(angle));
      s.vertex(x, y);
    }
    s.endShape(s.CLOSE);
  };

  function sgn(value) {
    if (value > 0) return 1;
    if (value < 0) return -1;
    if (value === 0) return 0;
  }
}

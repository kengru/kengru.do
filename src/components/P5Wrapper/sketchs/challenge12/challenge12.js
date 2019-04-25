let x = 0.01;
let y = 0;
let z = 0;
let dt = 0.01;
const sigma = 15; // 10
const rho = 41; // 28
const beta = 14 / 3; // 8 / 3
let points = [];

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(800, 400, s.WEBGL);
    s.colorMode(s.HSB);
  };

  s.draw = function() {
    s.smooth();
    s.background(255);

    let dx = sigma * (y - x) * dt;
    x = x + dx;
    let dy = (x * (rho - z) - y) * dt;
    y = y + dy;
    let dz = (x * y - beta * z) * dt;
    z = z + dz;

    points.push(s.createVector(x, y, z));
    // points.push([s.createVector(x, y, z), s.color(
    //   s.map(s.sin(x), -1, 1, 0, 255),
    //   s.map(s.cos(y), -1, 1, 0, 255),
    //   s.map(s.sin(z), -1, 1, 0, 255)
    // )]);

    s.stroke(0);
    s.scale(2.5);
    s.noFill();
    s.beginShape();
    let h = 0;
    for (let p of points) {
      s.stroke(h, 255, 255);
      let sine = s.createVector(s.map(s.sin(x), -1, 1, 0, 255),
        s.map(s.cos(y), -1, 1, 0, 255),
        s.map(s.sin(z), -1, 1, 0, 255))
      sine.mult(0.01);
      p.add(sine);
      s.vertex(p.x, p.y, p.z);
      h = h + 0.1;
      if (h > 255) {
        h = 0;
      }
    }
    s.endShape();
    //console.log(x, y, z);
    s.orbitControl();
  };
}

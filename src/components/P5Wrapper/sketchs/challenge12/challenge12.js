let x = 0.01;
let y = 0;
let z = 0;
let dt = 0.01;
const sigma = 10; // 10
const rho = 28; // 28
const beta = 8 / 3; // 8 / 3
let points = [];

export default function(s) {
  function c3D() {
    let angle = Math.random() * s.TWO_PI;
    let vz = Math.random() * 2 - 1;
    let vzBase = Math.sqrt(1 - vz * vz);
    let vx = vzBase * Math.cos(angle);
    let vy = vzBase * Math.sin(angle);
    return s.createVector(vx, vy, vz);
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(800, 500, s.WEBGL);
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
    let h = 0;
    s.beginShape();
    for (let p of points) {
      s.stroke(h, 255, 255);
      let sine = s.createVector(s.map(s.sin(x), -1, 1, -50, 50),
        s.map(s.cos(y), -1, 1, -50, 50),
        s.map(s.sin(z), -1, 1, -50, 50))
      // let sine = c3D();
      sine.mult(0.05);
      p.add(sine);
      s.vertex(p.x, p.y, p.z);
      h = h + 0.05;
      if (h > 255) {
        h = 0;
      }
    }
    s.endShape();
    //console.log(x, y, z);
    s.orbitControl();
  };
}

/* eslint-disable no-unused-vars */
let x = 0.01;
let y = 0;
let z = 1;
let dt = 0.01;
const sigma = 10; // 10
const rho = 40; // 28
const beta = 8 / 3; // 8 / 3
let points = [];

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(800, 500, s.WEBGL);
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
    s.scale(4);
    // let h = 5;
    s.noFill();
    s.beginShape();
    for (let p of points) {
      s.stroke(0, 0, 200);
      // let sine = s.createVector(s.map(s.sin(x), -1, 1, 0, 10),
      //   s.map(s.cos(y), -1, 1, 0, 10),
      //   s.map(s.sin(z), -1, 1, 0, 10))
      // // let sine = c3D();
      // sine.mult(0.001);
      // p.add(sine);
      // if (h > 10) {
      //   s.endShape();
      //   s.beginShape();
      // }
      s.vertex(p.x, p.y, p.z);
      // h = h + 1;
      // if (h > 15) {
      //   h = 5;
      // }
    }
    s.endShape();
    //console.log(x, y, z);
    s.orbitControl();
  };
}

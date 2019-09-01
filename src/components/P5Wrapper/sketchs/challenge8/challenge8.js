/* eslint-disable no-unused-vars */
let sun = {};

export default function(s) {
  function c3D() {
    let angle = Math.random() * s.TWO_PI;
    let vz = Math.random() * 2 - 1;
    let vzBase = Math.sqrt(1 - vz * vz);
    let vx = vzBase * Math.cos(angle);
    let vy = vzBase * Math.sin(angle);
    return s.createVector(vx, vy, vz);
  }

  class Planet {
    constructor(r, d, o) {
      this.r = r;
      this.d = d;
      this.angle = s.random(s.TWO_PI);
      this.planets = [];
      this.orbitsp = o;
      this.v = c3D();
      this.v = this.v.mult(this.d);
    }

    spawnMoons(qty, level) {
      for (let i = 0; i < qty; i++) {
        let radius = this.r / (level * 1.4);
        let max = this.r + radius;
        let distance = s.random(max, max * 1.3);
        let speed = s.random(-0.03, 0.03);
        this.planets.push(new Planet(radius, distance, speed));
      }
      for (let p of this.planets) {
        if (level < 2) {
          let moons = s.random(3);
          p.spawnMoons(moons, level + 1);
        }
      }
    }

    orbit() {
      this.angle += this.orbitsp;
    }

    show() {
      s.push();
      let a = s.createVector(1, 0, 1);
      let b = this.v.cross(a);
      s.rotate(this.angle, b);
      s.translate(this.v.x, this.v.y, this.v.z);
      s.fill(200 - this.d / 2, 0, 20);
      s.noStroke();
      s.sphere(this.r);
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
        this.planets[i].orbit();
      }
      s.pop();
    }
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 400, s.WEBGL);
    sun = new Planet(50, 1, 0);
    sun.spawnMoons(3, 1);
  };

  s.draw = function() {
    s.background(255);
    s.ambientLight(255);
    s.smooth();
    s.orbitControl();
    s.translate(0, 0, 0);
    sun.show();
  };
}

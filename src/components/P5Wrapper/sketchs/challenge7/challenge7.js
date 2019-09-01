/* eslint-disable no-unused-vars */
let sun = {};

export default function(s) {
  class Planet {
    constructor(r, d, o) {
      this.r = r;
      this.d = d;
      this.angle = s.random(s.TWO_PI);
      this.planets = [];
      this.orbitsp = o;
    }

    spawnMoons(qty, level) {
      for (let i = 0; i < qty; i++) {
        let radius = this.r / (level * 1.4);
        let distance = s.random(100, 200) / level;
        let speed = s.random(-0.03, 0.03);
        this.planets.push(new Planet(radius, distance, speed));
      }
      for (let p of this.planets) {
        if (level < 2) {
          let moons = s.random(2);
          p.spawnMoons(moons, level + 1);
        }
      }
    }

    orbit() {
      this.angle += this.orbitsp;
    }

    show() {
      s.push();
      s.rotate(this.angle);
      s.translate(this.d, 0);
      s.fill(200 - this.d / 2, 0, 20, 200);
      s.noStroke();
      s.ellipse(0, 0, this.r, this.r);
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
    s.createCanvas(600, 400);
    sun = new Planet(100, 0, 0);
    sun.spawnMoons(3, 1);
  };

  s.draw = function() {
    s.background(255);
    s.translate(s.width / 2, s.height / 2);
    sun.show();
    sun.orbit();
  };
}

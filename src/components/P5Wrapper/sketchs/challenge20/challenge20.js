import toxi from "toxiclibsjs";

let VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
let physics;
let particles = [];
let springs = [];

let w = 10;
let cols = 40;
let rows = 40;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 500);
    physics = new VerletPhysics2D();
    let gravity = new toxi.geom.Vec2D(0, 1);
    let gb = new toxi.physics2d.behaviors.GravityBehavior(gravity);
    physics.addBehavior(gb);

    particles = Create2DArray(rows);

    let x = 100;
    for (let i = 0; i < cols; i++) {
      let y = 10;
      for (let j = 0; j < rows; j++) {
        let part = new Particle(x, y);
        particles[i][j] = part;
        physics.addParticle(part);
        y += w;
      }
      x += w;
    }
    for (let i = 0; i < cols - 1; i++) {
      for (let j = 0; j < rows - 1; j++) {
        let a = particles[i][j];
        let b1 = particles[i + 1][j];
        let b2 = particles[i][j + 1];
        let s1 = new Spring(a, b1, w, 2);
        let s2 = new Spring(a, b2, w, 0.7);
        springs.push(s1);
        springs.push(s2);
        physics.addSpring(s1);
        physics.addSpring(s2);
      }
    }

    let p1 = particles[0][0];
    p1.lock();
    let p2 = particles[cols - 1][0];
    p2.lock();
    let p3 = particles[0][cols - 1];
    p3.lock();
    let p4 = particles[cols - 1][cols - 1];
    p4.lock();
  };

  s.draw = function() {
    s.background(255);
    physics.update();

    // for (let i = 0; i < cols; i++) {
    //   for (let j = 0; j < rows; j++) {
    //     particles[i][j].display();
    //   }
    // }

    for (let s of springs) {
      s.display();
    }
  };

  function Create2DArray(rows) {
    var arr = [];

    for (var i = 0; i < rows; i++) {
      arr[i] = [];
    }

    return arr;
  }

  class Particle extends toxi.physics2d.VerletParticle2D {
    display() {
      s.fill(51);
      s.noStroke();
      s.ellipse(this.x, this.y, 10, 10);
    }
  }

  class Spring extends toxi.physics2d.VerletSpring2D {
    display() {
      s.stroke(51);
      s.strokeWeight(2);
      s.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
}

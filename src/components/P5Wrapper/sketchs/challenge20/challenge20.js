import toxi from "toxiclibsjs";

let VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
let particles = [];
let springs = [];

let physics;
let w = 10;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 400);
    physics = new VerletPhysics2D();
    let gravity = new toxi.geom.Vec2D(0, 1);
    let gb = new toxi.physics2d.behaviors.GravityBehavior(gravity);
    physics.addBehavior(gb);

    let x = 100;
    let y = 10;
    for (let i = 0; i < 40; i++) {
      let part = new Particle(x, y);
      particles.push(part);
      physics.addParticle(part);
      x += w;
    }

    for (let i = 0; i < particles.length - 1; i++) {
      let a = particles[i];
      let b = particles[i + 1];
      let sp = new Spring(a, b, w);
      springs.push(sp);
      physics.addSpring(sp);
    }

    let p1 = particles[0];
    p1.lock();
    let p2 = particles[particles.length - 1];
    p2.lock();
  };

  s.draw = function() {
    s.background(255);
    physics.update();
    // for (let p of particles) {
    //   p.display();
    // }
    for (let s of springs) {
      s.display();
    }
  };

  class Particle extends toxi.physics2d.VerletParticle2D {
    constructor(x, y) {
      super(x, y);
    }

    display() {
      s.fill(51);
      s.noStroke();
      s.ellipse(this.x, this.y, 10, 10);
    }
  }

  class Spring extends toxi.physics2d.VerletSpring2D {
    constructor(a, b, w) {
      super(a, b, w, 0.5);
    }

    display() {
      s.stroke(51);
      s.strokeWeight(2);
      s.line(this.a.x, this.a.y, this.b.x, this.b.y);
    }
  }
}

let speed = 1;
let stars = [];

export default function(s) {
  class Star {
    constructor() {
      this.x = s.random(-s.width, s.width);
      this.y = s.random(-s.width, s.height);
      this.z = s.random(s.width);

      this.pz = this.z;
    }

    update() {
      this.z = this.z - speed;
      if (this.z < 1) {
        this.z = s.width;
        this.x = s.random(-s.width, s.width);
        this.y = s.random(-s.height, s.height);
        this.pz = this.z;
      }
    }

    show() {
      s.fill(255);
      s.noStroke();

      let nx = s.map(this.x / this.z, 0, 1, 0, s.width);
      let ny = s.map(this.y / this.z, 0, 1, 0, s.height);
      let r = s.map(this.z, 0, s.width, 6, 0);

      //s.ellipse(nx, ny, r);

      let px = s.map(this.x / this.pz, 0, 1, 0, s.width);
      let py = s.map(this.y / this.pz, 0, 1, 0, s.height);
      this.pz = this.z;

      s.stroke(255);
      s.strokeWeight(r);
      s.line(px, py, nx, ny);
    }
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(700, 400);
    s.background(0);
    for (let i = 0; i <= 800; i++) {
      stars[i] = new Star();
    }
  };

  s.draw = function() {
    if (s.frameCount % 60 === 1) {
      s.onSetAppState({ frameRate: s.frameRate().toFixed(1) });
    }

    s.background(0);
    s.translate(s.width / 2, s.height / 2);
    if (s.props.speed) speed = s.props.speed.value;
    for (let star of stars) {
      star.update();
      star.show();
    }
  };
}

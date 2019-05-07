class Star {
  constructor(s, speed) {
    this.x = s.random(-s.width, s.width);
    this.y = s.random(-s.width, s.height);
    this.z = s.random(s.width);
    this.s = s;

    this.pz = this.z;
  }

  update() {
    this.z = this.z - speed;
    if (this.z < 1) {
      this.z = this.s.width;
      this.x = this.s.random(-this.s.width, this.s.width);
      this.y = this.s.random(-this.s.height, this.s.height);
      this.pz = this.z;
    }
  }

  show() {
    this.s.fill(255);
    this.s.noStroke();

    let nx = this.s.map(this.x / this.z, 0, 1, 0, this.s.width);
    let ny = this.s.map(this.y / this.z, 0, 1, 0, this.s.height);
    let r = this.s.map(this.z, 0, this.s.width, 6, 0);

    //s.ellipse(nx, ny, r);

    let px = this.s.map(this.x / this.pz, 0, 1, 0, this.s.width);
    let py = this.s.map(this.y / this.pz, 0, 1, 0, this.s.height);
    this.pz = this.z;

    this.s.stroke(255);
    this.s.strokeWeight(r);
    this.s.line(px, py, nx, ny);
  }
}
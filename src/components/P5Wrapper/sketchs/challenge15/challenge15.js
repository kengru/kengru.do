let tree = [];
let leaves = [];
let count = 0;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 400);
    let a = s.createVector(s.width / 2, s.height);
    let b = s.createVector(s.width / 2, s.height - 100);
    let root = new Branch(a, b, 3);
    tree[0] = root;
  };

  s.draw = function() {
    s.background(255);

    for (let branch of tree) {
      branch.show();
      // branch.movement();
    }

    for (let leaf of leaves) {
      leaf.show();
      // leaf.movement();
    }
  };

  s.mousePressed = function() {
    if (count < 7) {
      for (let i = tree.length - 1; i >= 0; i--) {
        if (!tree[i].finished) {
          let branches = tree[i].branches();
          tree.push(branches[0]);
          tree.push(branches[1]);
        }
        tree[i].finished = true;
      }
    }
    count += 1;

    if (count > 3) {
      for (let i = 0; i < tree.length; i++) {
        if (!tree[i].finished) {
          let copy = tree[i].end.copy();
          let leaf = new Leaf(copy.x, copy.y, s.random(s.PI));
          leaves.push(leaf);
        }
      }
    }
  };

  s.doubleClicked = function() {
    count = 0;
    tree = [];
    leaves = [];
    let a = s.createVector(s.width / 2, s.height);
    let b = s.createVector(s.width / 2, s.height - 100);
    let root = new Branch(a, b, 3);
    tree[0] = root;
  };

  class Branch {
    constructor(begin, end, stroke) {
      this.begin = begin;
      this.end = end;
      this.finished = false;
      this.grow = 0.02;
      this.stroke = stroke;
    }

    show = () => {
      s.stroke(20);
      s.strokeWeight(this.stroke);
      if (this.grow < 1) {
        let direction = s.createVector(
          this.end.x - this.begin.x,
          this.end.y - this.begin.y
        );
        let direct = direction.copy().mult(this.grow);
        let newEnd = s.createVector(
          this.begin.x + direct.x,
          this.begin.y + direct.y
        );
        s.line(this.begin.x, this.begin.y, newEnd.x, newEnd.y);
        this.grow += 0.05;
      } else {
        s.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
      }
    };

    movement = () => {
      this.end.x += s.random(-0.2, 0.2);
      this.end.y += s.random(-0.1, 0.1);
    };

    branches = () => {
      let angle = s.PI / 4;
      let direction = s.createVector(
        this.end.x - this.begin.x,
        this.end.y - this.begin.y
      );
      direction.mult(0.72);
      let rotateL = direction.copy().rotate(-angle);
      let rotateR = direction.copy().rotate(angle);
      let lEnd = s.createVector(this.end.x + rotateL.x, this.end.y + rotateL.y);
      let rEnd = s.createVector(this.end.x + rotateR.x, this.end.y + rotateR.y);
      let left = new Branch(this.end, lEnd, this.stroke * 0.82);
      let right = new Branch(this.end, rEnd, this.stroke * 0.82);
      return [left, right];
    };
  }

  class Leaf {
    constructor(x, y, rotation) {
      this.x = x;
      this.y = y;
      this.rotation = rotation;
    }

    movement = () => {
      this.x += s.random(-0.2, 0.2);
      this.y += s.random(-0.1, 0.1);
    };

    show = () => {
      s.fill(255, 0, 120, 150);
      s.noStroke();
      s.push();

      s.ellipse(this.x, this.y, 4, 8);
      s.rotate(this.rotation);
      s.pop();
    };
  }
}

let tree;
let max_dist = 200;
let min_dist = 10;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    // s.createCanvas(800, 500);
    s.createCanvas(600, 400, s.WEBGL);
    s.frameRate(20);
    tree = new Tree();
  };

  s.draw = function() {
    s.background(255);
    s.orbitControl();
    tree.show();
    tree.grow();
  };

  const c3D = () => {
    let angle = Math.random() * s.TWO_PI;
    let vz = Math.random() * 2 - 1;
    let vzBase = Math.sqrt(1 - vz * vz);
    let vx = vzBase * Math.cos(angle);
    let vy = vzBase * Math.sin(angle);
    return s.createVector(vx, vy, vz);
  };

  // const fromAngle = (angle, length) => {
  //   if (typeof length === "undefined") {
  //     length = 1;
  //   }
  //   return s.createVector(
  //     length * Math.cos(angle),
  //     length * Math.sin(angle),
  //     0
  //   );
  // };

  // const random2D = () => {
  //   return fromAngle(Math.random() * s.TWO_PI);
  // };

  class Tree {
    constructor() {
      this.leaves = [];
      this.branches = [];
      for (var i = 0; i < 100; i++) {
        this.leaves.push(new Leaf());
      }
      let position = s.createVector(0, s.height - 50, 0);
      let dir = s.createVector(0, -1);
      let root = new Branch(null, position, dir);
      this.branches.push(root);

      let current = root;
      let found = false;
      while (!found) {
        for (let i = 0; i < this.leaves.length; i++) {
          let d = current.pos.dist(this.leaves[i].pos);
          if (d < max_dist) {
            found = true;
          }
        }
        if (!found) {
          let branch = current.next();
          current = branch;
          this.branches.push(current);
        }
      }
    }

    show() {
      for (let i = 0; i < this.leaves.length; i++) {
        this.leaves[i].show();
      }
      for (let j = 0; j < this.branches.length; j++) {
        let b = this.branches[j];
        if (b.parent !== null) {
          // let strokeW = s.map(j, 0, this.branches.length, 6, 0);
          // s.push();
          s.strokeWeight(2);
          s.stroke(0, 140, 0, 180);
          s.line(
            b.pos.x,
            b.pos.y,
            b.pos.z,
            b.parent.pos.x,
            b.parent.pos.y,
            b.parent.pos.z
          );
          // s.pop();
        }
      }
    }

    grow() {
      for (let i = 0; i < this.leaves.length; i++) {
        let leaf = this.leaves[i];
        let closestBranch = null;
        let record = 100000;
        for (let j = 0; j < this.branches.length; j++) {
          let branch = this.branches[j];
          let d = leaf.pos.dist(branch.pos);
          if (d < min_dist) {
            leaf.reached = true;
            closestBranch = null;
            break;
          } else if (d > max_dist) {
          } else if (closestBranch === null || d < record) {
            closestBranch = branch;
            record = d;
          }
        }
        if (closestBranch !== null) {
          let direction = s.createVector(
            leaf.pos.x - closestBranch.pos.x,
            leaf.pos.y - closestBranch.pos.y,
            leaf.pos.z - closestBranch.pos.z
          );
          direction.normalize();
          closestBranch.dir.add(direction);
          closestBranch.count += 1;
        }
      }

      for (let i = this.leaves.length - 1; i >= 0; i--) {
        if (this.leaves[i].reached) {
          this.leaves.splice(i, 1);
        }
      }

      for (let i = this.branches.length - 1; i >= 0; i--) {
        let branch = this.branches[i];
        if (branch.count > 0) {
          branch.dir.div(branch.count);
          let ran = c3D();
          ran.setMag(0.2);
          branch.dir.add(ran);
          this.branches.push(branch.next());
          branch.reset();
        }
      }
    }
  }

  class Branch {
    constructor(parent, pos, dir) {
      this.parent = parent;
      this.pos = pos;
      this.dir = dir;
      this.originDir = this.dir.copy();
      this.count = 0;
      this.length = 5;
    }

    reset() {
      this.dir = this.originDir.copy();
      this.count = 0;
    }

    next() {
      let nextDir = this.dir.copy().mult(this.length);
      let nextPos = s.createVector(
        this.pos.x + nextDir.x,
        this.pos.y + nextDir.y,
        this.pos.z + nextDir.z
      );
      let nextBranch = new Branch(this, nextPos, this.dir.copy());
      return nextBranch;
    }
  }

  class Leaf {
    constructor() {
      let position = c3D();
      position.mult(s.random(s.width / 6));
      this.pos = position;
      this.reached = false;
    }

    show() {
      s.fill(0, 200, 0, 160);
      s.noStroke();
      s.push();
      s.translate(this.pos.x, this.pos.y, this.pos.z);
      // s.sphere(4);
      s.ellipse(0, 0, 4, 9);
      s.pop();
    }
  }
}

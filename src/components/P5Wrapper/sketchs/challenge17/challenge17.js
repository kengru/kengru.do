let tree;
let max_dist = 30;
let min_dist = 10;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 400);
    tree = new Tree();
  };

  s.draw = function() {
    s.background(255);
    tree.show();
    tree.grow();
  };

  class Tree {
    constructor() {
      this.leaves = [];
      this.branches = [];
      for (var i = 0; i < 1000; i++) {
        this.leaves.push(new Leaf());
      }
      let position = s.createVector(s.width / 2, s.height);
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
      for (let i = 0; i < this.branches.length; i++) {
        this.branches[i].show();
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
            leaf.pos.y - closestBranch.pos.y
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
          this.branches.push(branch.next());
        }
        branch.reset();
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
      this.length = 4;
    }

    reset() {
      this.dir = this.originDir.copy();
      this.count = 0;
    }

    next() {
      let nextDir = this.dir.copy().mult(this.length);
      let nextPos = s.createVector(
        this.pos.x + nextDir.x,
        this.pos.y + nextDir.y
      );
      let nextBranch = new Branch(this, nextPos, this.dir.copy());
      return nextBranch;
    }

    show() {
      if (this.parent !== null) {
        s.stroke(0);
        s.line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      }
    }
  }

  class Leaf {
    constructor() {
      this.pos = s.createVector(s.random(100, s.width - 100), s.random(s.height - 100));
      this.reached = false;
    }

    show() {
      s.fill(0, 200, 0, 160);
      s.noStroke();
      s.ellipse(this.pos.x, this.pos.y, 4, 9);
    }
  }
}

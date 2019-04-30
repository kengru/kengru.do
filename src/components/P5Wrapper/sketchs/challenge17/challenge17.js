let tree;
let max_dist = 10;
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
  };

  class Tree {
    constructor() {
      this.leaves = [];
      this.branches = [];
      for (var i = 0; i < 100; i++) {
        this.leaves.push(new Leaf());
      }
      let position = s.createVector(s.width/2, s.height);
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
  }

  class Branch {
    constructor(parent, pos, dir) {
      this.parent = parent;
      this.pos = pos;
      this.dir = dir;
    }

    next() {
      let nextPos = this.pos.add(this.dir);
      let nextBranch = new Branch(this, nextPos, this.dir.copy());
      return nextBranch;
    }

    show() {
      if (this.parent != null) {
        s.stroke(0);
        s.line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      }
    }
  }

  class Leaf {
    constructor() {
      this.pos = s.createVector(s.random(s.width), s.random(s.height - 100));
    }

    show() {
      s.fill(0);
      s.noStroke();
      s.ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }
}

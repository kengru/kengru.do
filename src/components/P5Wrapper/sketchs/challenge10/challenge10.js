let w = 40;
let current;
let cols, rows;
let grid = [];
let stack = [];

export default function(s) {
  class Cell {
    constructor(i, j) {
      this.i = i;
      this.j = j;
      this.walls = [true, true, true, true];
      this.visited = false;
    }

    checkNeighbors() {
      let neighbors = [];

      let top = grid[index(this.i, this.j - 1)];
      let right = grid[index(this.i + 1, this.j)];
      let bot = grid[index(this.i, this.j + 1)];
      let left = grid[index(this.i - 1, this.j)];

      if (top && !top.visited) {
        neighbors.push(top);
      }

      if (right && !right.visited) {
        neighbors.push(right);
      }

      if (bot && !bot.visited) {
        neighbors.push(bot);
      }

      if (left && !left.visited) {
        neighbors.push(left);
      }

      if (neighbors.length > 0) {
        let r = s.floor(s.random(0, neighbors.length));
        return neighbors[r];
      } else {
        return undefined;
      }
    }

    display() {
      let x = this.i * w;
      let y = this.j * w;
      s.stroke(0);
      if (this.walls[0]) {
        s.line(x, y, x + w, y);
      }
      if (this.walls[1]) {
        s.line(x + w, y, x + w, y + w);
      }
      if (this.walls[2]) {
        s.line(x + w, y + w, x, y + w);
      }
      if (this.walls[3]) {
        s.line(x, y + w, x, y);
      }
      if (this.visited) {
        s.noStroke();
        s.fill(200, 100, 50, 180);
        s.rect(x, y, w, w);
      }
    }

    highlight() {
      let x = this.i * w;
      let y = this.j * w;
      s.noStroke();
      s.fill(200, 0, 10, 210);
      s.rect(x, y, w, w);
    }
  }

  function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1;
    } else {
      return i + j * cols;
    }
  }

  function removeWalls(a, b) {
    let x = a.i - b.i;
    if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }

    let y = a.j - b.j;
    if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(800, 400);
    s.frameRate(20);
    cols = s.floor(s.width / w);
    rows = s.floor(s.height / w);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid.push(new Cell(i, j));
      }
    }

    current = grid[0];
  };

  s.draw = function() {
    s.background(255);
    for (let i = 0; i < grid.length; i++) {
      grid[i].display();
    }

    current.visited = true;
    current.highlight();
    let next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length > 0) {
      let cl = stack.pop();
      current = cl;
    }
  };
}

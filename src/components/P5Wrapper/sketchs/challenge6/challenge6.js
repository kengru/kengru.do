let cells = [];

export default function(s) {
  class Cell {
    constructor(x, y, r) {
      this.pos = s.createVector(x, y);
      this.r = r;
      this.color = s.color(s.random(200), s.random(40), s.random(80), 100);
      this.dead = false;
    }
    
    show() {
      s.fill(this.color);
      s.stroke(255);
      s.ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
    
    move() {
      let movement = s.createVector(s.random(-0.5, 0.5), s.random(-0.5, 0.5));
      this.pos.add(movement);
    }
    
    mitosis() {
      cells.push(new Cell(this.pos.x + s.random(-5, 5), this.pos.y + s.random(-5, 5), this.r*0.8))
      cells.push(new Cell(this.pos.x + s.random(-5, 5), this.pos.y + s.random(-5, 5), this.r*0.8))
      this.dead = true;
    }
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(700, 400);
    for(let i = 0; i < 8; i++) {
      cells.push(new Cell(s.random(50, s.width - 50), s.random(50, s.height - 50), s.random(15, 30)));
    }
  };

  s.draw = function() {
    s.background(255);
    for(let c of cells) {
      c.show();
      c.move();
    }
    cells = cells.filter(c => {
      return !c.dead;
    });
  };

  s.mousePressed = function() {
    for(let i = cells.length - 1; i >= 0; i--) {
      if (s.dist(cells[i].pos.x, cells[i].pos.y, s.mouseX, s.mouseY) <= cells[i].r) {
        cells[i].mitosis();
      }
    }
  };
}

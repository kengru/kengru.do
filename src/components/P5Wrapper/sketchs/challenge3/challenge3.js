let snake = {};
let point = {};
let speed = 10;
let movX = 0;
let movY = 0;
let scl = 20;

export default function(s) {
  class Snake {
    constructor(initialX, initialY, bSize) {
      this.x = initialX;
      this.y = initialY;
      this.size = bSize;
      this.tail = [];
      this.score = 0;
    }

    move(movX, movY) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
      this.tail[this.score - 1] = s.createVector(this.x, this.y);

      this.x += movX * scl;
      this.y += movY * scl;

      this.x = s.constrain(this.x, 0, s.width - scl);
      this.y = s.constrain(this.y, 0, s.height - scl);
    }

    check(point) {
      let d = s.dist(this.x, this.y, point.x, point.y);
      if (d < 1) {
        this.score += 1;
        return true;
      } else {
        return false;
      }
    }

    lose() {
      for (let i = 0; i < this.tail.length; i++) {
        let pos = this.tail[i];
        let d = s.dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
          this.tail = [];
          this.score = 0;
          return true;
        }
      }
      return false;
    }

    show() {
      s.fill(0);
      for (let i = 0; i < this.tail.length; i++) {
        s.rect(this.tail[i].x, this.tail[i].y, this.size, this.size);
      }
      s.rect(this.x, this.y, this.size, this.size);
    }
  }

  class Point {
    constructor(loc) {
      this.x = loc.x;
      this.y = loc.y;
    }

    show() {
      s.fill(220, 0, 40);
      s.rect(this.x, this.y, scl, scl);
    }
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 400);
    snake = new Snake(s.width / 2, s.width / 2, scl);
    point = new Point(pickLocation());
  };

  s.draw = function() {    
    s.background(255);
    // Drawing a border
    if (s.props.speed) speed = s.props.speed.value;
    s.frameRate(speed);
    s.stroke(170);
    s.line(0, 0, s.width - 1, 0);
    s.line(s.width - 1, 0, s.width - 1, s.height - 1);
    s.line(s.width - 1, s.height - 1, 0, s.height - 1);
    s.line(0, s.height - 1, 0, 0);

    s.textSize(32);
    s.text(`Points: ${snake.score}`, 10, 30);
    point.show();
    if (snake.lose()) {
      movX = 0;
      movY = 0;
    }
    let mov = movX + movY;
    if (!mov) s.text("YOU LOST", s.width - 200, 30);
    snake.move(movX, movY);
    snake.show();
    if (snake.check(point)) {
      point = new Point(pickLocation());
    }
  };

  s.keyPressed = function() {
    if (s.keyCode === s.LEFT_ARROW) {
      movX = -1;
      movY = 0;
    } else if (s.keyCode === s.RIGHT_ARROW) {
      movX = 1;
      movY = 0;
    } else if (s.keyCode === s.UP_ARROW) {
      movY = -1;
      movX = 0;
    } else if (s.keyCode === s.DOWN_ARROW) {
      movY = 1;
      movX = 0;
    }
  };

  function pickLocation() {
    let rows = s.floor(s.height / scl);
    let cols = s.floor(s.width / scl);
    point = s.createVector(s.floor(s.random(cols)), s.floor(s.random(rows)));
    return point.mult(scl);
  }
}

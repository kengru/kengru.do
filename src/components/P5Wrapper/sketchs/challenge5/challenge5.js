let player = {};
let bullets = [];
let enemies = [];
let speed = 1.5;
let show = false;

export default function(s) {
  class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.movY = 0;
      this.speed = 2;
    }

    move() {
      this.x += speed;
    }

    down() {
      this.y += 30;
    }

    shotDown(bullet) {
      let d = s.dist(this.x, this.y, bullet.x, bullet.y);
      if (d < 15) {
        return true;
      } else {
        return false;
      }
    }

    show() {
      s.stroke(150);
      s.fill(123, 0, 0);
      s.rectMode(s.CENTER);
      s.rect(this.x, this.y, 25, 25, 6);
    }
  }

  class Bullet {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    fly() {
      this.y -= 5;
    }

    delete() {
      return this.y < 0 ? true : false;
    }

    show() {
      s.noStroke();
      s.fill(0, 40, 200);
      s.rect(this.x, this.y, 5, 5, 30);
    }
  }

  class Player {
    constructor() {
      this.x = s.width / 2;
      this.y = s.height - s.height / 8;
    }

    shoot() {
      bullets.push(new Bullet(this.x, this.y));
    }

    updateX(value) {
      this.x = this.x + value;
    }

    showPlayer() {
      s.stroke(150);
      s.fill(0, 190, 60);
      s.triangle(
        this.x - 10,
        this.y + 5,
        this.x + 10,
        this.y + 5,
        this.x,
        this.y - 10
      );
    }
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(700, 400);
    player = new Player();
    for (let r = 0; r < 10; r++) {
      for (let c = 1; c < 3; c++) {
        let enemy = new Enemy(100 + 40 * r, 50 * c);
        enemies.push(enemy);
      }
    }
  };

  s.draw = function() {
    s.background(255);

    // Player
    player.showPlayer();
    if (s.keyIsDown(s.LEFT_ARROW)) {
      player.updateX(-5);
    } else if (s.keyIsDown(s.RIGHT_ARROW)) {
      player.updateX(5);
    }

    // Bullets
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].fly();
      bullets[i].show();
      if (bullets[i].delete()) {
        bullets.splice(i, 1);
      }
    }

    try {
      // Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        if (!show) {
          enemies[i].move();
        }
        enemies[i].show();
        if (bullets.length) {
          for (let b = bullets.length - 1; b >= 0; b--) {
            if (enemies[i].shotDown(bullets[b])) {
              enemies.splice(i, 1);
              bullets.splice(b, 1);
            }
          }
        }
      }
    } catch (error) {
      // console.log(error);
    }

    // Enemies Movement
    if (enemies.length) {
      if (enemies[enemies.length - 1].x >= s.width - 20) {
        speed *= -1;
        for (let i = enemies.length - 1; i >= 0; i--) {
          enemies[i].down();
        }
      } else if (enemies[0].x <= 20) {
        speed *= -1;
        for (let i = enemies.length - 1; i >= 0; i--) {
          enemies[i].down();
        }
      }
    }

    // Game Status
    if (enemies.length) {
      if (enemies[enemies.length - 1].y > s.height - 100) {
        show = true;
      }
    } else {
      show = true;
    }

    if (show) {
      s.stroke(255);
      s.textSize(24);
      if (enemies.length) {
        s.text("Lost", 30, 30);
      } else s.text("Won", 30, 30);
    }
  };

  s.keyPressed = function() {
    if (s.keyCode === 32) {
      player.shoot();
    }
  };
}

let rain = [];
let splash = [];

export default function(s) {
  class Splash {
    constructor(initialX, initialY) {
      this.x = initialX;
      this.y = initialY;
      this.xspeed = 3;
      this.yspeed = 3;
    }

    done() {
      return this.yspeed > 8 ? true : false;
    }

    update() {
      this.xspeed += 0.2;
      this.yspeed += 0.2;
    }

    start() {
      s.stroke(100, 0, 150);
      s.line(
        this.x + this.xspeed,
        this.y - this.yspeed,
        this.x + this.xspeed * 1.5,
        this.y - this.yspeed * 1.5
      );
      s.line(
        this.x - this.xspeed,
        this.y - this.yspeed,
        this.x - this.xspeed * 1.5,
        this.y - this.yspeed * 1.5
      );
      s.line(this.x, this.y - this.yspeed, this.x, this.y - this.yspeed * 1.5);
    }
  }

  class Drop {
    constructor() {
      this.x = s.random(s.width);
      this.y = s.random(-500, -50);
      this.z = s.random(0, 20);
      this.length = s.map(this.z, 0, 20, 10, 20);
      this.yspeed = s.map(this.z, 0, 20, 0.5, 7);
    }

    fall() {
      this.y = this.y + this.yspeed;
      this.yspeed = this.yspeed + s.map(this.z, 0, 20, 0.01, 0.1);
    }

    splash() {
      if (this.y > s.height - this.yspeed) {
        return true;
      } else {
        return false;
      }
    }

    show() {
      let thickness = s.map(this.z, 0, 20, 0.5, 2);
      s.strokeWeight(thickness);
      s.stroke(138, 43, 226);
      s.line(this.x, this.y, this.x, this.y + this.length);
      if (this.y > s.height) {
        this.y = s.random(-200, -100);
        this.yspeed = s.map(this.z, 0, 20, 0.5, 7);
        this.z = s.random(0, 20);
      }
    }
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(700, 400);
    for (let i = 0; i < 400; i++) {
      rain.push(new Drop());
    }
  };

  s.draw = function() {
    s.background(255);

    // Drawing a border
    s.line(s.width - 1, s.height - 1, 0, s.height - 1);

    for (let i = 0; i < rain.length; i++) {
      rain[i].fall();
      rain[i].show();
      if (rain[i].splash()) {
        let sp = new Splash(rain[i].x, rain[i].y + rain[i].length);
        splash.push(sp);
      }
    }
    for (let i = 0; i < splash.length; i++) {
      splash[i].update();
      splash[i].start();
      if (splash[i].done()) {
        splash.splice(i, 1);
      }
    }
  };
}

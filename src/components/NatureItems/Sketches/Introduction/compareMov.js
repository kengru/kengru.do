let w, rw;
let tx = 0;
let ty = 10000;
// let tx = 0;
// let speed = 0.03;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 300);
    s.background(255);
    w = new Walker();
    rw = new Walker();
    // s.loadPixels();
  };

  s.draw = function() {
    s.background(255);
    w.step();
    w.display();
    rw.rstep();
    rw.display(1);
    tx += 0.005;
    ty += 0.01;

    // let tz = 10000;
    // s.loadPixels();
    // for (let j = 0; j < s.height; j++) {
    //   let ty = 1000;
    //   for (let i = 0; i < s.width; i++) {
    //     let index = (i + j * s.width) * 4;
    //     let noise = s.noise(tx, ty, tz) * 255;
    //     s.pixels[index] = noise;
    //     s.pixels[index + 1] = noise;
    //     s.pixels[index + 2] = noise;
    //     s.pixels[index + 3] = 255;;
    //     ty += 0.02;
    //     tz += 0.8;
    //   }
    //   tx += 0.06;
    // }
    // s.updatePixels();
  };

  class Walker {
    constructor() {
      this.x = s.width / 2;
      this.y = s.height / 2;
    }

    display(color) {
      s.stroke(180);
      if (color) {
        s.fill(0, 0, 255, 210);
      } else {
        s.fill(40);
      }

      s.ellipse(this.x, this.y, 40, 40);
    }

    step() {
      this.x = s.noise(tx) * s.width;
      this.y = s.noise(ty) * s.height;
    }
    rstep() {
      this.x += s.random(-2, 2);
      this.y += s.random(-2, 2);
    }
  }
}

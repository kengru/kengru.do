let w;
let tx = 0;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(700, 500);
    s.background(255);
    w = new Walker();
    s.loadPixels();
  };

  s.draw = function() {
    // s.background(255);
    // w.step();
    // w.display();
    // tx += 0.005;
    // ty += 0.01;
    
    let tz = 10000;
    s.loadPixels();
    for (let j = 0; j < s.height; j++) {
      let ty = 1000;
      for (let i = 0; i < s.width; i++) {
        let index = (i + j * s.width) * 4;
        let noise = s.noise(tx, ty, tz) * 255;
        s.pixels[index] = noise;
        s.pixels[index + 1] = noise;
        s.pixels[index + 2] = noise;
        s.pixels[index + 3] = 255;
        ty += 0.03;
        tz += 2;
      }
      tx += 0.006;
    }
    s.updatePixels();
    
  };

  class Walker {
    constructor() {
      this.x = s.width / 2;
      this.y = s.height / 2;
    }

    display() {
      s.stroke(200);
      s.fill(40);
      s.ellipse(this.x, this.y, 40, 40);
    }

    step() {
      // let sx = s.noise(tx) * s.random(-5, 5);
      // let sy = s.noise(ty) * s.random(-5, 5);
      // this.x += sx;
      // this.y += sy;
    }
  }
}

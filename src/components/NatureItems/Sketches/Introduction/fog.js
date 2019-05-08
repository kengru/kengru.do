let tx = 0;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(500, 300);
    s.background(255);
    s.loadPixels();
    for (let j = 0; j < s.height; j++) {
      let ty = 1000;
      for (let i = 0; i < s.width; i++) {
        let index = (i + j * s.width) * 4;
        let noise = s.noise(tx, ty) * 255;
        s.pixels[index] = noise;
        s.pixels[index + 1] = noise;
        s.pixels[index + 2] = noise;
        s.pixels[index + 3] = 255;
        ty += 0.02;
      }
      tx += 0.06;
    }
    s.updatePixels();
  };

  s.draw = function() {};
}

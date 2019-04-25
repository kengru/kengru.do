let grid = [];
let next = [];

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 400);
    s.pixelDensity(1);
    for (let x = 0; x < s.width; x++) {
      grid[x] = [];
      next[x] = [];
      for (let y = 0; y < s.height; y++) {
        grid[x][y] = { a: s.random(1), b: s.random(1) };
        next[x][y] = { a: 0, b: 0 };
      }
    }
  };

  s.draw = function() {
    s.background(51);

    s.loadPixels();
    for (let x = 0; x < s.width; x++) {
      for (let y = 0; y < s.height; y++) {
        let pix = (x + y * s.width) * 4;
        s.pixels[pix + 0] = s.floor(grid[x][y].a * 255);
        s.pixels[pix + 1] = 0;
        s.pixels[pix + 2] = s.floor(grid[x][y].b * 255);
        s.pixels[pix + 3] = 100;
      }
    }
    s.updatePixels();
    s.strokeWeight(2);
    s.line(0, 0, s.width, s.height);
  };
}

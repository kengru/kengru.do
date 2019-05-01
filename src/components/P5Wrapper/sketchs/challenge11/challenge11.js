let cols, rows;
let w = 1800;
let h = 1000;
let scale = 10;
let terrain = [];
let flying = 0;
// TODO: a bird flying by.


export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(800, 400, s.WEBGL);
    cols = w / scale;
    rows = h / scale;

    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      terrain[y] = [];
      for (let x = 0; x < cols; x++) {
        terrain[y][x] = s.map(s.noise(yoff, xoff), 0, 1, -50, 50);
        xoff += 0.2;
      }
      yoff += 0.2;
    }
  };

  s.draw = function() {
    s.ambientLight(150);
    s.lights();
    s.smooth();

    flying -= 0.1;
    let yoff = flying;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      terrain[y] = [];
      for (let x = 0; x < cols; x++) {
        terrain[y][x] = s.map(s.noise(yoff, xoff), 0, 1, -40, 40);
        xoff += 0.1;
      }
      yoff += 0.1;
    }

    s.background(255);
    s.noStroke();
    s.fill(20, 140, 50, 100);

    s.rotateX(s.PI/3);
    s.translate(-w/2, -h/2);

    for (let y = 0; y < rows-1; y++) {
      s.beginShape(s.TRIANGLE_STRIP);
      // s.texture(img);
      for (let x = 0; x < cols; x++) {
        s.vertex(x * scale, y * scale, terrain[y][x]);
        s.vertex(x * scale, (y+1) * scale, terrain[y][x]);
      }
      s.endShape();
    }
  };
}

let cols, rows;
let w = 1800;
let h = 1000;
let scale = 4;
let terrain = [];

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 400, s.WEBGL);
    cols = w / scale;
    rows = h / scale;
    s.ambientLight(150);
    s.lights();
    s.smooth();

    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      terrain[y] = [];
      for (let x = 0; x < cols; x++) {
        terrain[y][x] = s.map(s.noise(yoff, xoff), 0, 1, -50, 50);
        xoff += 0.02;
      }
      yoff += 0.02;
    }

    s.background(255);
    s.noStroke();
    s.fill(20, 140, 50, 100);

    s.rotateX(s.PI / 3);
    s.translate(-w / 2, -h / 2);

    for (let y = 0; y < rows - 1; y++) {
      s.beginShape(s.TRIANGLE_STRIP);
      for (let x = 0; x < cols; x++) {
        s.vertex(x * scale, y * scale, terrain[y][x]);
        s.vertex(x * scale, (y + 1) * scale, terrain[y][x]);
      }
      s.endShape();
    }
  };
}

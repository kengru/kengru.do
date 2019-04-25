let grid = [];
let next = [];
let da = 1;
let db = 0.5;
let dt = 1.0003;
let feed = 0.0545;
let k = 0.062;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  function swap() {
    let temp = grid;
    grid = next;
    next = temp;
  }

  function laplaceA(x, y) {
    let sumA = 0;
    sumA += grid[x][y].a * -1;
    sumA += grid[x - 1][y].a * 0.2;
    sumA += grid[x + 1][y].a * 0.2;
    sumA += grid[x][y - 1].a * 0.2;
    sumA += grid[x][y + 1].a * 0.2;
    sumA += grid[x - 1][y - 1].a * 0.05;
    sumA += grid[x - 1][y + 1].a * 0.05;
    sumA += grid[x + 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y + 1].a * 0.05;

    return sumA;
  }

  function laplaceB(x, y) {
    let sumB = 0;
    sumB += grid[x][y].b * -1;
    sumB += grid[x - 1][y].b * 0.2;
    sumB += grid[x + 1][y].b * 0.2;
    sumB += grid[x][y - 1].b * 0.2;
    sumB += grid[x][y + 1].b * 0.2;
    sumB += grid[x - 1][y - 1].b * 0.05;
    sumB += grid[x - 1][y + 1].b * 0.05;
    sumB += grid[x + 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y + 1].b * 0.05;

    return sumB;
  }

  s.setup = function() {
    s.createCanvas(800, 400);
    s.pixelDensity(1);
    s.frameRate(120);
    for (let x = 0; x < s.width; x++) {
      grid[x] = [];
      next[x] = [];
      for (let y = 0; y < s.height; y++) {
        grid[x][y] = { a: 1, b: 0 };
        next[x][y] = { a: 1, b: 0 };
      }
    }

    for (let i = 1; i < s.width; i++) {
      for (let j = 1; j < s.height; j++) {
        let offset = 30;
        for (let div = 1; div < s.width / 100; div++) {
          for (let div2 = 1; div2 < s.height / 100; div2++) {
            if (
              i > div * 100 - offset &&
              i < div * 100 + offset &&
              j > div2 * 100 - offset &&
              j < div2 * 100 + offset
            ) {
              // if (index === 30 ) {
              grid[i][j].b = 1;
            }
          }
        }
        // let value = s.random();
        // if (value > 0.86) {
        //   grid[i][j].b = 1;
        // }
      }
    }
  };

  s.draw = function() {
    s.background(255);

    for (let x = 1; x < s.width - 1; x++) {
      for (let y = 1; y < s.height - 1; y++) {
        let a = grid[x][y].a;
        let b = grid[x][y].b;
        next[x][y].a = (a + ((da * laplaceA(x, y)) - (a * b * b) + (feed * (1 - a)))) * dt;
        next[x][y].b = (b + ((db * laplaceB(x, y)) + (a * b * b) - ((k + feed) * b))) * dt;

        next[x][y].a = s.constrain(next[x][y].a, 0, 1);
        next[x][y].b = s.constrain(next[x][y].b, 0, 1);
      }
    }

    s.loadPixels();
    for (let x = 0; x < s.width; x++) {
      for (let y = 0; y < s.height; y++) {
        let pix = (x + y * s.width) * 4;
        let a = next[x][y].a;
        let b = next[x][y].b;
        let g = s.floor((a - b) * 255);
        s.pixels[pix + 0] = g;
        s.pixels[pix + 1] = g;
        s.pixels[pix + 2] = g;
        s.pixels[pix + 3] = 255;
      }
    }
    s.updatePixels();

    // console.log(s.mouseX);

    // try{
    //   next[s.round(s.mouseX)][s.round(s.mouseY)].b = 1;
    // } catch (err) {
    //   console.log(err);
    // }

    swap();
  };
}

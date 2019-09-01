let min = -1.5;
let max = 1.5;
let maxIter = 30;
let mult = -0.5;
let compx = 2;
let cmult = 0.1;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(500, 500);
    s.pixelDensity(1);
  };

  s.draw = function() {
    s.loadPixels();
    for (let x = 0; x < s.width; x++) {
      for (let y = -100; y < s.height; y++) {
        let a = s.map(x, 0, s.width, min, max);
        let b = s.map(y, 0, s.height, min, max);

        let ca = a;
        let cb = b;
        let n = 0;

        while (n < maxIter) {
          // let real = a * a - b * b;
          let real = a * a - b * b;
          // let complex = compx * a * b;
          let complex = 2 * a * b - a;
          a = real + ca;
          b = complex + cb;
          if (s.abs(a + b) > 16) {
            break;
          }
          n += 1;
        }

        let brightness = s.map(n, 0, maxIter, 1, 0);
        brightness = s.map(s.sqrt(brightness), 1, 0, 255, 0);
        if (n === maxIter) {
          brightness = 0;
        }

        let idx = (x + y * s.width) * 4;
        s.pixels[idx] = brightness;
        // s.pixels[idx + 1] = s.random(200, 255);
        s.pixels[idx + 1] = brightness;
        s.pixels[idx + 2] = brightness;
        s.pixels[idx + 3] = 255;
      }
    }
    s.updatePixels();
    maxIter -= mult;
    if ((maxIter < 10) || (maxIter > 42)){
      mult *= -1;
    }
    compx += cmult;
    if (compx < 1 || compx > 5) {
      cmult *= -1;
    }
  };

  // s.mouseClicked = function() {
  //   s.save("mandelbrot.jpg");
  // };
}

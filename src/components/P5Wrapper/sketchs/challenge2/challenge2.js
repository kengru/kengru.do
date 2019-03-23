let angleX = 0;
let angleY = 0;
let colorBB = 0;
let sponge = [];

export default function(s) {
  class BigBox {
    constructor(x, y, z, size) {
      this.size = size;
      this.x = x;
      this.y = y;
      this.z = z;
    }

    generate() {
      let boxes = [];
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          for (let z = -1; z < 2; z++) {
            let sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
            let newSize = this.size / 3;
            if (sum > 1) {
              let b = new BigBox(
                this.x + x * newSize,
                this.y + y * newSize,
                this.z + z * newSize,
                newSize
              );
              boxes.push(b);
            }
          }
        }
      }
      return boxes;
    }

    show() {
      s.push();
      s.stroke(255);
      s.fill(colorBB);
      s.translate(this.x, this.y, this.z);
      s.box(this.size);
      s.pop();
    }
  }

  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(800, 600, s.WEBGL);
    colorBB = s.color(51, 102, 204);
    sponge = [];
    let bb = new BigBox(0, 0, 0, 300);
    sponge.push(bb);
  };

  s.draw = function() {
    s.background(0);
    s.ambientLight(200, 200);
    s.ambientMaterial(200);
    s.noFill();
    s.rotateX(angleX);
    s.rotateY(angleY);
    for (let i = 0; i < sponge.length; i++) {
      sponge[i].show();
    }
    if (s.props.rotX) {
      angleX += s.props.rotX.value;
    } else {
      angleX += 0.003;
    }
    if (s.props.rotY) {
      angleY += s.props.rotY.value;
    } else {
      angleY += 0.003;
    }
  };

  s.mousePressed = function() {
    if (sponge.length < 100) {
      let next = [];

      for (let i = 0; i < sponge.length; i++) {
        let newGen = sponge[i].generate();
        next.push(...newGen);
      }
      sponge = next;
    }
  };
}

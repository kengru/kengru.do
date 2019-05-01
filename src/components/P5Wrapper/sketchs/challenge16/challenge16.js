// Variables: A B
// Axiom: A
// rules: (A -> AB), (B -> A)

let angle;
let axiom = "F";
let sentence = axiom;
let len = 80;

let rules = [];

rules[0] = {
  a: "F",
  b: "FF+[F-F-F]-[-F+F+F]+[-F+]-[+F-]"
};

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(700, 500);
    s.background(255);
    angle = s.radians(25);
    turtle();
  };

  s.mousePressed = function() {
    generate();
  };

  function turtle() {
    s.background(255);
    angle += s.radians(2);
    s.resetMatrix();
    s.translate(s.width / 2, s.height);
    s.stroke(10, 150, 0, 100);
    for (let i = 0; i < sentence.length; i++) {
      let current = sentence.charAt(i);

      if (current === "F") {
        s.line(0, 0, 0, -len);
        s.translate(0, -len);
      } else if (current === "+") {
        s.rotate(angle);
      } else if (current === "-") {
        s.rotate(-angle);
      } else if (current === "[") {
        s.push();
      } else if (current === "]") {
        s.pop();
      }
    }
  }

  function generate() {
    if (len > 25) {
      len *= 0.6;
      let nextSentence = "";
      for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);
        let found = false;
        for (let j = 0; j < rules.length; j++) {
          if (current === rules[j].a) {
            found = true;
            nextSentence += rules[j].b;
            break;
          }
        }
        if (!found) {
          nextSentence += current;
        }
      }
      sentence = nextSentence;
      turtle();
    }
  }
}

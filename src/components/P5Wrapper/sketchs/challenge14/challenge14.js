let angle = 0;

export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 500);
    angle = s.PI / 6;
  };

  s.draw = function() {
    s.background(255);

    s.stroke(0);
    s.translate(s.width / 2, s.height);
    branch(150);
  };

  function branch(leng) {
    s.strokeWeight(s.map(leng, 0, 140, 0, 8));
    s.line(0, 0, 0, -leng);
    s.translate(0, -leng);

    if (leng > 2) {
      s.push();
      s.rotate(angle);
      branch(leng * 0.65);
      s.pop();
      s.push();
      s.rotate(-angle);
      branch(leng * 0.65);
      s.pop();
    } else if (leng < 2 && leng > 0.2) {
      s.noStroke();
      s.fill(100, 255, 0, 70);
      s.ellipse(0, 0, leng * 5, leng * 9);
    }
  }
}

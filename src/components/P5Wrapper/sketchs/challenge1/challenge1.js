export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};
  let x;

  s.setup = function() {
    s.createCanvas(600, 500);
    x = 10;
  };

  s.draw = function() {
    if (s.frameCount % 60 === 1) {
      s.onSetAppState({ frameRate: s.frameRate().toFixed(1) });
    }

    s.background(127, 0, 50);
    let weight = s.map(50, 5, 290, 0, 10);
    s.strokeWeight(weight);
    s.stroke(127, 255, 205);
    let alpha = s.map(50, 5, 290, 255, 0);
    s.fill(127, 255, 205, alpha);
    if (x <= 100) {
      x = x + 10;
    } else {
      x = x - 10;
    }
    let size = 50;
    if (s.props.size) size = s.props.size.value;
    s.ellipse(s.width / 2, s.height / 2, size);
  };
}

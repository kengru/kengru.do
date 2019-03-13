export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(900, 300);
  };

  s.draw = function() {
    if (s.frameCount % 60 === 1) {
      s.onSetAppState({ frameRate: s.frameRate().toFixed(1) });
    }

    s.background(0, 0, 50);
    s.stroke(127, 255, 205);
    let color = 30;
    if (s.props.color) color = s.props.color.value;
    s.fill(color, 255, 205, 100);
    let size = 50;
    if (s.props.size) size = s.props.size.value;
    s.ellipse(s.width / 2, s.height / 2, size);
  };
}

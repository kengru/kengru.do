export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(600, 300);
    
  };

  s.draw = function() {
    s.orbitControl();
  };
}

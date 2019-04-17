import Wrapper1 from "../../components/P5Wrapper/sketchs/challenge1/Wrapper1";
import Wrapper2 from "../../components/P5Wrapper/sketchs/challenge2/Wrapper2";
import Wrapper3 from "../../components/P5Wrapper/sketchs/challenge3/Wrapper3";
import Wrapper4 from "../../components/P5Wrapper/sketchs/challenge4/Wrapper4";
import Wrapper5 from "../../components/P5Wrapper/sketchs/challenge5/Wrapper5";

const routes = [
  {
    path: "/challenges/starfield",
    component: Wrapper1
  },
  {
    path: "/challenges/menger",
    component: Wrapper2
  },
  {
    path: "/challenges/snake",
    component: Wrapper3
  },
  {
    path: "/challenges/purplerain",
    component: Wrapper4
  },
  {
    path: "/challenges/spaceinvaders",
    component: Wrapper5
  }
];

export default routes;

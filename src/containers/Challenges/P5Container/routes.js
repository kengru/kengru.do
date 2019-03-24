import Wrapper1 from "../../../components/P5Wrapper/sketchs/challenge1/Wrapper1";
import Wrapper2 from "../../../components/P5Wrapper/sketchs/challenge2/Wrapper2";
import Wrapper3 from "../../../components/P5Wrapper/sketchs/challenge3/Wrapper3";

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
  }
];

export default routes;

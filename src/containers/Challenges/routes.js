import Wrapper1 from "../../components/P5Wrapper/sketchs/challenge1/Wrapper1";
import Wrapper2 from "../../components/P5Wrapper/sketchs/challenge2/Wrapper2";
import Wrapper3 from "../../components/P5Wrapper/sketchs/challenge3/Wrapper3";
import Wrapper4 from "../../components/P5Wrapper/sketchs/challenge4/Wrapper4";
import Wrapper5 from "../../components/P5Wrapper/sketchs/challenge5/Wrapper5";
import Wrapper6 from "../../components/P5Wrapper/sketchs/challenge6/Wrapper6";
import Wrapper7 from "../../components/P5Wrapper/sketchs/challenge7/Wrapper7";
import Wrapper8 from "../../components/P5Wrapper/sketchs/challenge8/Wrapper8";
import Wrapper9 from "../../components/P5Wrapper/sketchs/challenge9/Wrapper9";
import Wrapper10 from "../../components/P5Wrapper/sketchs/challenge10/Wrapper10";

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
  },
  {
    path: "/challenges/mitosis",
    component: Wrapper6
  },
  {
    path: "/challenges/ssystem2d",
    component: Wrapper7
  },
  {
    path: "/challenges/ssystem3d",
    component: Wrapper8
  },
  {
    path: "/challenges/ssystem3dt",
    component: Wrapper9
  },
  {
    path: "/challenges/mazegen",
    component: Wrapper10
  }
];

export default routes;

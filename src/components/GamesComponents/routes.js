import Xcape from "./Games/Xcape";
import NwUI from "./Games/NwUI";
import Solarss from "./Games/Solarss";

const routes = [
  {
    path: "/games/xcape",
    component: Xcape
  },
  {
    path: "/games/nwui",
    component: NwUI
  },
  {
    path: "/games/solarss",
    component: Solarss
  }
];

export default routes;

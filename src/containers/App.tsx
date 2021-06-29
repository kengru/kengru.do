import { SideInfo } from "../components/SideInfo";
import { Projects } from "../components/Projects";
import { ToggleLang } from "../components/ToggleLang";

function App() {
  return (
    <div className="flex bg-white h-full flex-col sm:flex-row">
      <ToggleLang />
      <SideInfo />
      <Projects />
    </div>
  );
}

export { App };

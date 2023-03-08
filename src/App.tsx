import { DropdownContainers } from "./components/DropdownContainers";
import { Switch } from "./components/Switch";

function App() {

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-4/5 h-full p-12 flex flex-col">
        <Switch />
        <DropdownContainers />
      </div>
    </div>
  );
}

export default App;

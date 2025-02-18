import { Sidebar, Canvas } from "./components";

const App = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center mt-10 gap-10">
      <Sidebar />
      <div className="mt-10 bg-gray-100 p-2">
      <Canvas />
      </div>
    </div>
  );
};

export default App;


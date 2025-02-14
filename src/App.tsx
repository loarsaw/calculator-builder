import { Sidebar, Canvas } from './components';


const App = () => {

  return (
    <div className='w-full h-screen flex items-center justify-center gap-10'>
      <Sidebar />
      <Canvas />
    </div>
  );
};

export default App;

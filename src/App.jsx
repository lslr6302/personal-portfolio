import Binder from './binder/Binder';

function App() {
  // h-full, not min-h-full: the binder's children size themselves from a
  // percentage height, which needs a definite one to resolve against
  return (
    <main className="h-full w-full">
      <Binder />
    </main>
  );
}

export default App;

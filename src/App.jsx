import { useState } from 'react'
import './App.css'

const folders = [
  {id: "about", label: "About Me", bg: "bg-blue-300", text: "text-white", tabPosition: "left-6"},
  {id: "projects", label: "Projects", bg: "bg-pink-200", text: "text-stone-900", tabPosition: "left-1/3"},
  {id: "experience", label: "Experience", bg: "bg-stone-400", text: "text-stone-100", tabPosition: "right-1/3"},
  {id: "whimsy", label: "Whimsy", bg: "bg-green-200", text: "text-white", tabPosition: "left-6"},
];

const COLLAPSED_HEIGHT = 80;
const GAP = 8;

function App() {
  const [activeId, setActiveId] = useState("projects");

  const numGaps = folders.length - 1;
  const collapsedSpace = COLLAPSED_HEIGHT * (folders.length - 1) + GAP * numGaps;
  const activeRowSize = `calc(100% - ${collapsedSpace}px)`;

  const gridTemplateRows = folders
    .map((f) => (f.id === activeId ? activeRowSize : `${COLLAPSED_HEIGHT}px`))
    .join(" ");

  return (
    <div
      className="h-screen w-screen bg-amber-100 grid p-4 gap-2 transition-[grid-template-rows] duration-500 ease-in-out"
      style={{ gridTemplateRows }}
    >
      {folders.map((folder, index) => (
        <div
          key={folder.id}
          className="relative"
          style={{ zIndex: index + 1 }}
        >
<button
  onClick={() => setActiveId(folder.id)}
  className={`absolute -top-4 ${folder.tabPosition} h-10 px-20 ${folder.bg} ${folder.text} text-sm font-bold cursor-pointer`}
  style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}
>
  {folder.label}
</button>

          <div
            onClick={() => setActiveId(folder.id)}
            className={`${folder.bg} rounded-t-2xl p-4 h-full cursor-pointer overflow-hidden`}
          >
            <h2 className={`${folder.text} text-lg font-bold`}>{folder.label}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
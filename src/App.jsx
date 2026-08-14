import { useState } from 'react'
import './App.css'

const folders = [
  {id: "about", label: "About Me", bg: "bg-[#94b6ab]", text: "text-white", tabPosition: "left-6"},
  {id: "projects", label: "Projects", bg: "bg-[#dcbdaa]", text: "text-stone-900", tabPosition: "left-1/3"},
  {id: "experience", label: "Experience", bg: "bg-[#ebdec2]", text: "text-stone-100", tabPosition: "right-1/3"},
  {id: "whimsy", label: "Whimsy", bg: "bg-[#746244]", text: "text-white", tabPosition: "left-6"},
];

const COLLAPSED_HEIGHT = 80;

function App() {
  const [activeId, setActiveId] = useState("projects");

  const collapsedSpace = COLLAPSED_HEIGHT * (folders.length - 1);
  const activeRowSize = `calc(100% - ${collapsedSpace}px)`;

  const gridTemplateRows = folders
    .map((f) => (f.id === activeId ? activeRowSize : `${COLLAPSED_HEIGHT}px`))
    .join(" ");

  return (
    <div
      className="h-screen w-screen bg-[#f9f2ec] grid pt-16 transition-[grid-template-rows] duration-500 ease-in-out"
      style={{ gridTemplateRows, alignContent: "end" }}
    >
      {folders.map((folder, index) => (
        <div
          key={folder.id}
          className="relative"
          style={{ zIndex: index + 1 }}
        >
          <button
            onClick={() => setActiveId(activeId === folder.id ? null : folder.id)}
            className={`absolute -top-4 ${folder.tabPosition} h-10 px-20 ${folder.bg} ${folder.text} text-sm font-bold cursor-pointer`}
            style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}
          >
            {folder.label}
          </button>

          <div
            onClick={() => setActiveId(activeId === folder.id ? null : folder.id)}
            className={`${folder.bg} shadow-[0_0px_10px_rgba(0,0,0,0.5)] rounded-t-2xl p-4 h-full cursor-pointer overflow-hidden`}
          >
            <h2 className={`${folder.text} text-lg font-bold`}>{folder.label}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
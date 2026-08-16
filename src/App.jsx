import { useState } from 'react'
import './App.css'
import About from './sections/About'
import Projects from './sections/Projects'
import Experiences from './sections/Experiences'
import Whimsy from './sections/Whimsy'

const folders = [
  { id: "about", label: "About Me", bg: "bg-[#94b6ab]", text: "text-white", tabPosition: "left-6", content: <About /> },
  { id: "projects", label: "Projects", bg: "bg-[#dcbdaa]", text: "text-stone-900", tabPosition: "left-1/3", content: <Projects /> },
  { id: "experience", label: "Experience", bg: "bg-[#ebdec2]", text: "text-stone-900", tabPosition: "right-1/3", content: <Experiences /> },
  { id: "whimsy", label: "Whimsy", bg: "bg-[#746244]", text: "text-white", tabPosition: "left-6", content: <Whimsy /> },
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
      {folders.map((folder, index) => {
        const isActive = folder.id === activeId;
        return (
          <div key={folder.id} className="relative" style={{ zIndex: index + 1 }}>
            <button
              onClick={() => setActiveId(isActive ? null : folder.id)}
              className={`absolute -top-4 ${folder.tabPosition} h-10 px-20 ${folder.bg} ${folder.text} text-sm font-bold cursor-pointer`}
              style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }}
            >
              {folder.label}
            </button>

            <div className={`${folder.bg} shadow-[0_4px_10px_rgba(0,0,0,0.5)] rounded-t-2xl h-full overflow-hidden`}>
              {isActive ? (
                <div className={`h-full overflow-y-auto p-8 ${folder.text}`}>
                  {folder.content}
                </div>
              ) : (
                <button onClick={() => setActiveId(folder.id)} className="h-full w-full flex items-center pl-8 cursor-pointer">
                  <span className={`${folder.text} text-lg font-bold`}>{folder.label}</span>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App
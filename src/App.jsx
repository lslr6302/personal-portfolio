import Particles from "./components/ParticlesBg"
import Navbar from "./sections/Navbar"
import Heading from "./sections/Heading"
import About from "./sections/About"
import Projects from "./sections/Projects"

function App() {
  return (
    <div className="relative min-h-screen dark bg-background">

      {/* Background Particles */}
      <Particles className="-z-10" />

      <Navbar />
      <Heading />
      <About />
      <Projects />

    </div>
  )
}

export default App

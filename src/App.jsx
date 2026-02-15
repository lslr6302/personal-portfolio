import Particles from "./components/ParticlesBg"

function App() {
  return (
    <div className="relative min-h-screen dark bg-background">

      {/* Background Particles */}
      <Particles className="-z-10" />

      {/* Foreground Content */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <h1 className="text-4xl font-bold text-primary">
          Cosmic Night 🌌
        </h1>
      </div>

    </div>
  )
}

export default App

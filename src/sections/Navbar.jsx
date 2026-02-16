function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-primary">Carolol</h1>

        <div className="space-x-6 text-muted-foreground">
          <a href="#about" className="hover:text-primary transition">About</a>
          <a href="#projects" className="hover:text-primary transition">Projects</a>
          <a href="#contact" className="hover:text-primary transition">Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

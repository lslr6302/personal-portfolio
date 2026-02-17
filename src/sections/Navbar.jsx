function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-bold text-primary">
            <a href="#heading" className="hover:text-primary transition">Carolol</a>
        </div>

        <div className="space-x-6 text-muted-foreground">
          <a href="#about" className="hover:text-primary transition">About</a>
          <a href="#projects" className="hover:text-primary transition">Projects</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

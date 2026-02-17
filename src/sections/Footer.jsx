function Footer() {
  return (
    <footer className="relative z-10 border-primary/20 py-6 px-6">
      <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Carol Meng</p>
      </div>
    </footer>
  )
}

export default Footer

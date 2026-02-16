function About() {
  return (
    <section className="min-h-screen flex items-center relative z-10 px-6">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT COLUMN */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            About me
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            I am...
          </p>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex justify-center md:justify-end md:-translate-x-10">
          <div className="relative group">
            tech skills
            <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About

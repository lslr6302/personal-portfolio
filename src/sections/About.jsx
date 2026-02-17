function About() {

    const education = [
        {
        school: "University of Waterloo",
        degree: "Software Engineering",
        period: "2025 - 2030"
        },
        {
        school: "London Central Secondary School",
        degree: "Ontario Secondary School Diploma",
        period: "2021 - 2025"
        }
    ];

    const languages = [
        "Python",
        "Java",
        "C/C++",
        "JavaScript",
        "HTML/CSS",
        "MySQL"
    ];

    const framework = [
        "React",
        "Tailwind CSS",
        "pytest",
        "GTest",
        "NumPy",
        "SciPy",
        "Matplotlib"
    ];

    const tools = [
        "Git",
        "Github",
        "Unix",
        "Bash",
        "LaTeX",
        "VS Code",
        "PyCharm",
        "Eclipse"
    ];

  return (
    <section id="about" className="min-h-screen flex items-center relative z-10 px-6">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT COLUMN */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">
            About me
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
            I am currently a software engineering student at the University of Waterloo.<br />
            I'm interested in robotics or just building cool things in general, and learning 
            fascinating things about the universe.<br />
            During spare time, I like to take pictures about random things or sceneries, baking, and looking for new cat memes.<br />
            Currently, I'm trying to make more cool side projects.
          </p>

          <h2 className="text-4xl font-bold text-primary pt-4">
            Education
          </h2>

          <div className="space-y-4 text-primary">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="border border-primary/30 bg-card rounded-lg p-4 hover:border-primary/60 transition-colors"
              >
                <h3 className="font-semibold text-lg">{edu.school}</h3>
                <p className="text-muted-foreground">{edu.degree}</p>
                <p className="text-sm text-muted-foreground">{edu.period}</p>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-md space-y-6">
            <h2 className="text-4xl font-bold text-primary text-center md:text-left">
              Tech Skills
            </h2>
            
            <div className="border border-primary/30 bg-card rounded-lg p-6 hover:border-primary/60 transition-colors">
              <div className="flex flex-wrap gap-2 text-primary">
                {languages.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-primary/30 bg-card rounded-lg p-6 hover:border-primary/60 transition-colors">
              <div className="flex flex-wrap gap-2 text-primary">
                {framework.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-primary/30 bg-card rounded-lg p-6 hover:border-primary/60 transition-colors">
              <div className="flex flex-wrap gap-2 text-primary">
                {tools.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default About

import {
  CardContainer,
  CardBody,
  CardItem,
} from "../components/Card"

const projects = [
  {
    title: "Project One",
    description: "AI-powered analytics platform.",
    image: "/project1.png",
  },
  {
    title: "Project Two",
    description: "Full-stack community app.",
    image: "/project2.png",
  },
  {
    title: "Project Three",
    description: "Interactive physics simulator.",
    image: "/project3.png",
  },
]

export default function Projects() {
  return (
    <section className="relative py-32">
      <h2 className="text-4xl font-bold text-center mb-20">
        Projects
      </h2>

      {/* Timeline line */}
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-border -translate-x-1/2" />

      <div className="space-y-32">
        {projects.map((project, index) => {
          const isLeft = index % 2 === 0

          return (
            <div
              key={index}
              className="relative flex items-center justify-between w-full animate-fade-in"
            >
              {/* Left side */}
              <div className="w-1/2 flex justify-end pr-12">
                {isLeft && (
                  <ProjectCard project={project} />
                )}
              </div>

              {/* Timeline dot */}
              <div className="relative z-10 w-6 h-6 bg-primary rounded-full border-4 border-background" />

              {/* Right side */}
              <div className="w-1/2 flex justify-start pl-12">
                {!isLeft && (
                  <ProjectCard project={project} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <CardContainer>
      <CardBody className="relative h-auto w-96 rounded-2xl border bg-card p-6 shadow-xl">
        <CardItem
          translateZ={50}
          className="text-xl font-bold"
        >
          {project.title}
        </CardItem>

        <CardItem
          translateZ={60}
          className="mt-2 text-sm text-muted-foreground"
        >
          {project.description}
        </CardItem>

        <CardItem translateZ={100} className="mt-4">
          <img
            src={project.image}
            alt={project.title}
            className="rounded-xl object-cover"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}


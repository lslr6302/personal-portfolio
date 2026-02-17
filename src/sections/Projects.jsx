import {
  CardContainer,
  CardBody,
  CardItem,
} from "../components/Card"

import { Github } from "lucide-react"

import portfolioPic from "../assets/portfolio.png"
import physicsPic from "../assets/physics.png"
import sigmapsPic from "../assets/sigmaps.png"
import fmlPic from "../assets/fml.png"

const projects = [
  {
    title: "Personal Portfolio",
    description: "A webpage that displays a little about me and my projects. The one you see right now!",
    image: portfolioPic,
    link: "https://github.com/lslr6302/personal-portfolio",
    tags: ["React", "Javascript", "Tailwind CSS"],
  },
  {
    title: "Physics Sims",
    description: "Me trying to explore Python libraries thru simple physics simulations.",
    image: physicsPic,
    link: "https://github.com/lslr6302/physics-sims",
    tags: ["Python", "NumPy", "SciPy", "Matplotlib"],
  },
  {
    title: "Fix My Life",
    description: "Task management application that provides visual statistics.",
    image: fmlPic,
    link: "https://se101-team18-flask-app.onrender.com",
    tags: ["React", "Typescript", "Python", "Flask", "pytest"],
  },
  {
    title: "SigMaps",
    description: "AI-powered campus navigation application.",
    image: sigmapsPic,
    link: "https://github.com/Shiman-Zhu/suri-is-awe-sum",
    tags: ["React", "Typescript", "Python"],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-20 text-primary">
          Projects
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <CardContainer>
      <CardBody className="relative w-[500px] rounded-2xl border bg-card p-8 shadow-xl text-primary">

        {/* Title */}
        <CardItem translateZ={50} className="text-2xl font-bold">
          {project.title}
        </CardItem>

        {/* Description */}
        <CardItem
          translateZ={60}
          className="mt-4 text-muted-foreground"
        >
          {project.description}
        </CardItem>

        {/* GitHub Link */}
        <CardItem translateZ={70} className="mt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              text-primary
              hover:opacity-80
              transition-opacity
              font-medium
            "
          >
            <Github size={18} />
            View Code
          </a>
        </CardItem>

        {/* Tags */}
        <CardItem translateZ={80} className="mt-6 flex flex-wrap gap-3">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="
                px-4 py-1 text-sm rounded-full
                bg-primary/20
                text-primary
                border border-primary/30
              "
            >
              {tag}
            </span>
          ))}
        </CardItem>

        {/* Image */}
        <CardItem translateZ={100} className="mt-6">
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

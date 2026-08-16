import ProjectCard from '../components/ProjectCard'
import portfolioPic from '../assets/portfolio.png'
import physicsPic from '../assets/physics.png'
import fmlPic from '../assets/fml.png'
import sigmapsPic from '../assets/sigmaps.png'

const projects = [
  {
    title: "Personal Portfolio",
    description: "A webpage that displays a little about me and my projects. The one you're looking at!",
    image: portfolioPic,
    link: "https://github.com/lslr6302/personal-portfolio",
    tags: ["React", "Javascript", "Tailwind CSS"],
  },
  {
    title: "Physics Sims",
    description: "Exploring Python libraries through simple physics simulations.",
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
];

function Projects() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Projects</h2>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-14">
        {projects.map((project, i) => (
          <div key={project.title} className={i % 2 === 0 ? "-rotate-1" : "rotate-1"}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects
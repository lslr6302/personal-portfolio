import { useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  function handleMouseMove(e) {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // cursor position relative to the card's top-left corner
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // convert to a -0.5 to 0.5 range, where 0 = dead center
    const percentX = x / rect.width - 0.5;
    const percentY = y / rect.height - 0.5;

    const rotateY = percentX * 20;   // left/right tilt, max 20deg
    const rotateX = percentY * -20;  // up/down tilt, max 20deg

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );
  }

  function handleMouseLeave() {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="bg-white rounded-sm shadow-lg p-4 pb-8 transition-transform duration-200 ease-out"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-sm"
      />

      <h3 className="text-lg font-bold text-stone-900 mt-4">{project.title}</h3>
      <p className="text-sm text-stone-600 mt-1">{project.description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-stone-300 text-stone-600">
            {tag}
          </span>
        ))}
      </div>

    <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-stone-900 font-medium mt-4 hover:opacity-60 transition-opacity"
      >
        {project.link.includes('github.com') ? <FaGithub size={22} /> : <ExternalLink size={16} />}
        {project.link.includes('github.com') ? 'View Code' : 'View Project'}
      </a>
    </div>
  );
}

export default ProjectCard
import { useRef, useState } from 'react'
import { ExternalLink, Paperclip } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

function ProjectCard({ project, corner = 'left' }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  function handleMouseMove(e) {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width - 0.5;
    const percentY = y / rect.height - 0.5;

    const rotateY = percentX * 20;
    const rotateX = percentY * -20;

    setTransform(
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    );
  }

  function handleMouseLeave() {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
  }

  const isLeft = corner === 'left';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="relative bg-[#fdfaf3] rounded-sm shadow-lg pt-10 px-5 pb-6 transition-transform duration-200 ease-out"
    >
      {/* photo, pulled up so it overlaps the note's top edge, pinned to one corner */}
      <div className={`relative -mt-16 mb-4 w-[65%] ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-32 object-cover rounded-sm border-4 border-white shadow-md ${isLeft ? '-rotate-2' : 'rotate-2'}`}
        />

        {/* paperclip, vertical, clamped over the corner where photo meets note */}
        <Paperclip
          size={34}
          strokeWidth={1.5}
          className={`absolute -top-4 text-stone-400 ${isLeft ? '-left-3' : '-right-3'}`}
        />
      </div>

      <h3 className="text-lg font-bold text-stone-900">{project.title}</h3>
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
        {project.link.includes('github.com') ? <FaGithub size={16} /> : <ExternalLink size={16} />}
        {project.link.includes('github.com') ? 'View Code' : 'View Project'}
      </a>
    </div>
  );
}

export default ProjectCard
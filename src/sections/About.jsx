import { Mail } from 'lucide-react'
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa'
// import profile from '../assets/profile.jpg'
import SkillPills from '../components/SkillPills'

function About() {
  const education = [
    { school: "University of Waterloo", degree: "Software Engineering", period: "2025 - 2030" },
    { school: "London Central Secondary School", degree: "Ontario Secondary School Diploma", period: "2021 - 2025" },
  ];

  const languages = ["Python", "Java", "C/C++", "JavaScript", "HTML/CSS", "MySQL"];
  const frameworks = ["React", "Tailwind CSS", "pytest", "GTest", "NumPy", "SciPy", "Matplotlib"];
  const tools = ["Git", "Github", "Unix", "Bash", "LaTeX", "VS Code", "PyCharm", "Eclipse"];

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Carol Meng</h1>
          <p className="text-lg opacity-70 mt-2">Software Engineering Student @ UWaterloo</p>

          <div className="flex items-center gap-4 mt-6">
            <a href="https://www.linkedin.com/in/carol-meng-1608a32b4/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:opacity-60 transition-opacity">
            <FaLinkedin size={22} />
            </a>
            <a href="https://github.com/lslr6302" target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:opacity-60 transition-opacity">
            <FaGithub size={22} />
            </a>
            <a href="mailto:c35meng@uwaterloo.ca" title="Email" className="hover:opacity-60 transition-opacity">
            <Mail size={24} />
            </a>
            <span title="loracmmm" className="hover:opacity-60 transition-opacity cursor-default">
            <FaDiscord size={22} />
            </span>
          </div>
        </div>

        {/* <div className="flex justify-center md:justify-end">
          <img src={profile} alt="a photo of me" className="w-56 h-56 object-cover rounded-2xl shadow-lg" />
        </div> */}
      </div>

      <p className="leading-relaxed max-w-2xl">
        I am currently a software engineering student at the University of Waterloo.
        I'm interested in robotics or just building cool things in general, and
        learning fascinating things about the universe. During spare time, I like
        to take pictures about random things or sceneries, baking, and looking for
        new cat memes. Currently, I'm trying to make more cool side projects.
      </p>

      <h3 className="text-xl font-bold mt-10 mb-3">Education</h3>
      <div className="space-y-3">
        {education.map((edu, i) => (
          <div key={i} className="border border-current/20 rounded-lg p-4">
            <p className="font-semibold">{edu.school}</p>
            <p className="text-sm opacity-75">{edu.degree}</p>
            <p className="text-sm opacity-60">{edu.period}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-10 mb-4">Tech Skills</h3>
      <p className="text-sm opacity-60 mb-2">Languages</p>
      <SkillPills items={languages} />
      <p className="text-sm opacity-60 mt-5 mb-2">Frameworks & Libraries</p>
      <SkillPills items={frameworks} />
      <p className="text-sm opacity-60 mt-5 mb-2">Tools</p>
      <SkillPills items={tools} />
    </div>
  );
}

export default About
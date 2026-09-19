/**
 * The facts. No markup here — edit this file to change what the binder says.
 */
import portfolioPic from '../assets/portfolio.png';
import physicsPic from '../assets/physics.png';
import fmlPic from '../assets/fml.png';
import sigmapsPic from '../assets/sigmaps.png';

export const education = [
  {
    school: 'University of Waterloo',
    degree: 'Software Engineering, BASc',
    period: '2025 — 2030',
    note: 'Candidate',
  },
  {
    school: 'London Central Secondary School',
    degree: 'Ontario Secondary School Diploma',
    period: '2021 — 2025',
    note: 'Conferred',
  },
];

export const skills = {
  Languages: ['Python', 'Java', 'C/C++', 'JavaScript', 'HTML/CSS', 'MySQL'],
  'Frameworks & Libraries': [
    'React',
    'Tailwind CSS',
    'pytest',
    'GTest',
    'NumPy',
    'SciPy',
    'Matplotlib',
  ],
  Tools: ['Git', 'GitHub', 'Unix', 'Bash', 'LaTeX', 'VS Code', 'PyCharm', 'Eclipse'],
};

export const projects = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    year: '2025',
    role: 'Solo build',
    status: 'Live — you are reading it',
    image: portfolioPic,
    link: 'https://github.com/lslr6302/personal-portfolio',
    tags: ['React', 'JavaScript', 'Tailwind CSS'],
    summary:
      "A webpage that displays a little about me and my projects. The one you're looking at.",
    notes: [
      'Built as a ring binder: every page turns on a real 3D hinge.',
      'No animation library — the page turn is CSS transforms and a little state.',
    ],
  },
  {
    id: 'physics',
    title: 'Physics Sims',
    year: '2025',
    role: 'Solo build',
    status: 'Ongoing',
    image: physicsPic,
    link: 'https://github.com/lslr6302/physics-sims',
    tags: ['Python', 'NumPy', 'SciPy', 'Matplotlib'],
    summary: 'Exploring Python libraries through simple physics simulations.',
    notes: [
      'An excuse to learn the scientific Python stack properly.',
      'Numerical integration, plotting, and a lot of tweaking constants.',
    ],
  },
  {
    id: 'fml',
    title: 'Fix My Life',
    year: '2025',
    role: 'Team of 6 — SE 101',
    status: 'Deployed',
    image: fmlPic,
    link: 'https://se101-team18-flask-app.onrender.com',
    tags: ['React', 'TypeScript', 'Python', 'Flask', 'pytest'],
    summary: 'Task management application that provides visual statistics.',
    notes: [
      'Flask API behind a React front end, tested with pytest.',
      'Charts turn a to-do list into something you can actually read.',
    ],
  },
  {
    id: 'sigmaps',
    title: 'SigMaps',
    year: '2025',
    role: 'Hackathon team',
    status: 'Prototype',
    image: sigmapsPic,
    link: 'https://github.com/Shiman-Zhu/suri-is-awe-sum',
    tags: ['React', 'TypeScript', 'Python'],
    summary: 'AI-powered campus navigation application.',
    notes: [
      'Routes you across campus, with an assistant that understands plain questions.',
      'Built in a weekend, which shows in the best way.',
    ],
  },
];

/**
 * One component per kind of binder page. Each renders into a single leaf —
 * roughly half a spread — so keep them short and let long material spill onto
 * a second page rather than scrolling.
 */
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { education, skills } from './data';
import {
  Barcode,
  Chips,
  Eyebrow,
  Field,
  FieldGroup,
  PageTitle,
  Stamp,
  Tape,
} from './bits';

export function CoverPage() {
  return (
    <div className="h-full flex flex-col justify-between px-12 py-14 text-center">
      <div>
        <p className="font-label uppercase tracking-[0.4em] text-[10px] text-ink-soft">
          Personal file · No. 2026
        </p>
        <div className="h-px bg-ink/25 my-6" />
        <h1 className="font-display text-[4.2rem] leading-[0.95] text-ink">
          Carol
          <br />
          Meng
        </h1>
        <p className="font-label uppercase tracking-[0.28em] text-[11px] text-accent mt-5">
          Software Engineering · UWaterloo
        </p>
      </div>

      <div>
        <Stamp tilt={-7}>Open me</Stamp>
      </div>

      <div>
        <p className="font-mono text-[10px] text-ink-faint leading-relaxed">
          Turn a corner to flip, or pick a tab to jump.
          <br />
          Arrow keys work too.
        </p>
        <Barcode seed="carol-meng" className="justify-center mt-5 opacity-60" />
      </div>
    </div>
  );
}

export function ProfilePage() {
  const links = [
    {
      icon: <FaLinkedin size={18} />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/carol-meng-1608a32b4/',
    },
    { icon: <FaGithub size={18} />, label: 'GitHub', href: 'https://github.com/lslr6302' },
    { icon: <Mail size={19} />, label: 'Email', href: 'mailto:c35meng@uwaterloo.ca' },
  ];

  return (
    <div className="h-full page-scroll px-12 py-12">
      <PageTitle sub="01 — Profile">Hello, I&rsquo;m Carol.</PageTitle>

      <p className="font-display text-[1.32rem] leading-[1.6] text-ink mb-6">
        I&rsquo;m a software engineering student at the University of Waterloo. I&rsquo;m
        interested in robotics — or really just building cool things in general — and
        learning fascinating things about the universe.
      </p>

      <p className="font-display text-[1.32rem] leading-[1.6] text-ink mb-8">
        In my spare time I take pictures of random things and sceneries, bake, and look
        for new cat memes. Currently I&rsquo;m trying to make more cool side projects.
      </p>

      <Eyebrow className="mb-4">Reach me</Eyebrow>
      <div className="flex flex-wrap items-center gap-5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-accent hover:text-accent-deep transition-colors"
          >
            {link.icon}
            <span className="font-label uppercase tracking-[0.16em] text-[11px]">
              {link.label}
            </span>
          </a>
        ))}
        <span title="loracmmm" className="flex items-center gap-2 text-ink-soft">
          <FaDiscord size={18} />
          <span className="font-label uppercase tracking-[0.16em] text-[11px]">
            loracmmm
          </span>
        </span>
      </div>
    </div>
  );
}

export function EducationPage() {
  return (
    <div className="h-full page-scroll px-12 py-12">
      <PageTitle sub="02 — Record">Education</PageTitle>

      <div className="space-y-6">
        {education.map((entry, i) => (
          <FieldGroup key={entry.school} number={`0${i + 1}`} title="Institution">
            <Field index="a." label="School">
              {entry.school}
            </Field>
            <Field index="b." label="Programme">
              {entry.degree}
            </Field>
            <Field index="c." label="Dates">
              {entry.period}
            </Field>
            <Field index="d." label="Status">
              {entry.note}
            </Field>
          </FieldGroup>
        ))}
      </div>

      <Barcode seed="education" className="mt-10 opacity-50" />
    </div>
  );
}

export function SkillsPage() {
  return (
    <div className="h-full page-scroll px-12 py-12">
      <PageTitle sub="03 — Inventory">Toolkit</PageTitle>

      <div className="space-y-7">
        {Object.entries(skills).map(([group, items]) => (
          <div key={group}>
            <Eyebrow className="mb-3">{group}</Eyebrow>
            <Chips items={items} />
          </div>
        ))}
      </div>

      <p className="font-mono text-[11px] text-ink-faint leading-relaxed mt-10">
        Listed in rough order of how often I reach for them, not of how well I know
        them.
      </p>
    </div>
  );
}

/**
 * Left half of a project's spread: the photo, pinned down like it was taped
 * into the binder, with just enough copy to identify it. The write-up faces
 * it on the next page — see `ProjectDetailPage`.
 */
export function ProjectPhotoPage({ project }) {
  return (
    <div className="h-full page-scroll px-12 py-12 flex flex-col">
      <p className="font-label uppercase tracking-[0.3em] text-[10px] text-ink-soft mb-6">
        {project.year} · Project file
      </p>

      <div className="relative mb-7">
        <Tape className="-top-3 left-10 z-10" tilt={-5} />
        <Tape className="-bottom-3 right-12 z-10" tilt={4} />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-72 object-cover border-[6px] border-page shadow-md -rotate-1"
        />
      </div>

      <h2 className="font-display text-[2.6rem] leading-[1.05] text-ink">
        {project.title}
      </h2>
      <p className="font-label uppercase tracking-[0.16em] text-[11px] text-accent mt-2 mb-5">
        {project.role}
      </p>

      <Chips items={project.tags} />
    </div>
  );
}

/**
 * Right half of a project's spread: the write-up. Always the facing page of
 * `ProjectPhotoPage` for the same project — see the `pairPages` handling in
 * Binder.jsx if you're changing how many pages a project takes.
 */
export function ProjectDetailPage({ project }) {
  const isRepo = project.link.includes('github.com');

  return (
    <div className="h-full page-scroll px-12 py-12">
      <PageTitle sub={`${project.year} · ${project.role}`}>{project.title}</PageTitle>

      <p className="font-display text-[1.25rem] leading-[1.55] text-ink mb-6">
        {project.summary}
      </p>

      <FieldGroup number="01" title="Specification">
        <Field index="a." label="Stack">
          {project.tags.join(' · ')}
        </Field>
        <Field index="b." label="Status">
          {project.status}
        </Field>
      </FieldGroup>

      <Eyebrow className="mb-3">Notes</Eyebrow>
      <ul className="space-y-2 mb-8">
        {project.notes.map((note) => (
          <li key={note} className="flex gap-3">
            <span className="font-mono text-[11px] text-accent pt-[3px]">—</span>
            <span className="font-display text-[1.15rem] leading-[1.5] text-ink">
              {note}
            </span>
          </li>
        ))}
      </ul>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border-2 border-accent text-accent hover:bg-accent hover:text-page transition-colors px-4 py-2"
      >
        {isRepo && <FaGithub size={15} />}
        <span className="font-label uppercase tracking-[0.2em] text-[11px]">
          {isRepo ? 'View code' : 'Open project'}
        </span>
      </a>
    </div>
  );
}

export function ComingSoonPage({ title, sub, body }) {
  return (
    <div className="h-full flex flex-col justify-center px-12 py-12">
      <PageTitle sub={sub}>{title}</PageTitle>
      <p className="font-display text-[1.3rem] leading-[1.6] text-ink mb-8">{body}</p>
      <div>
        <Stamp tilt={-6}>Pending</Stamp>
      </div>
    </div>
  );
}

/**
 * The padding page that keeps each section starting on a left-hand page.
 * Given the section it follows, it reads as a divider rather than a gap.
 */
export function BlankPage({ endOf }) {
  if (!endOf) {
    return <div className="h-full" />;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <span className="h-px w-16 bg-ink/25" />
      <p className="font-label uppercase tracking-[0.34em] text-[10px] text-ink-soft text-center">
        End of {endOf}
      </p>
      <span className="h-px w-16 bg-ink/25" />
    </div>
  );
}

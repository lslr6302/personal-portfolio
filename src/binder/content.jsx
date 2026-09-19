/**
 * The binder's table of contents — the tabs down the right edge and the pages
 * behind each one.
 *
 * To add a page: drop an entry in the relevant section's `pages` array. The
 * binder prepends a contents page to every section automatically, so the new
 * page picks up a quick link and a page number without any other change.
 *
 * To add a section: add an object here. It becomes a new tab.
 */
import { projects } from './data';
import {
  ComingSoonPage,
  EducationPage,
  CoverPage,
  ProfilePage,
  ProjectDetailPage,
  ProjectPhotoPage,
  SkillsPage,
} from './pages';

export const sections = [
  {
    id: 'about',
    label: 'About',
    blurb: 'Who is filing this.',
    pages: [
      {
        id: 'profile',
        title: 'Hello, I’m Carol',
        hint: 'Bio and contact',
        render: () => <ProfilePage />,
      },
      {
        id: 'education',
        title: 'Education',
        hint: 'Schools and dates',
        render: () => <EducationPage />,
      },
      {
        id: 'skills',
        title: 'Toolkit',
        hint: 'Languages, frameworks, tools',
        render: () => <SkillsPage />,
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    blurb: 'Things I have built.',
    // each project is a photo page facing a detail page — see `pairPages`
    // handling in Binder.jsx, which keeps every pair landing left+right
    pairPages: true,
    pages: projects.flatMap((project) => [
      {
        id: project.id,
        title: project.title,
        hint: project.tags.slice(0, 3).join(' · '),
        render: () => <ProjectPhotoPage project={project} />,
      },
      {
        id: `${project.id}-detail`,
        title: `${project.title} — Notes`,
        hideFromToc: true,
        render: () => <ProjectDetailPage project={project} />,
      },
    ]),
  },
  {
    id: 'experience',
    label: 'Experience',
    blurb: 'Where I have worked.',
    pages: [
      {
        id: 'experience-soon',
        title: 'Work history',
        hint: 'In progress',
        render: () => (
          <ComingSoonPage
            title="Work history"
            sub="Section 03"
            body="My first co-op term is still ahead of me, so this page is waiting on its contents. Check back — or reach out and ask what I'm working on."
          />
        ),
      },
    ],
  },
  {
    id: 'whimsy',
    label: 'Whimsy',
    blurb: 'Everything else.',
    pages: [
      {
        id: 'whimsy-soon',
        title: 'Odds and ends',
        hint: 'Photos, baking, cat memes',
        render: () => (
          <ComingSoonPage
            title="Odds and ends"
            sub="Section 04"
            body="Photographs of random things, whatever came out of the oven that week, and a slowly growing archive of cat memes. Being assembled."
          />
        ),
      },
    ],
  },
];

export const coverPage = {
  id: 'cover',
  title: 'Cover',
  render: () => <CoverPage />,
};

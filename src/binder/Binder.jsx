import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sections, coverPage } from './content';
import { BlankPage } from './pages';
import { Barcode, Eyebrow } from './bits';

const FLIP_MS = 700;
const MAX_STAGGER_MS = 420;

/* ------------------------------------------------------------------ *
 * Page list
 * ------------------------------------------------------------------ */

/**
 * Flattens the sections into the binder's physical page list.
 *
 * Three rules shape it:
 *   - a sheet holds two pages, so the list is padded to an even length;
 *   - each section is padded to start on an odd index, which puts its
 *     contents page on the left of a spread and its first real page on the
 *     right — you see both at once when you hit a tab;
 *   - a section flagged `pairPages` (its pages come in twos, meant to be
 *     seen together — a photo page and its facing description) gets one
 *     extra pad after its contents page, so pair one lands on the left
 *     instead of sharing the contents' spread. Every later pair then falls
 *     on the same odd/even footing for free, since each pair spans an even
 *     number of pages.
 */
function buildPages() {
  const pages = [{ ...coverPage, kind: 'cover' }];
  const sectionStarts = {};
  let previous = null;

  for (const section of sections) {
    // pad until the contents page would land on a left-hand (odd) page
    while (pages.length % 2 === 0) {
      pages.push({
        id: `blank-${pages.length}`,
        kind: 'blank',
        endOf: previous,
      });
    }

    previous = section.id;
    sectionStarts[section.id] = pages.length;
    pages.push({
      id: `${section.id}-contents`,
      kind: 'contents',
      sectionId: section.id,
      title: `${section.label} — Contents`,
    });

    if (section.pairPages) {
      while (pages.length % 2 === 0) {
        pages.push({ id: `blank-${pages.length}`, kind: 'blank' });
      }
    }

    for (const page of section.pages) {
      pages.push({ ...page, kind: 'content', sectionId: section.id });
    }
  }

  // a sheet needs a back, so finish on an even count
  if (pages.length % 2 === 1) {
    pages.push({ id: `blank-${pages.length}`, kind: 'blank', endOf: previous });
  }

  return { pages, sectionStarts };
}

/* ------------------------------------------------------------------ *
 * Page chrome
 * ------------------------------------------------------------------ */

function ContentsPage({ section, pageIndexById, goToPage }) {
  return (
    <div className="h-full page-scroll px-12 py-12">
      <p className="font-label uppercase tracking-[0.34em] text-[10px] text-ink-soft">
        Contents
      </p>
      <h2 className="font-display text-[3rem] leading-[1] text-ink mt-1">
        {section.label}
      </h2>
      <p className="font-display italic text-[1.15rem] text-ink-soft mt-2 mb-8">
        {section.blurb}
      </p>

      <Eyebrow className="mb-4">Quick links</Eyebrow>

      <ol className="space-y-1">
        {section.pages
          .filter((page) => !page.hideFromToc)
          .map((page, i) => {
          const target = pageIndexById[page.id];
          return (
            <li key={page.id}>
              <button
                type="button"
                onClick={() => goToPage(target)}
                className="group w-full flex items-baseline gap-3 py-2 text-left hover:text-accent transition-colors"
              >
                <span className="font-mono text-[11px] text-accent shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-[1.3rem] leading-tight text-ink group-hover:text-accent transition-colors">
                  {page.title}
                </span>
                <span className="flex-1 border-b border-dotted border-ink/30 translate-y-[-4px]" />
                <span className="font-mono text-[11px] text-ink-soft shrink-0">
                  p.{String(target + 1).padStart(2, '0')}
                </span>
              </button>
              {page.hint && (
                <p className="font-mono text-[10px] text-ink-faint pl-7 -mt-1 mb-1">
                  {page.hint}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      <Barcode seed={section.id} className="mt-10 opacity-40" />
    </div>
  );
}

/** Wraps page content with its gutter shadow and page number. */
function PageBody({ page, side, number, ctx }) {
  let body;
  if (page.kind === 'contents') {
    body = (
      <ContentsPage
        section={sections.find((s) => s.id === page.sectionId)}
        pageIndexById={ctx.pageIndexById}
        goToPage={ctx.goToPage}
      />
    );
  } else if (page.kind === 'blank') {
    body = <BlankPage endOf={sections.find((s) => s.id === page.endOf)?.label} />;
  } else {
    body = page.render(ctx);
  }

  return (
    <div className="relative h-full w-full">
      {body}
      <div className={`page-gutter page-gutter--${side}`} />
      {page.kind !== 'cover' && page.kind !== 'blank' && (
        <span
          className={`absolute bottom-8 font-mono text-[10px] text-ink-soft ${
            side === 'right' ? 'right-10' : 'left-10'
          }`}
        >
          {String(number).padStart(2, '0')}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Ring hardware
 * ------------------------------------------------------------------ */

function Rings() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-y-0 left-1/2 w-[58px] flex flex-col justify-evenly items-center pointer-events-none"
      style={{ zIndex: 200, transform: 'translateX(-50%) translateZ(26px)' }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-[52px] h-[38px] rounded-full"
          style={{
            border: '7px solid #a98d5f',
            boxShadow:
              'inset 0 2px 0 rgba(255, 244, 214, 0.75), inset 0 -2px 0 rgba(70, 50, 20, 0.55), 0 3px 7px rgba(30, 20, 8, 0.5)',
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Binder
 * ------------------------------------------------------------------ */

export default function Binder() {
  const { pages, sectionStarts } = useMemo(() => buildPages(), []);
  const sheetCount = pages.length / 2;

  const pageIndexById = useMemo(() => {
    const map = {};
    pages.forEach((page, i) => {
      map[page.id] = i;
    });
    return map;
  }, [pages]);

  // number of sheets currently lying on the left
  const [turned, setTurned] = useState(0);
  // which sheets are mid-flip, and which way they are going
  const [motion, setMotion] = useState(null);
  const motionTimer = useRef(null);
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 900,
  );

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => () => clearTimeout(motionTimer.current), []);

  // mirrors `turned` so a rapid second call reads the latest value without
  // having to queue side effects inside a state updater
  const turnedRef = useRef(0);

  const goToSheet = useCallback(
    (next) => {
      const current = turnedRef.current;
      const target = Math.max(0, Math.min(sheetCount, next));
      if (target === current) return;

      const distance = Math.abs(target - current);
      const step = Math.min(70, MAX_STAGGER_MS / Math.max(1, distance - 1));

      turnedRef.current = target;
      setTurned(target);
      setMotion({ from: current, to: target, step });

      clearTimeout(motionTimer.current);
      motionTimer.current = setTimeout(
        () => setMotion(null),
        FLIP_MS + step * distance + 60,
      );
    },
    [sheetCount],
  );

  /** Turn to whichever sheet shows `pageIndex`, on either side of the spread. */
  const goToPage = useCallback(
    (pageIndex) => goToSheet(Math.ceil(pageIndex / 2)),
    [goToSheet],
  );

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight') goToSheet(turned + 1);
      if (e.key === 'ArrowLeft') goToSheet(turned - 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goToSheet, turned]);

  const ctx = useMemo(() => ({ goToPage, pageIndexById }), [goToPage, pageIndexById]);

  // which section the open spread belongs to
  const activeSectionId = useMemo(() => {
    const rightIndex = turned * 2;
    let active = null;
    for (const section of sections) {
      if (sectionStarts[section.id] <= rightIndex) active = section.id;
    }
    return active;
  }, [turned, sectionStarts]);

  function sheetMotion(i) {
    if (!motion) return { moving: false, delay: 0, lift: 0 };
    const { from, to, step } = motion;
    if (to > from) {
      if (i < from || i >= to) return { moving: false, delay: 0, lift: 0 };
      return { moving: true, delay: (i - from) * step, lift: sheetCount - i };
    }
    if (i < to || i >= from) return { moving: false, delay: 0, lift: 0 };
    return { moving: true, delay: (from - 1 - i) * step, lift: i };
  }

  if (narrow) {
    return (
      <SinglePageBinder
        pages={pages}
        sections={sections}
        sectionStarts={sectionStarts}
        ctx={ctx}
      />
    );
  }

  return (
    <div className="h-full w-full flex items-center justify-center p-6 md:p-10">
      <div className="relative flex items-center gap-0">
        {/* the binder itself */}
        <div
          className="relative"
          style={{
            width: 'min(1160px, 86vw)',
            aspectRatio: '1.45',
            maxHeight: '80vh',
          }}
        >
          {/* Cover slab, a little larger than the pages. It sits outside the
              perspective wrapper on purpose: inside it, the browser sorts it
              against the sheets in 3D space and paints it over the pages. */}
          <div
            className="absolute rounded-[10px]"
            style={{
              inset: '-16px -18px',
              background: 'linear-gradient(160deg, #5d4831, #4a3826 40%, #382a1b)',
              boxShadow:
                '0 34px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 245, 225, 0.12)',
            }}
          />

          <div className="binder-stage absolute inset-0" style={{ zIndex: 1 }}>
          <div className="binder-book absolute inset-0">
            {/* Pages resting flat, so the stack never shows the cover through.
                Nudged back in Z so they don't z-fight a sheet lying on them. */}
            <div
              className="paper absolute inset-y-0 left-0 w-1/2 bg-page shadow-inner"
              style={{ transform: 'translateZ(-4px)' }}
            >
              <div className="page-gutter page-gutter--left" />
            </div>
            <div
              className="paper absolute inset-y-0 right-0 w-1/2 bg-page"
              style={{ transform: 'translateZ(-4px)' }}
            >
              <div className="page-gutter page-gutter--right" />
            </div>

            {/* thickness of the untouched stack on each side */}
            <StackEdge side="left" count={turned} />
            <StackEdge side="right" count={sheetCount - turned} />

            {Array.from({ length: sheetCount }, (_, i) => {
              const front = pages[i * 2];
              const back = pages[i * 2 + 1];
              const isTurned = turned > i;
              const { moving, delay, lift } = sheetMotion(i);

              const z = moving
                ? sheetCount + 2 + lift
                : isTurned
                  ? i
                  : sheetCount - i;

              return (
                <div
                  key={front.id}
                  className={`sheet ${moving ? 'is-turning' : ''}`}
                  style={{
                    zIndex: z,
                    transform: `rotateY(${isTurned ? -180 : 0}deg)`,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {/* backface-visibility hides the face that points away but
                      does not stop it catching clicks, so mute it explicitly.
                      The overflow clip lives on the inner .page-surface, not
                      this element — see the comment on .sheet-face in
                      index.css for why they can't share one. */}
                  <div
                    className="sheet-face sheet-face--front"
                    style={{ pointerEvents: isTurned ? 'none' : 'auto' }}
                  >
                    <div className="page-surface">
                      <PageBody page={front} side="right" number={i * 2 + 1} ctx={ctx} />
                    </div>
                  </div>
                  <div
                    className="sheet-face sheet-face--back"
                    style={{ pointerEvents: isTurned ? 'auto' : 'none' }}
                  >
                    <div className="page-surface">
                      <PageBody page={back} side="left" number={i * 2 + 2} ctx={ctx} />
                    </div>
                  </div>
                </div>
              );
            })}

            <Rings />
          </div>
          </div>

          {/* corner flip zones */}
          <CornerFlip
            side="left"
            disabled={turned === 0}
            onClick={() => goToSheet(turned - 1)}
          />
          <CornerFlip
            side="right"
            disabled={turned >= sheetCount}
            onClick={() => goToSheet(turned + 1)}
          />
        </div>

        {/* index tabs — small flags, like a real binder's side tabs, so the
            label reads normally left-to-right rather than running vertically */}
        <div className="relative self-stretch w-[132px] ml-[-2px]">
          {sections.map((section, i) => {
            const isActive = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goToPage(sectionStarts[section.id])}
                style={{ top: `${8 + i * 23}%` }}
                className={`absolute left-0 h-11 px-4 rounded-r-[7px] flex items-center whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-accent text-page translate-x-[10px] shadow-lg'
                    : 'bg-kraft text-ink hover:translate-x-[6px] shadow-md'
                }`}
              >
                <span className="font-label uppercase tracking-[0.16em] text-[12px]">
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* pager */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-5">
        <PagerButton
          label="Previous page"
          disabled={turned === 0}
          onClick={() => goToSheet(turned - 1)}
        >
          <ChevronLeft size={18} />
        </PagerButton>
        <span className="font-mono text-[11px] text-paper/70 tabular-nums">
          {String(Math.min(turned * 2 + 1, pages.length)).padStart(2, '0')} /{' '}
          {String(pages.length).padStart(2, '0')}
        </span>
        <PagerButton
          label="Next page"
          disabled={turned >= sheetCount}
          onClick={() => goToSheet(turned + 1)}
        >
          <ChevronRight size={18} />
        </PagerButton>
      </div>
    </div>
  );
}

/** Thin stack of paper edges, so each side looks like it has depth. */
function StackEdge({ side, count }) {
  const layers = Math.min(6, Math.max(0, Math.round(count / 2)));
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-y-2 ${side === 'left' ? 'left-0' : 'right-0'} pointer-events-none`}
      style={{ zIndex: 0, transform: 'translateZ(-6px)' }}
    >
      {Array.from({ length: layers }, (_, i) => (
        <span
          key={i}
          className="absolute inset-y-0 bg-page-dim"
          style={{
            [side]: `${-2 - i * 1.5}px`,
            width: '2px',
            opacity: 0.85 - i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function CornerFlip({ side, disabled, onClick }) {
  if (disabled) return null;
  const isRight = side === 'right';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isRight ? 'Turn to next page' : 'Turn back a page'}
      className={`absolute bottom-0 h-20 w-20 group ${isRight ? 'right-0' : 'left-0'}`}
      style={{ zIndex: 300 }}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: isRight
            ? 'linear-gradient(315deg, rgba(244,236,216,0.95) 0%, rgba(205,187,147,0.5) 38%, transparent 55%)'
            : 'linear-gradient(45deg, rgba(244,236,216,0.95) 0%, rgba(205,187,147,0.5) 38%, transparent 55%)',
        }}
      />
    </button>
  );
}

function PagerButton({ children, label, disabled, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="w-9 h-9 rounded-full border border-paper/30 text-paper/80 flex items-center justify-center hover:bg-paper/15 disabled:opacity-25 disabled:hover:bg-transparent transition-colors"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Narrow screens: one page at a time, same content and same page list
 * ------------------------------------------------------------------ */

function SinglePageBinder({ pages, sections, sectionStarts, ctx }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next) => {
      const target = Math.max(0, Math.min(pages.length - 1, next));
      setDir(target >= index ? 1 : -1);
      setIndex(target);
    },
    [index, pages.length],
  );

  const mobileCtx = useMemo(
    () => ({ ...ctx, goToPage: (pageIndex) => go(pageIndex) }),
    [ctx, go],
  );

  const page = pages[index];
  const activeSectionId = page.sectionId;

  return (
    <div className="h-full w-full flex flex-col px-4 py-5 gap-3">
      <div className="flex gap-1.5 justify-center flex-wrap">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => go(sectionStarts[section.id])}
            className={`px-3 py-1.5 rounded-t-md font-label uppercase tracking-[0.18em] text-[11px] transition-colors ${
              section.id === activeSectionId
                ? 'bg-accent text-page'
                : 'bg-kraft text-ink'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <div
        className="relative flex-1 min-h-0 rounded-sm overflow-hidden shadow-2xl"
        style={{ perspective: '1600px' }}
      >
        <div
          key={index}
          className="absolute inset-0 page-surface"
          style={{
            animation: `page-in-${dir > 0 ? 'fwd' : 'back'} 420ms cubic-bezier(0.62,0.02,0.24,1)`,
            transformOrigin: dir > 0 ? 'left center' : 'right center',
          }}
        >
          <PageBody page={page} side="right" number={index + 1} ctx={mobileCtx} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 pt-1">
        <PagerButton
          label="Previous page"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <ChevronLeft size={18} />
        </PagerButton>
        <span className="font-mono text-[11px] text-paper/70 tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
        </span>
        <PagerButton
          label="Next page"
          disabled={index >= pages.length - 1}
          onClick={() => go(index + 1)}
        >
          <ChevronRight size={18} />
        </PagerButton>
      </div>
    </div>
  );
}

/**
 * Small presentational pieces shared by binder pages — stamps, tape, field
 * rows, rules. Keeping them here means a page component stays mostly content.
 */

/** Rubber-stamped block of text, rotated like it was pressed by hand. */
export function Stamp({ children, tilt = -8, className = '' }) {
  return (
    <span
      style={{ transform: `rotate(${tilt}deg)` }}
      className={`inline-block border-[3px] border-accent/70 text-accent/80 font-label font-semibold uppercase tracking-[0.18em] text-xs px-3 py-1 opacity-80 ${className}`}
    >
      {children}
    </span>
  );
}

/** Strip of kraft tape, for pinning things to the page. */
export function Tape({ className = '', tilt = -3 }) {
  return (
    <span
      aria-hidden="true"
      style={{ transform: `rotate(${tilt}deg)` }}
      className={`absolute h-6 w-24 bg-kraft/70 shadow-sm ${className}`}
    />
  );
}

/** Section eyebrow: a hairline rule with a label sitting on it. */
export function Eyebrow({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-label uppercase tracking-[0.3em] text-[11px] text-ink-soft whitespace-nowrap">
        {children}
      </span>
      <span className="h-px flex-1 bg-ink/20" />
    </div>
  );
}

/** Big serif page title. */
export function PageTitle({ children, sub }) {
  return (
    <header className="mb-6">
      <h2 className="font-display text-[2.6rem] leading-[1.05] text-ink">{children}</h2>
      {sub && (
        <p className="font-label uppercase tracking-[0.22em] text-[11px] text-accent mt-2">
          {sub}
        </p>
      )}
    </header>
  );
}

/**
 * A numbered record row — the dossier's way of listing a fact.
 * `index` is the lettered sub-key (a., b., c.) from the reference sheets.
 */
export function Field({ index, label, children }) {
  return (
    <div className="flex gap-3 border-b border-ink/12 py-2">
      {index && (
        <span className="font-mono text-[10px] text-ink-faint pt-1 w-4 shrink-0">{index}</span>
      )}
      <span className="font-label uppercase tracking-[0.14em] text-[11px] text-ink-soft pt-[3px] w-28 shrink-0">
        {label}
      </span>
      <span className="font-mono text-[12px] text-ink leading-relaxed flex-1">{children}</span>
    </div>
  );
}

/** Group of fields under a bracketed heading, e.g. 01 [VITALS]. */
export function FieldGroup({ number, title, children }) {
  return (
    <section className="mb-5">
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-[11px] text-accent">{number}</span>
        <h3 className="font-label uppercase tracking-[0.2em] text-[12px] text-ink">
          [{title}]
        </h3>
      </div>
      {children}
    </section>
  );
}

/** Decorative barcode. Deterministic per `seed` so it doesn't flicker. */
export function Barcode({ seed = 'x', className = '' }) {
  const bars = [];
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = 0; i < 44; i++) {
    n = (n * 1103515245 + 12345) >>> 0;
    bars.push(1 + ((n >>> 16) % 3));
  }

  return (
    <div aria-hidden="true" className={`flex items-end gap-[2px] h-7 ${className}`}>
      {bars.map((w, i) => (
        <span key={i} style={{ width: `${w}px` }} className="h-full bg-ink/70" />
      ))}
    </div>
  );
}

/** Pill for a technology or skill. */
export function Chip({ children }) {
  return (
    <span className="font-label uppercase tracking-[0.12em] text-[11px] border border-accent/40 text-accent px-2 py-[3px]">
      {children}
    </span>
  );
}

export function Chips({ items }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Chip key={item}>{item}</Chip>
      ))}
    </div>
  );
}

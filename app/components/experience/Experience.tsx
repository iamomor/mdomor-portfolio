'use client';

import type { Portfolio } from '../../types/portfolio';
import Reveal from '../Reveal';

function formatYear(iso: string): string {
  return new Date(iso).getFullYear().toString();
}
function formatRange(start: string, end: string | null): string {
  const s = new Date(start).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const e = end ? new Date(end).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';
  return `${s} → ${e}`;
}
function duration(start: string, end: string | null): string {
  const from = new Date(start);
  const to = end ? new Date(end) : new Date();
  const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years}y`);
  if (remaining > 0) parts.push(`${remaining}m`);
  return parts.join(' ') || '< 1m';
}

export default function Experience({ data }: Readonly<{ data: Portfolio }>) {
  return (
    <section className="exp section section--invert" id="experience">
      <span className="gutter-label">§ 02 — Career</span>
      <div className="shell exp-shell">
        <Reveal>
          <header className="exp-head">
            <span className="eyebrow">Selected work history</span>
            <h2 className="display-md">
              Four years &amp; counting — building <span className="italic-accent">at the seam</span> of design, code, and business.
            </h2>
          </header>
        </Reveal>
        <ol className="timeline">
          {data.experience.map((exp, i) => (
            <li key={exp.company + exp.startDate} className={`row ${exp.endDate === null ? 'row--current' : ''}`}>
              <div className="row-year">
                <span className="year-marker"></span>
                <span className="year-num">{formatYear(exp.startDate)}</span>
                <span className="year-sub">{duration(exp.startDate, exp.endDate)}</span>
              </div>
              <Reveal delay={i * 60} className="row-body">
                <div className="row-top">
                  <div className="row-id">
                    <span className="row-num">0{i + 1}</span>
                    {exp.endDate === null ? <span className="row-now"><span className="now-dot"></span>Currently</span> : null}
                  </div>
                  <span className="row-range">{formatRange(exp.startDate, exp.endDate)}</span>
                </div>
                <h3 className="row-role">
                  {exp.role}
                  <span className="row-at"> at </span>
                  {exp.companyUrl ? (
                    <a className="row-company" href={exp.companyUrl} target="_blank" rel="noopener noreferrer">
                      {exp.company}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7v9" /></svg>
                    </a>
                  ) : <span className="row-company row-company--plain">{exp.company}</span>}
                </h3>
                {exp.description ? <p className="row-desc">{exp.description}</p> : null}
                <ul className="row-points">
                  {exp.highlights.map((h) => <li key={h}><span className="point-rule"></span><span>{h}</span></li>)}
                </ul>
                <div className="row-tech">{exp.technologies.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

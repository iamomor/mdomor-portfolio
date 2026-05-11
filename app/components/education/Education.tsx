'use client';

import type { Portfolio } from '../../types/portfolio';

export default function Education({ data }: Readonly<{ data: Portfolio }>) {
  const items = data.education ?? [];
  if (!items.length) return null;
  return (
    <section className="edu section" id="education">
      <span className="gutter-label">§ 03 — Schooling</span>
      <div className="shell edu-shell">
        <div className="edu-head">
          <span className="eyebrow">Where it started</span>
          <h2 className="display-md">The page <span className="italic-accent">before page one.</span></h2>
        </div>
        <div className="ribbon">
          <div className="ribbon-line" aria-hidden="true">
            <span className="ribbon-tick ribbon-tick--start"></span>
            <span className="ribbon-fill"></span>
            <span className="ribbon-tick ribbon-tick--end"></span>
          </div>
          <ol className="ribbon-list">
            {items.map((edu) => (
              <li className="bead" key={edu.institution}>
                <span className="bead-year">{new Date(edu.endDate).getFullYear()}</span>
                <span className="bead-dot"></span>
                <div className="bead-body">
                  <h3 className="bead-degree">{edu.degree}</h3>
                  <p className="bead-meta"><span className="bead-inst">{edu.institution}</span><span className="bead-sep">·</span><span>{edu.location}</span></p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

'use client';

import type { Portfolio } from '../../types/portfolio';

export default function Skills({ data }: Readonly<{ data: Portfolio }>) {
  const levelLabel = (level: 'expert' | 'proficient' | 'familiar') =>
    level === 'expert' ? 'Expert' : level === 'proficient' ? 'Proficient' : 'Familiar';

  return (
    <section className="skills section section--invert" id="skills">
      <span className="gutter-label">§ 05 — Stack</span>
      <div className="shell skills-shell">
        <header className="skills-head">
          <span className="eyebrow">Tools of the trade</span>
          <h2 className="display-md">The <span className="italic-accent">moving parts</span> behind the work.</h2>
          <p className="lede">A rolling inventory of the languages, frameworks and habits I lean on every day — paused on hover.</p>
        </header>
      </div>
      <div className="strips">
        {data.skills.map((cat, i) => (
          <div className={`strip ${i % 2 === 1 ? 'strip--reverse' : ''}`} key={cat.category}>
            <span className="strip-label"><span className="strip-num">0{i + 1}</span>{cat.category}</span>
            <div className="strip-track">
              <ul className="strip-row">
                {cat.items.map((item) => (
                  <li className="skill-token" data-level={item.level} key={item.name}>
                    <span className="skill-dot"></span><span className="skill-name">{item.name}</span><span className="skill-meta">{levelLabel(item.level)}</span>
                  </li>
                ))}
              </ul>
              <ul className="strip-row" aria-hidden="true">
                {cat.items.map((item) => (
                  <li className="skill-token" data-level={item.level} key={`${item.name}-dup`}>
                    <span className="skill-dot"></span><span className="skill-name">{item.name}</span><span className="skill-meta">{levelLabel(item.level)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

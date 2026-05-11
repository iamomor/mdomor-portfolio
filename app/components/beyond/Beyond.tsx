'use client';

import type { Portfolio } from '../../types/portfolio';

export default function Beyond({ data }: Readonly<{ data: Portfolio }>) {
  const activities = data.activities ?? [];
  const talks = data.talks ?? [];
  const publications = data.publications ?? [];

  return (
    <section className="beyond section" id="beyond">
      <span className="gutter-label">§ 07 — Beyond</span>
      <div className="shell beyond-shell">
        <header className="beyond-head"><span className="eyebrow">Off the clock</span><h2 className="display-md">Community, talks &amp; <span className="italic-accent">research traces.</span></h2></header>
        {activities.length ? (
          <article className="stack stack--left">
            <aside className="stack-side"><span className="stack-label">Leadership · Activities</span></aside>
            <div className="stack-body">
              {activities.map((activity, i) => (
                <div className="entry" key={activity.organization}>
                  <div className="entry-head"><span className="entry-num">A.0{i + 1}</span><span className="entry-when">{activity.duration}</span></div>
                  <h3 className="entry-title">{activity.role}<span className="entry-at"> — </span><span className="entry-org">{activity.organization}</span></h3>
                  <ul className="entry-points">{activity.highlights.map((h) => <li key={h}><span className="point-rule"></span><span>{h}</span></li>)}</ul>
                </div>
              ))}
            </div>
          </article>
        ) : null}
        {talks.length ? (
          <article className="stack stack--right">
            <aside className="stack-side"><span className="stack-label">Talks · Speaking</span></aside>
            <div className="stack-body">
              {talks.map((talk) => (
                <div className="entry entry--row" key={talk.title}>
                  <span className="entry-year">{talk.year}</span>
                  <div className="entry-content"><h3 className="entry-title entry-title--sm">{talk.title}</h3><p className="entry-meta"><span className="entry-role">{talk.role}</span><span className="entry-sep">·</span><span>{talk.event}</span></p></div>
                </div>
              ))}
            </div>
          </article>
        ) : null}
        {publications.length ? (
          <article className="stack stack--left">
            <aside className="stack-side"><span className="stack-label">Publications · Research</span></aside>
            <div className="stack-body">
              {publications.map((pub, i) => (
                <div className="entry entry--pub" key={pub.doi}>
                  <div className="entry-head"><span className="entry-num">P.0{i + 1}</span><span className="entry-when">{pub.year}</span></div>
                  <h3 className="entry-title entry-title--sm">{pub.title}</h3>
                  <p className="entry-meta">{pub.publisher}</p>
                  <a className="entry-link" href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer">doi.org/{pub.doi}</a>
                </div>
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}

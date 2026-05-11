"use client";

import type { Portfolio } from "../../types/portfolio";
import Reveal from "../Reveal";

const ABOUT_STATS = [
  { value: "4+", label: "Years shipping" },
  { value: "30+", label: "Projects delivered" },
  { value: "8+", label: "Global Markets served" },
  { value: "96+", label: "Performance Score" },
];

function initials(full: string): string {
  return full
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function About({ data }: Readonly<{ data: Portfolio }>) {
  const firstName =
    data.personal.name.trim().split(/\s+/)[0] ?? data.personal.name;
  const locationPrefix = data.personal.location.split(",")[0];

  return (
    <section className="about section" id="about">
      <span className="gutter-label">§ 01 — About</span>
      <div className="shell about-shell">
        <Reveal>
          <header className="about-head">
            <span className="eyebrow">The human</span>
            <h2 className="display-md about-headline">
              Engineering that respects{" "}
              <span className="italic-accent">the reader</span> — interfaces
              that breathe, code that ages well.
            </h2>
          </header>
        </Reveal>
        <div className="about-body">
          <Reveal delay={100}>
            <article className="about-prose">
              <p className="dropcap">{data.personal.bio}</p>
              <p>
                Throughout my career, I bridge technical execution with business
                objectives. From architecting for NY-based Vynero to founding
                AI-driven SASS platform Rielor and ChemStudio, I build systems
                that drive revenue. Having optimized high-scale engines like
                PowerMall, I believe great software sits at the intersection of
                rigorous engineering and strategic product thinking
              </p>
              <ul className="about-meta">
                <li>
                  <span className="meta-label">Based</span>
                  <span className="meta-value">{data.personal.location}</span>
                </li>
                <li>
                  <span className="meta-label">Role</span>
                  <span className="meta-value">{data.personal.title}</span>
                </li>
                <li>
                  <span className="meta-label">Status</span>
                  <span className="meta-value meta-value--accent">
                    Open to projects
                  </span>
                </li>
              </ul>
            </article>
          </Reveal>
          <Reveal delay={200}>
            <aside className="about-visual">
              <figure className="portrait">
                {data.personal.avatar ? (
                  <img
                    src={data.personal.avatar}
                    alt={data.personal.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="portrait-fallback">
                    <span>{initials(data.personal.name)}</span>
                  </div>
                )}
                <figcaption className="portrait-cap">
                  <span>Fig. 01</span>
                  <span>
                    {data.personal.name}, est. {locationPrefix}
                  </span>
                </figcaption>
              </figure>
              <div className="signature" aria-hidden="true">
                <span className="sig-glyph">
                  {initials(data.personal.name)}
                </span>
                <svg viewBox="0 0 200 60" preserveAspectRatio="none">
                  <path
                    d="M5,40 C30,5 60,55 90,30 C120,5 150,55 195,25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </aside>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <blockquote className="pull-quote">
            <span className="quote-mark">“</span>
            <p className="display-md">{data.personal.tagline}</p>
            <footer className="quote-foot">
              <span className="quote-rule"></span>
              <span>— {firstName}, on the job</span>
            </footer>
          </blockquote>
        </Reveal>
        <Reveal>
          <ul className="stats-strip">
            {ABOUT_STATS.map((stat, i) => (
              <li
                className="stat"
                key={stat.label}
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <span className="stat-num">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

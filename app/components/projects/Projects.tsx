"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Portfolio } from "../../types/portfolio";
import Reveal from "../Reveal";

export default function Projects({ data }: Readonly<{ data: Portfolio }>) {
  const projects = data.projects ?? [];
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);
  const featuredCount = Math.max(featured.length, 1);
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStart = useRef(0);
  const dragMoved = useRef(0);
  const counter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(featuredCount).padStart(2, "0")}`;

  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cardWidth = rail.scrollWidth / featuredCount;
    const idx = Math.round(rail.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(featuredCount - 1, idx)));
  };
  const scrollByCard = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const cardWidth = rail.scrollWidth / featuredCount;
    rail.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || event.pointerType === "touch") return;
    const t = event.target as HTMLElement | null;
    // Links/buttons bubble to `.rail`; starting drag toggles `.is-dragging` which applies
    // `pointer-events: none` on all descendants and breaks clicks on Visit live / Source.
    if (t?.closest('a, button, [role="link"]')) return;
    isDragging.current = true;
    dragStartX.current = event.clientX;
    scrollStart.current = rail.scrollLeft;
    dragMoved.current = 0;
    rail.classList.add("is-dragging");
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current || !railRef.current) return;
      const dx = e.clientX - dragStartX.current;
      dragMoved.current = Math.max(dragMoved.current, Math.abs(dx));
      railRef.current.scrollLeft = scrollStart.current - dx;
    };
    const onPointerUp = () => {
      if (!isDragging.current || !railRef.current) return;
      isDragging.current = false;
      railRef.current.classList.remove("is-dragging");
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      // Reset after each rail gesture so stale drag distance does not block later link clicks.
      dragMoved.current = 0;
    };
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };
  return (
    <section className="projects section" id="projects">
      <span className="gutter-label">§ 04 — Projects</span>
      <div className="shell projects-head-shell">
        <Reveal>
          <header className="proj-head">
            <div>
              <span className="eyebrow">Selected projects</span>
              <h2 className="display-md">
                Things I&apos;ve made{" "}
                <span className="italic-accent">on the side</span> — mostly to
                scratch an itch.
              </h2>
            </div>
            <div className="proj-controls">
              <span className="proj-counter" aria-live="polite">
                {counter}
              </span>
              <div className="proj-arrows">
                <button
                  type="button"
                  className="arrow"
                  aria-label="Previous project"
                  onClick={() => scrollByCard(-1)}
                  disabled={activeIndex === 0}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="arrow"
                  aria-label="Next project"
                  onClick={() => scrollByCard(1)}
                  disabled={activeIndex >= featuredCount - 1}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </header>
        </Reveal>
      </div>

      <div
        ref={railRef}
        className="rail"
        aria-label={`Featured projects, ${featured.length} items`}
        role="region"
        tabIndex={0}
        onScroll={onRailScroll}
        onPointerDown={onPointerDown}
      >
        <div className="rail-pad rail-pad--start"></div>
        {featured.map((project) => (
          <article className="panel" key={project.name}>
            <div className="panel-media">
              {project.image ? (
                <img src={project.image} alt={project.name} loading="lazy" />
              ) : (
                <div className="panel-placeholder">
                  <span className="panel-placeholder-glyph">
                    {project.name.charAt(0)}
                  </span>
                </div>
              )}
              <span className="panel-badge">Featured</span>
            </div>
            <div className="panel-body">
              <p className="panel-kicker">
                {project.technologies[0]}
                <span className="panel-kicker-sep">/</span>Case study
              </p>
              <h3 className="panel-title display-md">{project.name}</h3>
              <p className="panel-desc">{project.description}</p>
              <div className="panel-tech">
                {project.technologies.map((tech) => (
                  <span className="chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="panel-actions">
                {project.url ? (
                  <Link
                    className="panel-link"
                    href={project.url.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit live
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </Link>
                ) : null}
                {project.github ? (
                  <Link
                    className="panel-link panel-link--ghost"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        ))}
        <div className="rail-pad rail-pad--end"></div>
      </div>
      <Reveal className="shell rail-hint">
        <span className="rail-hint-line" aria-hidden="true"></span>
        <span className="rail-hint-text py-20">Drag · Scroll · ←/→</span>
      </Reveal>
      {more.length > 0 ? (
        <div className="shell more-shell">
          <Reveal>
            <div className="more-head">
              <span className="eyebrow">Also worth a look</span>
              <span className="kicker">{more.length} more</span>
            </div>
          </Reveal>
          <ul className="more-list" role="list">
            {more.map((project, i) => (
              <li className="more-item" key={project.name}>
                <Reveal delay={i * 40}>
                  <a
                    className="more-link"
                    href={project.url || project.github || "#"}
                    target={
                      project.url || project.github ? "_blank" : undefined
                    }
                    rel="noopener noreferrer"
                  >
                    <span className="more-name">{project.name}</span>
                    <span className="more-desc">{project.description}</span>
                    <span className="more-meta">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span className="chip" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </span>
                    <span className="more-arrow" aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M7 17L17 7M17 7H8M17 7v9" />
                      </svg>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const links = [
  { label: "Index", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const active = useMemo(() => activeSection, [activeSection]);

  return (
    <header className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-pill">
        <Link className="nav-mark" href="/#hero" aria-label="iamomor — home">
          <span className="mark-glyph">O</span>
          <span className="mark-text">mdomor</span>
          <span className="mark-cursor" aria-hidden="true">
            _
          </span>
        </Link>
        <nav className="nav-rail" aria-label="Section navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              className={`nav-rail-link ${active === link.href.slice(1) ? "is-active" : ""}`}
              href={`/${link.href}`}
            >
              <span className="rail-dot" aria-hidden="true"></span>
              <span className="rail-label">{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="nav-tools">
          <button
            className="hamburger"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span className={`bar ${mobileOpen ? "is-open-1" : ""}`}></span>
            <span className={`bar ${mobileOpen ? "is-open-2" : ""}`}></span>
          </button>
        </div>
      </div>
      <div
        className={`mobile-backdrop ${mobileOpen ? "is-visible" : ""}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      <nav className={`mobile-sheet ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <p className="mobile-eyebrow">Index</p>
        <ul>
          {links.map((link, i) => (
            <li key={link.href}>
              <Link
                className={`mobile-link ${active === link.href.slice(1) ? "is-active" : ""}`}
                href={`/${link.href}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mobile-num">0{i + 1}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

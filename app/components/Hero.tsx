"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Portfolio } from "../types/portfolio";

const ROLE_PHRASES = [
  "Frontend Developer",
  "Frontend Architect",
  "UI / UX Tinkerer",
  "System Architect",
  "Full-Stack Developer",
  "Side-Project Addict",
];

export default function Hero({ data }: Readonly<{ data: Portfolio }>) {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [clock, setClock] = useState("Dhaka");
  const [pointer, setPointer] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const roleId = setInterval(() => {
      setActiveRoleIndex((i) => (i + 1) % ROLE_PHRASES.length);
    }, 2400);
    const clockTick = () => {
      try {
        const now = new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Dhaka",
        });
        setClock(`Dhaka ${now}`);
      } catch {
        setClock("Dhaka");
      }
    };
    clockTick();
    const clockId = setInterval(clockTick, 30000);
    const onMove = (e: MouseEvent) =>
      setPointer({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("mousemove", onMove);
    return () => {
      clearInterval(roleId);
      clearInterval(clockId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const [first, ...rest] = data.personal.name.trim().split(/\s+/);

  return (
    <section className="hero" id="hero" style={{ ["--mx" as string]: `${pointer.x}%`, ["--my" as string]: `${pointer.y}%` }}>
      <div className="hero-mesh" aria-hidden="true">
        <span className="blob blob--a"></span>
        <span className="blob blob--b"></span>
        <span className="blob blob--c"></span>
        <span className="hero-spotlight"></span>
      </div>
      <div className="shell hero-shell">
        <div className="hero-meta">
          <span className="status-pill"><span className="dot"></span>Available · Q3 ’26</span>
          <span className="kicker hero-clock">{clock}</span>
        </div>
        <div className="hero-body">
          <div className="hero-name-block">
            <p className="kicker hero-greeting">A portfolio · No. 06 · 2026</p>
            <h1 className="display-xl hero-name">
              <span className="hero-name-line">{first}</span>
              <span className="hero-name-line hero-name-line--last">{rest.join(" ")}<span className="italic-accent">.</span></span>
            </h1>
          </div>
          <aside className="hero-rail" aria-hidden="true">
            <span className="rail-caption">Currently</span>
            <div className="rail-ticker">
              <ul className="rail-stack" style={{ ["--stack-offset" as string]: `-${activeRoleIndex * 1.4}em` }}>
                {ROLE_PHRASES.map((role) => <li className="rail-item" key={role}>{role}</li>)}
              </ul>
            </div>
            <span className="rail-line"></span>
          </aside>
        </div>
        <div className="hero-foot">
          <p className="hero-tagline">
            <span className="hero-tagline-mark">“</span>
            {data.personal.tagline}
            <span className="hero-tagline-mark">”</span>
          </p>
          <div className="hero-actions">
            <Link className="btn btn--primary" href="/#projects">
              See selected work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              className="btn btn--ghost"
              href="https://drive.google.com/file/d/1tvS1_IzXDLloXzdWfFdgT23xuiOXj1Dp/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </a>
          </div>
          <Link className="hero-scroll" href="/#about" aria-label="Scroll to next section">
            <span className="hero-scroll-label">Scroll</span>
            <span className="hero-scroll-line" aria-hidden="true"></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

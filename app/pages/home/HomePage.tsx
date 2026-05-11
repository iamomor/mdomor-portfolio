'use client';

import { Analytics } from "@vercel/analytics/next";
import Hero from '../../components/Hero';
import About from '../../components/about/About';
import Blog from '../../components/blog/Blog';
import Contact from '../../components/contact/Contact';
import Education from '../../components/education/Education';
import Experience from '../../components/experience/Experience';
import Projects from '../../components/projects/Projects';
import Skills from '../../components/skills/Skills';
import type { Portfolio } from '../../types/portfolio';
// import Beyond from '../../components/beyond/Beyond';


export default function HomePage({ data }: Readonly<{ data: Portfolio }>) {   
  return (
    <main>
      <Analytics />
      <Hero data={data} />
      <About data={data} />
      <Experience data={data} />
      <Education data={data} />
      <Projects data={data} />
      <Skills data={data} />
      <Blog data={data} />
      {/* <Beyond data={data} /> */}
      <Contact data={data} />
    </main>
  );
}

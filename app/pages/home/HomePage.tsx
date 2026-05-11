'use client';

import type { Portfolio } from '../../types/portfolio';
import Hero from '../../components/Hero';
import About from '../../components/about/About';
import Experience from '../../components/experience/Experience';
import Education from '../../components/education/Education';
import Projects from '../../components/projects/Projects';
import Skills from '../../components/skills/Skills';
import Blog from '../../components/blog/Blog';
// import Beyond from '../../components/beyond/Beyond';
import Contact from '../../components/contact/Contact';

export default function HomePage({ data }: Readonly<{ data: Portfolio }>) {
  return (
    <main>
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

import Home from './Home';
import Projects from './Projects';
import Contact from './Contact';

export default function Landing() {
  return (
    <main className="relative z-10 mx-auto max-w-[1200px] px-5 pb-10 pt-24">
      <Home />
      <div className="my-24 h-px bg-violet-300/50" aria-hidden="true" />
      <Projects />
      <div className="my-24 h-px bg-violet-300/50" aria-hidden="true" />
      <Contact />
    </main>
  );
}

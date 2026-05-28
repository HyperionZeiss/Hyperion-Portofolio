import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Code } from 'lucide-react';

const img = (name) => `/${encodeURI(name)}`;

export default function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects = [
    {
      title: 'ArticleX Blogging Platform',
      status: 'Deployed',
      image: img('ArticleX.jpg'),
      previewUrl: 'https://www.articlex.space/',
    },
    {
      title: 'Umbrela Logistics Platform',
      status: 'Deployed',
      image: img('Umbrela.jpg'),
      previewUrl: 'https://umbrela-six.vercel.app/',
    },
    {
      title: 'Tactical Zone Shop',
      status: 'On Development - UI/UX Prototype',
      image: img('Tactical Zone Shop.jpg'),
      previewUrl: 'https://www.figma.com/proto/0HxPPRikYRSghWbgx2izlp/Untitled?node-id=1-2&p=f&t=jscPvmITq5qypGAj-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2',
    },
    {
      title: 'Drift Booking System',
      status: 'On Development - UI/UX Prototype',
      image: img('Drift Booking System.jpg'),
      previewUrl: 'https://www.figma.com/proto/yuOx992TvdRnKiLEdEmF56/Project-%22Midnight%22?node-id=324-277&p=f&t=jscPvmITq5qypGAj-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=324%3A277',
    },
    {
      title: 'Circus Movie',
      status: 'On Development',
      image: img('Circus Movie.jpg'),
      previewUrl: '',
    },
    {
      title: 'AI Animal Detection',
      status: 'Contributor',
      image: img('AI Animal Detection .jpg'),
      previewUrl: '',
    },
  ];
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 2);

  return (
    <section className="pt-3" id="projects">
      <p className="m-0 font-medium text-lg text-shimmer-violet">My Work</p>
      <h1 className="mb-6 mt-1 text-3xl font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
        Projects
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
        {visibleProjects.map((p, index) => (
          <article
            className={`neon-border overflow-hidden rounded-[18px] border bg-black/30 shadow-[0_26px_80px_rgba(0,0,0,0.5)] transition-colors hover:border-violet-900 ${
              p.highlight
                ? 'border-violet-900 shadow-[0_0_0_1px_rgba(82,39,255,0.2),0_26px_90px_rgba(0,0,0,0.55)]'
                : 'border-white/10'
            } ${index > 1 ? 'animate-in fade-in slide-in-from-bottom-4 duration-300' : ''}`}
            key={p.title}
          >
            <div className="relative aspect-video bg-black/25">
              <img
                className="h-full w-full object-cover transition-transform duration-200 hover:scale-[1.05]"
                src={p.image}
                alt={p.title}
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-between gap-3 px-3.5 pb-3.5 pt-3">
              <div>
                <h3 className="m-0 text-sm font-semibold text-white/90">{p.title}</h3>
                <p className="m-0 mt-0.5 text-[11px] text-white/55">{p.status}</p>
              </div>

              <div className="flex gap-2">
                <button
                  className="inline-flex h-8 w-9 items-center justify-center rounded-[10px] border border-white/10 bg-black/25 p-0 text-white/80 transition hover:border-white/20 hover:bg-white/5"
                  type="button"
                  aria-label="View code"
                >
                  <Code size={16} />
                </button>
                {p.previewUrl ? (
                  <a
                    className="inline-flex h-8 w-9 items-center justify-center rounded-[10px] border border-white/10 bg-black/25 p-0 text-white/80 transition hover:border-white/20 hover:bg-white/5"
                    href={p.previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.title} preview`}
                  >
                    <ArrowUpRight size={16} />
                  </a>
                ) : (
                  <button
                    className="inline-flex h-8 w-9 cursor-not-allowed items-center justify-center rounded-[10px] border border-white/10 bg-black/25 p-0 text-white/30"
                    type="button"
                    aria-label={`${p.title} preview is not available`}
                    disabled
                  >
                    <ArrowUpRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <button
          className="group inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-black/20 px-5 text-xs font-medium text-white/70 transition hover:border-violet-900 hover:bg-white/5 hover:text-white"
          type="button"
          onClick={() => setShowAllProjects((v) => !v)}
          aria-expanded={showAllProjects}
          aria-controls="projects"
        >
          <span>{showAllProjects ? 'Show less projects' : 'More projects'}</span>
          <ChevronDown
            className={`transition-transform duration-300 group-hover:translate-y-0.5 ${
              showAllProjects ? 'rotate-180 group-hover:-translate-y-0.5' : 'motion-safe:animate-bounce'
            }`}
            size={16}
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}

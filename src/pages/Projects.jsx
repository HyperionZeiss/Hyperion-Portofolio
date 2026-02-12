import { ArrowUpRight, Code } from 'lucide-react';

const img = (name) => `/${encodeURI(name)}`;

export default function Projects() {
  const projects = [
    {
      title: 'Tactical Zone Shop',
      status: 'On Development',
      image: img('Tactical Zone Shop.jpg'),
    },
    {
      title: 'Drift Booking System',
      status: 'On Development',
      image: img('Drift Booking System.jpg'),
    },
    {
      title: 'Circus Movie',
      status: 'On Development',
      image: img('Circus Movie.jpg'),
    },
    {
      title: 'AI Animal Detection',
      status: 'Contributor',
      image: img('AI Animal Detection .jpg'),
    },
  ];

  return (
    <section className="pt-3" id="projects">
      <p className="m-0 font-medium text-lg text-shimmer-violet">My Work</p>
      <h1 className="mb-6 mt-1 text-3xl font-medium leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
        Projects
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
        {projects.map((p) => (
          <article
            className={`neon-border overflow-hidden rounded-[18px] border bg-black/30 shadow-[0_26px_80px_rgba(0,0,0,0.5)] transition-colors hover:border-violet-900 ${
              p.highlight
                ? 'border-violet-900 shadow-[0_0_0_1px_rgba(82,39,255,0.2),0_26px_90px_rgba(0,0,0,0.55)]'
                : 'border-white/10'
            }`}
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
                <button
                  className="inline-flex h-8 w-9 items-center justify-center rounded-[10px] border border-white/10 bg-black/25 p-0 text-white/80 transition hover:border-white/20 hover:bg-white/5"
                  type="button"
                  aria-label="Open preview"
                >
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex h-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-xs text-white/60">
          More projects on
        </div>
      </div>
    </section>
  );
}

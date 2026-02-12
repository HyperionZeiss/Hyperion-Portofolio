import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Marquee from '../components/Marquee';
import LetterGlitch from '../components/LetterGlitch';

export default function Home() {
  const [openService, setOpenService] = useState('web');

  const tools = useMemo(
    () => [
      { label: 'HTML5', icon: '/html5.svg' },
      { label: 'CSS3', icon: '/css3.svg' },
      { label: 'JavaScript', icon: '/javascript.svg' },
      { label: 'TypeScript', icon: '/typescript.svg' },
      { label: 'React', icon: '/react.svg' },
      { label: 'Vite', icon: '/vite.svg' },
      { label: 'NodeJS', icon: '/nodejs.svg' },
      { label: 'NextJS', icon: '/nextjs.svg' },
      { label: 'TailwindCSS', icon: '/tailwindcss.svg' },
      { label: 'MySQL', icon: '/mysql.svg' },
    ],
    [],
  );

  const services = useMemo(
    () => [
      {
        key: 'web',
        title: 'Web Development',
        icon: '/Desktop.svg',
        lines: [
          '•  Single Page Applications (SPAs)',
          '•  Landing pages and business websites',
          '•  Portfolio websites',
        ],
      },
      {
        key: 'mobile',
        title: 'Mobile Development',
        icon: '/Mobile.svg',
        lines: [
                '•  Mobile-friendly web apps', 
                '•  React Native mobile apps'
              ],
      },
      {
        key: 'uiux',
        title: 'UI/UX Design & Prototype',
        icon: '/Designer.svg',
        lines: ['•  UI design with Figma & Canva', 
                '•  UX research & improvements', 
                '•  Prototyping for websites & mobile apps'
              ],
      },
    ],
    [],
  );

  return (
    <>
      <section className="grid grid-cols-1 items-center gap-10 pt-8 md:grid-cols-2 md:gap-14 md:pt-20" id="home">
        <div className="flex flex-col gap-2">
          <p className="mb-3 text-base text-white/80 sm:text-lg">Hi, I’m Gan-Erdene G.</p>
          <h1 className="m-0 text-[52px] font-semibold leading-[1.1] tracking-[-0.00em] text-white/90 sm:text-[64px] lg:text-[80px]">
            Designer Who
            <br />
            Can Actually
            <br />
            Code
          </h1>
          <p className="m-0 max-w-[1200px] text-[18px] leading-7 text-white sm:text-[22px] sm:leading-8 lg:text-[26px]">
            Transforming ideas into interactive and seamless digital experiences with cutting-edge{' '}
            <span className="font-semibold text-shimmer-violet">full stack</span> development.
          </p>
        </div>

        <div className="flex flex-col items-start gap-6">
          <img
            className="w-full max-w-[360px] select-none motion-safe:animate-[shake_5s_ease-in_infinite]"  
            src="/dictionarie.svg"
            alt="Dictionarie"
            draggable={false}
          />
        </div>
      </section>

      <div className="mt-15 flex justify-center" aria-label="Languages and tools">
        <div className="w-full max-w-[1200px] px-4">
          <Marquee
            items={tools}
            speed={50}
            fadeWidth={60}
            itemRenderer={(t) => (
              <div className="inline-flex select-none items-center gap-2.5  px-10 py-2">
                <img className="h-7.5 w-7.5" src={t.icon} alt="" aria-hidden="true" />
                <span className="text-xl tracking-wide text-white/75">{t.label}</span>
              </div>
            )}
          />
        </div>
      </div>

      <section className="mt-20" id="services">
        <h2 className="mb-4 text-[28px] font-semibold text-white/90">What I do?</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-3" role="region" aria-label="Services">
            {services.map((s) => {
              const isOpen = openService === s.key;
              return (
                <div
                  className={`neon-border overflow-hidden rounded-2xl border bg-black/30 transition ${
                    isOpen
                      ? 'border-violet-900 shadow-[0_0_0_1px_rgba(82,39,255,0.2),0_18px_60px_rgba(0,0,0,0.45)]'
                      : 'border-white/10'
                  }`}
                  key={s.key}
                >
                  <button
                    className="flex w-full items-center justify-between gap-3 bg-transparent px-4 py-3.5 text-left text-sm font-semibold text-white/85"
                    type="button"
                    onClick={() => setOpenService((v) => (v === s.key ? '' : s.key))}
                    aria-expanded={isOpen}
                  >
                    <span className="inline-flex items-center gap-3">
                      <img
                        className="h-5 w-5 opacity-90"
                        src={s.icon}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                      />
                      <span>{s.title}</span>
                    </span>
                    <ChevronDown
                      className={`text-white/70 transition ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      size={18}
                    />
                  </button>

                  <div className={isOpen ? 'px-4 pb-3.5' : 'hidden'}>
                    <ul className="m-0 list-none p-0 text-[13px] leading-7 text-white/70">
                      {s.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex min-h-[260px] items-center justify-end">
            <div
              className="relative h-[280px] w-[720px] max-w-full overflow-hidden"
            >
              <div className="absolute inset-0">
                <LetterGlitch
                  glitchSpeed={50}
                  centerVignette={false}
                  outerVignette={true}
                  smooth={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

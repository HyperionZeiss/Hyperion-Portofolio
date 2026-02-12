import { useEffect, useRef, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Landing from './pages/Landing';
import About from './pages/About';
import DotGrid from './components/DotGrid';
import GradualBlur from './components/GradualBlur';

function App() {
  const [active, setActive] = useState('home');
  const [navCompact, setNavCompact] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const neonTargetRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const ids = ['home', 'projects', 'contact'];

    if (location.pathname !== '/') {
      setActive('about');
      setNavCompact(false);
      return;
    }

    const hash = location.hash?.replace('#', '');
    if (hash && ids.includes(hash)) setActive(hash);

    if (hash) {
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }, 0);
    }

    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const offset = 140;
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;

      const prevScrollY = lastScrollYRef.current;
      const delta = scrollY - prevScrollY;

      if (Math.abs(delta) > 6) {
        if (scrollY < 24) {
          setNavCompact(false);
        } else {
          setNavCompact(delta > 0);
        }
        lastScrollYRef.current = scrollY;
      }

      const sections = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: el.getBoundingClientRect().top + scrollY };
        })
        .filter(Boolean);

      if (sections.length === 0) return;

      if (scrollY >= scrollMax - 2) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      const current = sections
        .slice()
        .sort((a, b) => a.top - b.top)
        .reduce((acc, s) => (scrollY + offset >= s.top ? s : acc), sections[0]);

      if (current?.id) setActive(current.id);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const setNeonActive = (el, isActive) => {
      if (!el) return;
      el.dataset.neonActive = isActive ? 'true' : 'false';
    };

    const handlePointerMove = (e) => {
      const el = neonTargetRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      el.style.setProperty('--nb-x', `${Math.max(0, Math.min(100, x))}%`);
      el.style.setProperty('--nb-y', `${Math.max(0, Math.min(100, y))}%`);
    };

    const handlePointerOver = (e) => {
      const next = e.target?.closest?.('.neon-border');
      if (!next) return;

      if (neonTargetRef.current !== next) {
        setNeonActive(neonTargetRef.current, false);
        neonTargetRef.current = next;
      }

      setNeonActive(next, true);
      handlePointerMove(e);
    };

    const handlePointerOut = (e) => {
      const current = neonTargetRef.current;
      if (!current) return;

      const to = e.relatedTarget;
      if (to && current.contains(to)) return;

      setNeonActive(current, false);
      neonTargetRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, true);
    document.addEventListener('pointerout', handlePointerOut, true);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver, true);
      document.removeEventListener('pointerout', handlePointerOut, true);
      setNeonActive(neonTargetRef.current, false);
      neonTargetRef.current = null;
    };
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background:
          'radial-gradient(1200px 800px at 25% 10%, rgba(82, 39, 255, 0.18), transparent 55%), radial-gradient(900px 600px at 70% 15%, rgba(255, 255, 255, 0.06), transparent 60%), linear-gradient(180deg, rgba(3, 0, 8, 1) 0%, rgba(5, 2, 12, 1) 50%, rgba(3, 0, 8, 1) 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden="true">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={.5}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <header className="fixed left-0 right-0 top-6 z-50 flex justify-center px-4 md:top-10">
        <div
          className={`relative w-full max-w-[720px] rounded-2xl border bg-black/30 backdrop-blur transition-all duration-300 ease-out md:max-w-none md:w-auto md:rounded-full ${
            navCompact
              ? 'border-white/5 md:px-6 md:py-1.5'
              : 'border-white/10 md:px-10 md:py-2.5'
          }`}
        >
          <div className="flex items-center justify-between px-3 py-2 md:hidden">
            <span className="text-sm font-semibold text-white/85">Menu</span>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/80 transition hover:bg-white/5"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={mobileNavOpen}
            >
              {mobileNavOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <nav
            className={`hidden items-center gap-10 md:inline-flex ${navCompact ? 'md:gap-6' : 'md:gap-10'}`}
            aria-label="Primary"
          >
            <Link
              className={`inline-flex items-center rounded-full px-3 py-2 text-[15px] tracking-wide transition-colors ${
                active === 'home' ? 'text-white/80' : ' hover:text-white'
              }`}
              to="/#home"
            >
              <span
                className={`mr-2 font-semibold text-xl inline-block h-[7px] w-[7px] rounded-full transition-all ${
                  active === 'home'
                    ? 'scale-100 opacity-100 shadow-[0_0_0_3px_rgba(0,211,77,0.12)]'
                    : 'scale-75 opacity-0'
                }`}
                style={{ background: '#2CFF05' }}
                aria-hidden="true"
              />
              Home
            </Link>

            <Link
              className={`inline-flex items-center rounded-full px-3 py-2 text-[15px] tracking-wide transition-colors ${
                active === 'projects' ? ' text-white/80' : ' hover:text-white'
              }`}
              to="/#projects"
            >
              <span
                className={`mr-2 inline-block h-[7px] w-[7px] rounded-full transition-all ${
                  active === 'projects'
                    ? 'scale-100 opacity-100 shadow-[0_0_0_3px_rgba(0,211,77,0.12)]'
                    : 'scale-75 opacity-0'
                }`}
                style={{ background: '#2CFF05' }}
                aria-hidden="true"
              />
              Projects
            </Link>

            <Link
              className={`inline-flex items-center rounded-full px-3 py-2 text-[15px] tracking-wide transition-colors ${
                active === 'contact' ? ' text-white/80' : ' hover:text-white'
              }`}
              to="/#contact"
            >
              <span
                className={`mr-2 inline-block h-[7px] w-[7px] rounded-full transition-all ${
                  active === 'contact'
                    ? 'scale-100 opacity-100 shadow-[0_0_0_3px_rgba(0,211,77,0.12)]'
                    : 'scale-75 opacity-0'
                }`}
                style={{ background: '#2CFF05' }}
                aria-hidden="true"
              />
              Contact
            </Link>

            <Link
              className={`inline-flex items-center rounded-full px-3 py-2 text-[15px] tracking-wide transition-colors ${
                active === 'about' ? 'text-white/80' : ' hover:text-white'
              }`}
              to="/about"
            >
              <span
                className={`mr-2 inline-block h-[7px] w-[7px] rounded-full transition-all ${
                  active === 'about'
                    ? 'scale-100 opacity-100 shadow-[0_0_0_3px_rgba(0,211,77,0.12)]'
                    : 'scale-75 opacity-0'
                }`}
                style={{ background: '#2CFF05' }}
                aria-hidden="true"
              />
              About
            </Link>
          </nav>

          {mobileNavOpen ? (
            <nav className="md:hidden" aria-label="Mobile primary">
              <div className="flex flex-col gap-1 px-3 pb-3">
                {[
                  { to: '/#home', label: 'Home', id: 'home' },
                  { to: '/#projects', label: 'Projects', id: 'projects' },
                  { to: '/#contact', label: 'Contact', id: 'contact' },
                  { to: '/about', label: 'About', id: 'about' },
                ].map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`inline-flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
                      active === item.id
                        ? 'border-violet-900 bg-white/5 text-white'
                        : 'border-white/10 bg-black/20 text-white/80 hover:bg-white/5'
                    }`}
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`inline-block h-2 w-2 rounded-full ${
                        active === item.id ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ background: '#2CFF05' }}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </nav>
          ) : null}
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <GradualBlur
        target="page"
        position="bottom"
        height="2.5rem"
        strength={1.5}
        divCount={10}
        curve="bezier"
        exponential={true}
        opacity={1}
        zIndex={60}
      />
    </div>
  );
}

export default App;
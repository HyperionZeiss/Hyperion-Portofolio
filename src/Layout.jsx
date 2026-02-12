import DotGrid from './components/DotGrid';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.pathname, location.hash]);

  return (
    <div className="page">
      <div className="page__bg" aria-hidden="true">
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#271E37"
          activeColor="#9253FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <header className="topbar">
        <nav className="pillnav" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `pillnav__link ${isActive ? 'pillnav__link--active' : ''}`
            }
          >
            <span className="pillnav__dot" aria-hidden="true" />
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `pillnav__link ${isActive ? 'pillnav__link--active' : ''}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `pillnav__link ${isActive ? 'pillnav__link--active' : ''}`
            }
          >
            Contact
          </NavLink>
        </nav>
      </header>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

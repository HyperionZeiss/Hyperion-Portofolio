import { useEffect, useMemo, useRef, useState } from 'react';

export default function Marquee({
  items,
  speed = 50,
  className = '',
  fadeWidth = 56,
  itemRenderer,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const xRef = useRef(0);

  const [ready, setReady] = useState(false);

  const rendered = useMemo(() => {
    const base = Array.isArray(items) ? items : [];
    return [...base, ...base];
  }, [items]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setReady(trackRef.current.scrollWidth > 0);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [rendered]);

  useEffect(() => {
    if (!ready) return;

    const step = (t) => {
      if (!lastRef.current) lastRef.current = t;
      const dt = (t - lastRef.current) / 1000;
      lastRef.current = t;

      const track = trackRef.current;
      if (!track) return;

      const half = track.scrollWidth / 2;
      xRef.current -= speed * dt;

      if (half > 0 && Math.abs(xRef.current) >= half) {
        xRef.current += half;
      }

      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      lastRef.current = 0;
    };
  }, [ready, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
        maskImage: `linear-gradient(to right, transparent, black ${fadeWidth}px, black calc(100% - ${fadeWidth}px), transparent)`,
      }}
    >
      <div ref={trackRef} className="flex w-max gap-3" style={{ willChange: 'transform' }}>
        {rendered.map((item, idx) => (
          <div key={idx} className="shrink-0">
            {itemRenderer ? itemRenderer(item, idx) : item}
          </div>
        ))}
      </div>
    </div>
  );
}

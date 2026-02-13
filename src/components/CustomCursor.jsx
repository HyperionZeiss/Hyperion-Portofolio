import { useEffect, useRef, useState } from 'react';

const INTERACTIVE_SELECTOR = 'a,button,[role="button"],input,textarea,select,label,.cursor-target';

const usePointerFine = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const matcher = window.matchMedia('(pointer: fine)');
    const update = (event) => setEnabled(event.matches);

    setEnabled(matcher.matches);
    matcher.addEventListener('change', update);

    return () => matcher.removeEventListener('change', update);
  }, []);

  return enabled;
};

const CustomCursor = () => {
  const isFinePointer = usePointerFine();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isFinePointer) {
      document.body.classList.remove('is-custom-cursor');
      return undefined;
    }

    const body = document.body;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    body.classList.add('is-custom-cursor');

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    pointerRef.current = { x: initialX, y: initialY };
    trailRef.current = { x: initialX, y: initialY };

    dot.style.left = `${initialX}px`;
    dot.style.top = `${initialY}px`;
    ring.style.left = `${initialX}px`;
    ring.style.top = `${initialY}px`;

    const show = () => {
      dot.classList.add('is-visible');
      ring.classList.add('is-visible');
    };

    const hide = () => {
      dot.classList.remove('is-visible');
      ring.classList.remove('is-visible');
      dot.classList.remove('is-hover', 'is-pressing');
      ring.classList.remove('is-hover', 'is-pressing');
    };

    const setInteractive = (value) => {
      dot.classList.toggle('is-hover', value);
      ring.classList.toggle('is-hover', value);
    };

    const handlePointerMove = (event) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;

      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;

      const interactive = event.target?.closest?.(INTERACTIVE_SELECTOR);
      setInteractive(Boolean(interactive));
      show();
    };

    const handlePointerDown = () => {
      dot.classList.add('is-pressing');
      ring.classList.add('is-pressing');
    };

    const handlePointerUp = () => {
      dot.classList.remove('is-pressing');
      ring.classList.remove('is-pressing');
    };

    const handlePointerLeave = () => hide();

    const animate = () => {
      trailRef.current.x += (pointerRef.current.x - trailRef.current.x) * 0.18;
      trailRef.current.y += (pointerRef.current.y - trailRef.current.y) * 0.18;

      ring.style.left = `${trailRef.current.x}px`;
      ring.style.top = `${trailRef.current.y}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointerenter', show);
    window.addEventListener('pointerleave', handlePointerLeave);

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden') hide();
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      body.classList.remove('is-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerenter', show);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
};

export default CustomCursor;

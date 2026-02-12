import { useEffect, useMemo, useState } from 'react';
import { Github, Facebook, Instagram, Twitter, Heart } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');

  const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  const [likes, setLikes] = useState(() => {
    try {
      const raw = localStorage.getItem('contact.likes');
      const n = raw == null ? NaN : Number(raw);
      return Number.isFinite(n) ? n : 0;
    } catch {
      return 0;
    }
  });

  const [hasLiked, setHasLiked] = useState(() => {
    try {
      return localStorage.getItem('contact.hasLiked') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('contact.likes', String(likes));
    } catch {
      // ignore
    }
  }, [likes]);

  useEffect(() => {
    try {
      localStorage.setItem('contact.hasLiked', hasLiked ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [hasLiked]);

  const tech = useMemo(
    () => [
      { label: 'Built with', icon: '/vite.svg', name: 'Vite' },
      { label: 'Styled with', icon: '/tailwindcss.svg', name: 'TailwindCSS' },
      { label: 'Deployed on', icon: '/vercel.svg', name: 'Vercel' },
    ],
    [],
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setSubmitError('Please fill in all fields.');
      setSubmitStatus('error');
      return;
    }

    if (!endpoint) {
      setSubmitError('Missing VITE_FORMSPREE_ENDPOINT.');
      setSubmitStatus('error');
      return;
    }

    try {
      setSubmitStatus('submitting');

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = 'Failed to send message.';
        try {
          const data = await res.json();
          if (data && data.errors && data.errors[0] && data.errors[0].message) msg = data.errors[0].message;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setSubmitStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to send message.');
      setSubmitStatus('error');
    }
  };

  return (
    <section className="pt-3" id="contact">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-11">
        <div>
          <p className="m-0 font-medium text-lg text-shimmer-violet">Let’s Talk</p>
          <h1 className="mb-2 mt-1 text-5xl font-medium leading-[1.05] tracking-[-0.02em] text-white">
            Contact
          </h1>
          <p className="mt-5 font-normal max-w-[720px] text-base leading-6 text-white">
            Have a question or a project in mind? Feel free to reach out.
          </p>
          <p className="m-0 mt-2 text-base text-white">Location: Mongolia, Ulaanbaatar</p>

          <h2 className="mt-5 text-4xl font-semibold leading-[1.15] text-white sm:text-5xl sm:leading-[1.15] lg:text-6xl lg:leading-[1.2]">
            Let’s create your
            <br />
            next big idea.
          </h2>
        </div>

        <div>
          <form
            className="neon-border ml-0 max-w-[480px] rounded-[18px] border border-white/10 bg-black/25 p-3 shadow-[0_26px_80px_rgba(0,0,0,0.55)] md:ml-auto"
            onSubmit={onSubmit}
          >
            <label className="block">
              <span className="sr-only">Name</span>
              <input
                className="mb-2.5 h-11 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-white/90 outline-none placeholder:text-white/45 focus:border-violet-900 focus:shadow-[0_0_0_3px_rgba(82,39,255,0.12)]"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
                autoComplete="name"
              />
            </label>

            <label className="block">
              <span className="sr-only">Email</span>
              <input
                className="mb-2.5 h-11 w-full rounded-xl border border-white/10 bg-black/25 px-3 text-white/90 outline-none placeholder:text-white/45 focus:border-violet-900 focus:shadow-[0_0_0_3px_rgba(82,39,255,0.12)]"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                autoComplete="email"
              />
            </label>

            <label className="block">
              <span className="sr-only">Message</span>
              <textarea
                className="mb-3 w-full resize-none rounded-xl border border-white/10 bg-black/25 px-3 py-3 text-white/90 outline-none placeholder:text-white/45 focus:border-violet-900 focus:shadow-[0_0_0_3px_rgba(82,39,255,0.12)]"
                placeholder="Message"
                rows={6}
                value={form.message}
                onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
              />
            </label>

            {submitStatus === 'success' ? (
              <p className="mb-3 mt-0 text-sm text-white/80">Message sent. Thank you!</p>
            ) : null}

            {submitStatus === 'error' && submitError ? (
              <p className="mb-3 mt-0 text-sm text-red-300">{submitError}</p>
            ) : null}

            <button
              className="h-10 w-full rounded-xl border border-white/20 bg-black/20 text-sm text-white/70 transition hover:bg-white/5 hover:text-white/90"
              type="submit"
              disabled={submitStatus === 'submitting'}
            >
              {submitStatus === 'submitting' ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      <div className="my-10 h-px bg-violet-300/50" />

      <div className="flex flex-col justify-center items-center gap-10 md:flex-row">
        <div>
          <div className="flex gap-2.5" aria-label="Social links">
            <a
              className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/80 transition hover:bg-white/5"
              href="#"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/80 transition hover:bg-white/5"
              href="#"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/80 transition hover:bg-white/5"
              href="#"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/80 transition hover:bg-white/5"
              href="#"
              aria-label="Platform X"
            >
              <Twitter size={18} />
            </a>
          </div>

          <button
            className={`mt-3 inline-flex h-[30px] items-center gap-2 rounded-full border border-violet-900 px-11 text-sm font-normal text-white ${
              hasLiked ? 'cursor-not-allowed opacity-60' : ''
            }`}
            type="button"
            disabled={hasLiked}
            onClick={() => {
              if (hasLiked) return;
              setLikes((v) => v + 1);
              setHasLiked(true);
            }}
          >
            <Heart size={20} className="text-violet-900" />
            <span>{likes} Likes</span>
          </button>
        </div>

        <div>
          <div className="flex flex-col gap-2 justify-center " aria-label="Tech stack">
            {tech.map((t) => (
              <div className="flex items-center gap-2" key={t.name}>
                <span className="text-sm text-white">{t.label}</span>
                <span className="inline-flex items-center gap-2 text-sm text-white">
                  <img className="h-3.5 w-3.5 opacity-85" src={t.icon} alt="" aria-hidden="true" />
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto my-10 h-px max-w-[600px] bg-violet-300/50" />

      <p className="m-0 text-center text-sm font-normal text-white/50">
        Copyright © 2026 Hyperion. All rights reserved.
      </p>
    </section>
  );
}

import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:max-w-[1200px] lg:px-[120px] lg:pt-[200px]">
      <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[420px]">
            <ProfileCard
              className="mx-auto"
              avatarUrl="/profile.png"
              miniAvatarUrl="/profile.png"
              iconUrl="/code.svg" 
              grainUrl=""
              innerGradient="linear-gradient(145deg, rgba(82,39,255,0.38) 0%, rgba(10,6,22,0.88) 50%, rgba(255,255,255,0.06) 100%)"
              behindGlowEnabled={true}
              behindGlowColor="rgba(82, 39, 255, 0.65)"
              behindGlowSize="58%"
              enableMobileTilt={true}
              mobileTiltSensitivity={7}
              name="Gan-Erdene G."
              title="Full Stack Developer"
              handle="hyperion"
              status="Available"
              contactText="Contact"
              onContactClick={() => {
                navigate('/#contact');
              }}
            />
          </div>
        </div>

        <div className="neon-border w-full rounded-[28px] border border-white/10 bg-black/30 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)] hover:border-violet-900 sm:p-8">
          <div className="w-full max-w-none text-white lg:max-w-[520px]">
            <h2 className="m-0 mt-10 text-[18px] font-semibold text-white">Hello!</h2>

            <p className="mt-5 text-[13px] leading-6">
              My name is Gan-Erdene G. and I specialize in web development that utilizes{' '}
              <span className="text-violet-700">HTML</span>, <span className="text-violet-700">CSS</span>,{' '}
              <span className="text-violet-700">JS</span>, and <span className="text-violet-700">REACT</span> etc.
            </p>

            <p className="mt-5 text-[13px] leading-6">
              I am a highly motivated individual and eternal optimist dedicated to writing clear, concise, robust code that works.
              Striving to never stop learning and improving.
            </p>

            <p className="mt-5 text-[13px] leading-6">
              When I&apos;m not coding, I am writing blogs, reading, or picking up some new hands-on art project like{' '}
              <span className="text-violet-700">photography</span>.
            </p>

            <p className="mt-5 text-[13px] leading-6">
              Previously worked in vector graphic design for 5 years. Extensive <span className="text-violet-700">UI/UX</span> experience.
            </p>

            <p className="mt-5 text-[13px] leading-6">
              I like to have my perspective and belief systems challenged so that I see the world through new eyes.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

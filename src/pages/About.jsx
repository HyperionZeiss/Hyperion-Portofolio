import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';

const PHONE_NUMBER = '+97695524975';

export default function About() {
  const navigate = useNavigate();
  const [bioLanguage, setBioLanguage] = useState('en');

  const bio = {
    mn: {
      greeting: 'Сайн байна уу!',
      paragraphs: [
        (
          <>
            Намайг Ган-Эрдэнэ гэдэг. Би <span className="text-violet-700">HTML</span>,{' '}
            <span className="text-violet-700">CSS</span>, <span className="text-violet-700">JavaScript</span>,{' '}
            <span className="text-violet-700">TypeScript</span>, <span className="text-violet-700">React</span> болон{' '}
            <span className="text-violet-700">Vite</span> ашиглан хурдан, responsive веб интерфэйс хөгжүүлдэг.
          </>
        ),
        (
          <>
            Full stack талдаа <span className="text-violet-700">NodeJS</span>,{' '}
            <span className="text-violet-700">NestJS</span>, <span className="text-violet-700">NextJS</span>,{' '}
            <span className="text-violet-700">TailwindCSS</span>-тэй ажиллаж, өгөгдлийн сан болон cache хэсэгт{' '}
            <span className="text-violet-700"> MySQL</span>, <span className="text-violet-700">PostgreSQL</span>,{' '}
            <span className="text-violet-700">MongoDB</span>, <span className="text-violet-700">Redis</span> ашиглан
            бодит хэрэглээнд ойр шийдлүүд бүтээхийг зорьдог.
          </>
        ),
        'Би цэвэр, ойлгомжтой, найдвартай ажилладаг код бичихийг эрхэмлэдэг. Дизайн, хэрэглэгчийн туршлага, performance гурвыг хамтад нь бодож хөгжүүлэхийг хичээдэг.',
        (
          <>
            Код бичээгүй үедээ блог бичих, унших, мөн <span className="text-violet-700">photography</span> зэрэг бүтээлч
            зүйлсээр өөрийгөө хөгжүүлэх дуртай.
          </>
        ),
        (
          <>
            Өмнө нь 5 жилийн турш vector graphic design чиглэлээр ажилласан. Мөн{' '}
            <span className="text-violet-700">UI/UX</span> design-ийн туршлагатай.
          </>
        ),
        'Өөрийн үзэл бодол, итгэл үнэмшлийг шинэ өнцгөөс харах боломж олгодог сорилтуудад дуртай.',
      ],
    },
    en: {
      greeting: 'Hello!',
      paragraphs: [
        (
          <>
            My name is Gan-Erdene G. and I build fast, responsive web interfaces with{' '}
            <span className="text-violet-700">HTML</span>, <span className="text-violet-700">CSS</span>,{' '}
            <span className="text-violet-700">JavaScript</span>, <span className="text-violet-700">TypeScript</span>,{' '}
            <span className="text-violet-700">React</span>, and <span className="text-violet-700">Vite</span>.
          </>
        ),
        (
          <>
            On the full-stack side, I work with <span className="text-violet-700">NodeJS</span>,{' '}
            <span className="text-violet-700">NestJS</span>, <span className="text-violet-700">NextJS</span>, and{' '}
            <span className="text-violet-700">TailwindCSS</span>, with data and caching experience across{' '}
            <span className="text-violet-700">MySQL</span>, <span className="text-violet-700">PostgreSQL</span>,{' '}
            <span className="text-violet-700">MongoDB</span>, and <span className="text-violet-700">Redis</span>.
          </>
        ),
        'I care about clear, maintainable code that works well in real products. I like connecting design, user experience, and performance instead of treating them as separate pieces.',
        (
          <>
            When I&apos;m not coding, I am writing blogs, reading, or picking up some new hands-on art project like{' '}
            <span className="text-violet-700">photography</span>.
          </>
        ),
        (
          <>
            Previously worked in vector graphic design for 5 years. Extensive{' '}
            <span className="text-violet-700">UI/UX</span> experience.
          </>
        ),
        'I like to have my perspective and belief systems challenged so that I see the world through new eyes.',
      ],
    },
  };

  const activeBio = bio[bioLanguage];
  const onProfileContactClick = () => {
    if (PHONE_NUMBER) {
      window.location.href = `tel:${PHONE_NUMBER.replace(/\s/g, '')}`;
      return;
    }

    navigate('/#contact');
  };

  return (
    <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:max-w-[1000px] lg:px-[60px] lg:pt-[200px]">
      <section
        className="grid grid-cols-1 justify-center gap-10 md:grid-cols-[minmax(0,420px)_minmax(0,420px)]"
        style={{ '--about-card-height': 'min(80svh, 540px)' }}
      >
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
              onContactClick={onProfileContactClick}
            />
          </div>
        </div>

        <div
          className="neon-border box-border w-full max-w-[420px] justify-self-center overflow-hidden rounded-[28px] border border-white/10 bg-black/30 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.45)] hover:border-violet-900 sm:p-8"
          style={{ height: 'var(--about-card-height)' }}
        >
          <div className="flex h-full w-full max-w-none flex-col text-white">
            <div className="flex shrink-0 items-center justify-between gap-4">
              <h2 className="m-0 text-[18px] font-semibold text-white">{activeBio.greeting}</h2>

              <div
                className="inline-flex rounded-full border border-white/10 bg-black/25 p-0.5"
                role="group"
                aria-label="Bio language"
              >
                {[
                  { key: 'mn', label: 'MN' },
                  { key: 'en', label: 'EN' },
                ].map((item) => (
                  <button
                    className={`h-5 rounded-full px-2 text-[10px] font-semibold leading-none transition ${
                      bioLanguage === item.key
                        ? 'bg-violet-900 text-white'
                        : 'text-white/55 hover:bg-white/5 hover:text-white/85'
                    }`}
                    key={item.key}
                    type="button"
                    onClick={() => setBioLanguage(item.key)}
                    aria-pressed={bioLanguage === item.key}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="scrollbar-hidden mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
              {activeBio.paragraphs.map((paragraph, index) => (
                <p className="mt-4 first:mt-0 text-[13px] leading-[1.75]" key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

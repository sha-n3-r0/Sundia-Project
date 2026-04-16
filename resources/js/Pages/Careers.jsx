import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { publicAssetUrl } from '@/utils/publicAssetUrl';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

function JobIcon({ variant }) {
    const red = '#DC2626';
    const white = '#ffffff';

    if (variant === 1) {
        return (
            <svg width="28" height="28" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 35C20 28.3726 25.3726 23 32 23H58C64.6274 23 70 28.3726 70 35V65C70 71.6274 64.6274 77 58 77H32C25.3726 77 20 71.6274 20 65V35Z" fill={red} />
                <path d="M28 37C28 32.5817 31.5817 29 36 29H54C58.4183 29 62 32.5817 62 37V63C62 67.4183 58.4183 71 54 71H36C31.5817 71 28 67.4183 28 63V37Z" fill={white} opacity="0.25" />
                <path d="M32 49H58" stroke={white} strokeWidth="4" strokeLinecap="round" />
                <path d="M32 58H46" stroke={white} strokeWidth="4" strokeLinecap="round" />
            </svg>
        );
    }

    if (variant === 2) {
        return (
            <svg width="28" height="28" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 10C32.5 10 22.5 20 22.5 32.5C22.5 49.2 45 80 45 80C45 80 67.5 49.2 67.5 32.5C67.5 20 57.5 10 45 10Z" fill={red} />
                <path d="M35 34L43 42L56 29" stroke={white} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22.5 32.5C22.5 49.2 45 80 45 80" stroke={white} strokeWidth="3" opacity="0.35" />
            </svg>
        );
    }

    if (variant === 3) {
        return (
            <svg width="28" height="28" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 30C18 23.3726 23.3726 18 30 18H60C66.6274 18 72 23.3726 72 30V60C72 66.6274 66.6274 72 60 72H30C23.3726 72 18 66.6274 18 60V30Z" fill={red} />
                <path d="M26 46L40 33L55 48L64 39" stroke={white} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M26 62H64" stroke={white} strokeWidth="4" strokeLinecap="round" opacity="0.7" />
            </svg>
        );
    }

    return (
        <svg width="28" height="28" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 20C32 20 22 30 22 43C22 56 32 66 45 66C58 66 68 56 68 43C68 30 58 20 45 20Z" fill={red} />
            <path d="M45 29V43L55 50" stroke={white} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 43H22.5" stroke={white} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            <path d="M67.5 43H70" stroke={white} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

export default function Careers({ careerCultureCards = [], careerJobs = [] }) {
    const { props } = usePage();
    const heroBackgroundImage =
        publicAssetUrl(props.backgroundPicture?.images?.[0] || props.backgroundPicture?.image_path) ||
        '/careers.jpg';
    const positionsRef = useRef(null);
    const [positionsInView, setPositionsInView] = useState(false);

    useEffect(() => {
        const el = positionsRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setPositionsInView(true);
            },
            { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const revealEase = 'transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]';
    const headingHidden = 'opacity-0 translate-y-7';
    const headingShown = 'opacity-100 translate-y-0';
    const cardHidden = 'opacity-0 translate-y-8';
    const cardShown = 'opacity-100 translate-y-0';

    return (
        <>
            <Head title="Careers" />
            <div className="min-h-screen font-sans antialiased">
                {/* Header outside hero `isolate` so fixed nav z-index stacks above later page sections */}
                <Header />

                {/* Pull hero over Header’s 120px spacer so the photo reaches the top (under the fixed nav). */}
                <div className="relative isolate -mt-[120px] min-h-screen pt-[120px]">
                    {/* object-cover fills the viewport (no side bars); aspect ratio may crop top/bottom */}
                    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden bg-stone-950">
                        <img src={heroBackgroundImage} alt="" className="h-full w-full min-h-full min-w-full object-cover object-top" />
                        <div className="pointer-events-none absolute inset-0 bg-black/55" />
                    </div>

                    <main className="relative z-10 mx-auto max-w-7xl min-h-screen flex flex-col justify-center px-6 lg:px-8 pb-10 pt-8 lg:pt-10">
                        <div className="max-w-[760px]">
                            <h1 className="text-white text-hero">Careers at Sundia</h1>
                            <p className="mt-6 text-subtitle text-red-600">Build with us. Grow with us.</p>
                            <p className="mt-4 text-neutral-200 text-body">
                                We are always looking for talented people who value quality, safety, and continuous improvement.
                                Join Sundia Group and help us deliver reliable solutions across multiple industries.
                            </p>
                        </div>
                    </main>
                </div>

                <div ref={positionsRef}>
                    <section className="border-t border-red-600/25 bg-gradient-to-b from-stone-950 via-neutral-950 to-stone-900 py-16 lg:py-20 font-['Inter']">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <p
                                className={`mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-neutral-200 sm:text-lg will-change-transform motion-reduce:transition-none ${revealEase} ${positionsInView ? headingShown : headingHidden}`}
                                style={{ transitionDelay: '0ms' }}
                            >
                                At Sundia Group Philippines, we believe a great workplace blends growth, trust, and teamwork. From
                                training and modern spaces to gatherings that celebrate our people, we are building a culture where
                                you can thrive.
                            </p>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
                                {careerCultureCards.map((item, idx) => (
                                    <article
                                        key={item.id}
                                        className={`flex flex-col overflow-hidden rounded-3xl border border-red-600/50 bg-neutral-900/80 shadow-lg shadow-black/40 ring-1 ring-inset ring-white/5 will-change-transform motion-reduce:transition-none ${revealEase} hover:-translate-y-1 hover:border-red-500 hover:shadow-xl hover:shadow-red-950/30 ${positionsInView ? cardShown : cardHidden}`}
                                        style={{ transitionDelay: `${60 + idx * 100}ms` }}
                                    >
                                        <div className="aspect-[16/10] w-full shrink-0 overflow-hidden border-b border-red-600/20">
                                            <img
                                                src={encodeURI(item.image)}
                                                alt={item.title}
                                                className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col bg-gradient-to-b from-neutral-900/40 to-stone-950/80 p-6">
                                            <h3 className="text-lg font-bold text-red-600 sm:text-xl">{item.title}</h3>
                                            <p className="mt-3 text-sm leading-relaxed text-neutral-200 sm:text-[15px]">{item.body}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white pt-14 pb-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div
                                className={`text-center mb-10 will-change-transform motion-reduce:transition-none ${revealEase} ${positionsInView ? headingShown : headingHidden}`}
                                style={{ transitionDelay: '120ms' }}
                            >
                                <h2 className="text-black text-section font-['Inter'] mb-4 uppercase tracking-widest">
                                    Available Positions
                                </h2>
                                <p className="text-neutral-500 text-body font-['Inter'] max-w-3xl mx-auto">
                                    Here are a few roles we are currently hiring for. If your profile matches, apply through our contact section.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {careerJobs.map((job, idx) => (
                                    <div
                                        key={job.id}
                                        className={`bg-neutral-100 rounded-[3px] shadow-lg overflow-hidden will-change-transform motion-reduce:transition-none ${revealEase} hover:-translate-y-1 hover:shadow-xl ${positionsInView ? cardShown : cardHidden}`}
                                        style={{ transitionDelay: `${380 + idx * 95}ms` }}
                                    >
                                    <div className="h-2 w-full bg-red-600" />
                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-neutral-700 text-subtitle font-['Inter'] uppercase tracking-widest">
                                                    {job.title}
                                                </h3>
                                                <p className="mt-2 text-neutral-500 text-body text-sm font-['Inter']">
                                                    {job.type} • {job.location}
                                                </p>
                                            </div>
                                            <div className="w-12 h-12 bg-red-600 rounded-[3px] flex items-center justify-center text-white flex-shrink-0">
                                                <JobIcon variant={job.icon_variant ?? idx + 1} />
                                            </div>
                                        </div>

                                        <p className="mt-4 text-black text-body-lg text-sm font-['Inter']">{job.summary}</p>

                                        <ul className="mt-4 space-y-2 text-neutral-700 text-[13px] font-['Inter']">
                                            {job.bullets.map((b) => (
                                                <li key={b} className="flex items-start gap-2">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="mt-auto pt-5">
                                            <a
                                                href="https://docs.google.com/forms/d/e/1FAIpQLSeVU5oixGHORdYCgZLZ5Y35mYMJPgk9ELeplc8vz8-6yacSHg/viewform?fbclid=IwY2xjawRKyxBleHRuA2FlbQMxMDAAc3J0YwZhcHBfaWQBMAABHo-i-n2Kt89eCYPApNG_0bSydjMU79-Rm0OV-J8AioFzSV6HQiEti7JUuFdi_aem__bxwauZFs8r5PT99El8VOQ"
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center justify-center w-full h-11 rounded-full bg-red-600 text-white text-sm font-semibold font-['Inter'] shadow-md transition-colors duration-300 ease-out hover:bg-red-500"
                                            >
                                                Apply Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </section>
                </div>

                <Footer />
            </div>
        </>
    );
}


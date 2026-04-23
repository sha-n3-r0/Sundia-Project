import { Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Footer() {
    const { props } = usePage();
    const footerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const footerSetting = props.footerSetting ?? {};

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsInView(true);
            },
            { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const animate = 'transition-all duration-700 ease-out';
    const from = 'opacity-0 translate-y-6';
    const to = 'opacity-100 translate-y-0';

    const quickLinks = [
        { href: route('home'), label: 'HOME' },
        { href: route('siam'), label: 'SIAM' },
        { href: route('tpsmi'), label: 'TPSMI' },
        { href: route('top-offroad'), label: 'TOP OFFROAD' },
        { href: route('home') + '#contact', label: 'CONTACT US' },
    ];
    const aboutText =
        footerSetting.about_text ||
        'At Sundia Group Philippines, we bring innovative solutions to life. Our core values of being solutions-oriented, united, disciplined, having integrity, and being adaptable to change drive us every day.';
    const contactEmailPrimary = footerSetting.contact_email_primary || 'sundia.hrd@yahoo.com';
    const contactPhone = footerSetting.contact_phone || '(049) 502 2443';
    const contactEmailSecondary =
        footerSetting.contact_email_secondary || 'jep.bernas@sundiagroup.com.ph';
    const contactCompanyLabel = footerSetting.contact_company_label || 'Sundia Group';

    return (
        <footer
            ref={footerRef}
            className="w-full bg-stone-900 text-white"
        >
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8">
                    {/* Brand */}
                    <div
                        className={`md:col-span-1 lg:col-span-5 ${animate} ${isInView ? to : from}`}
                        style={{ transitionDelay: '0ms' }}
                    >
                        <Link href={route('home')} className="inline-block max-w-[min(100%,20rem)]">
                            <img
                                className="h-auto w-full max-h-28 object-contain object-left sm:max-h-32"
                                src="/Sundialogo.png"
                                alt="Sundia Group"
                            />
                        </Link>
                        <p className="mt-6 max-w-md text-xs font-normal leading-relaxed text-white/60 font-['Inter']">
                            {aboutText}
                        </p>
                    </div>

                    {/* Quick links */}
                    <nav
                        className={`flex flex-col md:col-span-1 lg:col-span-3 ${animate} ${isInView ? to : from}`}
                        style={{ transitionDelay: '80ms' }}
                        aria-label="Quick links"
                    >
                        <h2 className="text-xs font-extrabold tracking-wide text-white font-['Inter']">
                            QUICK LINKS
                        </h2>
                        <ul className="mt-5 flex flex-col gap-3 sm:gap-2.5">
                            {quickLinks.map(({ href, label }) => (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className="text-xs font-bold text-white/60 transition-colors hover:text-white font-['Inter']"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div
                        className={`flex flex-col border-t border-white/10 pt-10 md:col-span-2 md:border-t md:border-white/10 md:pt-8 lg:col-span-4 lg:border-t-0 lg:pt-0 ${animate} ${isInView ? to : from}`}
                        style={{ transitionDelay: '140ms' }}
                    >
                        <h2 className="text-xs font-extrabold tracking-wide text-white font-['Inter']">
                            CONTACT
                        </h2>
                        <ul className="mt-5 flex flex-col gap-2.5 text-xs font-bold text-white/60 font-['Inter']">
                            <li>
                                <a
                                    href={`mailto:${contactEmailPrimary}`}
                                    className="break-all transition-colors hover:text-white"
                                >
                                    {contactEmailPrimary}
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${contactPhone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-white">
                                    {contactPhone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${contactEmailSecondary}`}
                                    className="break-all underline transition-colors hover:text-white"
                                >
                                    {contactEmailSecondary}
                                </a>
                            </li>
                            <li className="pt-0.5">{contactCompanyLabel}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

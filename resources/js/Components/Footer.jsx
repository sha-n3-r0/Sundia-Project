import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Footer() {
    const footerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsInView(true);
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const animate = 'transition-all duration-700 ease-out';
    const from = 'opacity-0 translate-y-8';
    const to = 'opacity-100 translate-y-0';

    return (
        <div ref={footerRef} className="w-full flex justify-center bg-stone-900 overflow-hidden">
            <div className="w-[1440px] max-w-full h-72 relative px-4 box-border">
                <div className="w-full h-72 left-0 top-0 absolute bg-stone-900" />
                <Link href={route('home')} className={`w-80 h-32 left-[133.50px] top-[10.50px] absolute block ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '0ms' }}>
                    <img className="w-80 h-32" src="/Sundialogo.png" alt="Sundia Group" />
                </Link>
                <div className={`w-96 left-[171px] top-[147px] absolute inline-flex flex-col justify-start items-start ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '80ms' }}>
                    <div className="self-stretch justify-center text-white/60 text-xs font-normal font-['Inter'] leading-5">
                        At Sundia Group Philippines, we bring innovative solutions to life. Our<br />
                        core values of being solutions-oriented, united, disciplined, having<br />
                        integrity, and being adaptable to change drive us every day.
                    </div>
                </div>
                <div className={`left-[821.25px] top-[43.50px] absolute justify-center text-white text-xs font-extrabold font-['Inter'] ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '120ms' }}>QUICK LINKS</div>
                <Link href={route('home')} className={`left-[818.25px] top-[106.50px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] hover:text-white transition-colors ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '160ms' }}>HOME</Link>
                <Link href={route('siam')} className={`left-[818.25px] top-[138.75px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] hover:text-white transition-colors ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '200ms' }}>SIAM</Link>
                <Link href={route('tpsmi')} className={`left-[818.25px] top-[171px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] hover:text-white transition-colors ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '240ms' }}>TPSMI</Link>
                <Link href={route('top-offroad')} className={`left-[818.25px] top-[203.25px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] hover:text-white transition-colors ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '280ms' }}>TOP OFFROAD</Link>
                <Link href={route('home') + '#contact'} className={`left-[818.25px] top-[236.25px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] hover:text-white transition-colors ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '320ms' }}>CONTACT US</Link>
                <div className={`left-[1170px] top-[43.50px] absolute justify-center text-white text-xs font-extrabold font-['Inter'] ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '120ms' }}>CONTACT</div>
                <div className={`left-[1170px] top-[106.50px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '200ms' }}>sundia.hrd@yahoo.com</div>
                <div className={`left-[1170px] top-[138.75px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '240ms' }}>(049) 502 2443</div>
                <div className={`left-[1170px] top-[171px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] underline ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '280ms' }}>jep.bernas@sundiagroup.com.ph</div>
                <div className={`left-[1170px] top-[203.25px] absolute justify-center text-white/60 text-xs font-bold font-['Inter'] ${animate} ${isInView ? to : from}`} style={{ transitionDelay: '320ms' }}>Sundia Group</div>
            </div>
        </div>
    );
}

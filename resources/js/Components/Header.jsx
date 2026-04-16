import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
    const { url, props } = usePage();
    const auth = props.auth;
    const sundia = props.sundia;
    const navbarLogoSrc = sundia?.logo_path ?? '/Sundialogo.png';
    const [hidden, setHidden] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const lastScrollY = useRef(0);

    // hide on scroll down, show on hover/top movement
    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            // hide when scrolling down and not at top
            if (currentY > lastScrollY.current && currentY > 0) {
                setHidden(true);
            }
            // show when reaching very top
            if (currentY === 0) {
                setHidden(false);
            }
            lastScrollY.current = currentY;
        };
        const onMouseMove = (e) => {
            if (e.clientY < 50) {
                setHidden(false);
            }
        };
        document.addEventListener('scroll', onScroll);
        document.addEventListener('mousemove', onMouseMove);
        return () => {
            document.removeEventListener('scroll', onScroll);
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    function RibbonHoverMenu({ items, onItemClick, backgroundColor }) {
        return (
            <div style={{ backgroundColor }} className="w-40 rounded-2xl border border-white/20 p-2 shadow-lg">
                {items.map(({ href, label }) => (
                    <a
                        key={label}
                        href={href}
                        onClick={(event) => onItemClick(event, href)}
                        className="block rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/20"
                    >
                        {label}
                    </a>
                ))}
            </div>
        );
    }

    const currentRoute = route().current();

    const getRibbonSectionHref = (sectionKey) => {
        const samePageRoutes = ['siam', 'tpsmi', 'top-offroad'];

        if (sectionKey === 'contact') {
            return currentRoute === 'home' ? '#contact' : route('home') + '#contact';
        }

        if (sectionKey === 'about') {
            if (samePageRoutes.includes(currentRoute)) {
                return '#about';
            }
            return route('home') + '#about';
        }

        if (sectionKey === 'products') {
            if (samePageRoutes.includes(currentRoute)) {
                return '#products';
            }
            return route('home') + '#products';
        }

        return route('home') + `#${sectionKey}`;
    };

    const scrollToHash = (href) => {
        if (typeof window === 'undefined') {
            return false;
        }

        const url = new URL(href, window.location.origin);
        const currentPath = window.location.pathname.replace(/\/$/, '');
        const targetPath = url.pathname.replace(/\/$/, '');

        if (currentPath !== targetPath) {
            return false;
        }

        if (!url.hash) {
            return false;
        }

        const element = document.getElementById(url.hash.slice(1));
        if (!element) {
            return false;
        }

        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
    };

    const handleRibbonItemClick = (event, href) => {
        event.preventDefault();
        if (scrollToHash(href)) {
            return;
        }
        router.visit(href);
    };

    useEffect(() => {
        setMobileNavOpen(false);
    }, [url]);

    useEffect(() => {
        if (!mobileNavOpen) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setMobileNavOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [mobileNavOpen]);

    useEffect(() => {
        const scrollToHashOnLoad = () => {
            if (typeof window === 'undefined') return;
            const { hash } = window.location;
            if (!hash) return;
            const element = document.getElementById(hash.slice(1));
            if (!element) return;
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        scrollToHashOnLoad();
        const timeoutId = window.setTimeout(scrollToHashOnLoad, 50);
        return () => window.clearTimeout(timeoutId);
    }, [url]);

    const isTopOffroadPage = route().current('top-offroad');
    const navBarColor = isTopOffroadPage ? '#FF6E00' : '#FF0000';

    const scrollToTop = () => {
        if (window.scrollY > 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const navLinks = [
        { 
            href: route('home'), 
            routeName: 'home',
            label: 'Home',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 11V2C3 1.73478 3.10536 1.48043 3.29289 1.29289C3.48043 1.10536 3.73478 1 4 1H8C8.26522 1 8.51957 1.10536 8.70711 1.29289C8.89464 1.48043 9 1.73478 9 2V11H3Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3 6H2C1.73478 6 1.48043 6.10536 1.29289 6.29289C1.10536 6.48043 1 6.73478 1 7V10C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H3"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 4.5H10C10.2652 4.5 10.5196 4.60536 10.7071 4.79289C10.8946 4.98043 11 5.23478 11 5.5V10C11 10.2652 10.8946 10.5196 10.7071 10.7071C10.5196 10.8946 10.2652 11 10 11H9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 3H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 5H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 7H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 9H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
        { 
            href: route('siam'), 
            routeName: 'siam',
            label: 'SIAM',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 10C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V4L7.5 6.5V4L4 6.5V2C4 1.73478 3.89464 1.48043 3.70711 1.29289C3.51957 1.10536 3.26522 1 3 1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V10Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.5 9H9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 9H6.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.5 9H4"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
        { 
            href: route('tpsmi'), 
            routeName: 'tpsmi',
            label: 'TPSMI',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 2H3C2.44772 2 2 2.44772 2 3V9C2 9.55228 2.44772 10 3 10H9C9.55228 10 10 9.55228 10 9V3C10 2.44772 9.55228 2 9 2Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7 4.5H5C4.72386 4.5 4.5 4.72386 4.5 5V7C4.5 7.27614 4.72386 7.5 5 7.5H7C7.27614 7.5 7.5 7.27614 7.5 7V5C7.5 4.72386 7.27614 4.5 7 4.5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M7.5 1V2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 10V11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 7.5H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 4.5H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 7.5H11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 4.5H11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 1V2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 10V11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        { 
            href: route('top-offroad'), 
            routeName: 'top-offroad',
            label: 'TOP OFFROAD',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.5 8.5H10.5C10.8 8.5 11 8.3 11 8V6.5C11 6.05 10.65 5.65 10.25 5.55C9.35 5.3 8 5 8 5C8 5 7.35 4.3 6.9 3.85C6.65 3.65 6.35 3.5 6 3.5H2.5C2.2 3.5 1.95 3.7 1.8 3.95L1.1 5.4C1.03379 5.59311 1 5.79585 1 6V8C1 8.3 1.2 8.5 1.5 8.5H2.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.5 9.5C4.05228 9.5 4.5 9.05228 4.5 8.5C4.5 7.94772 4.05228 7.5 3.5 7.5C2.94772 7.5 2.5 7.94772 2.5 8.5C2.5 9.05228 2.94772 9.5 3.5 9.5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M4.5 8.5H7.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.5 9.5C9.05228 9.5 9.5 9.05228 9.5 8.5C9.5 7.94772 9.05228 7.5 8.5 7.5C7.94772 7.5 7.5 7.94772 7.5 8.5C7.5 9.05228 7.94772 9.5 8.5 9.5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
        {
            href: route('careers'),
            routeName: 'careers',
            label: 'CAREERS',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 3.5H2C1.44772 3.5 1 3.94772 1 4.5V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V4.5C11 3.94772 10.5523 3.5 10 3.5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 3.5V2.5C8 2.23478 7.89464 1.98043 7.70711 1.79289C7.51957 1.60536 7.26522 1.5 7 1.5H5C4.73478 1.5 4.48043 1.60536 4.29289 1.79289C4.10536 1.98043 4 2.23478 4 2.5V3.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 7C6.55228 7 7 6.55228 7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
    ];

    const ribbonMenuItems = [
        { label: 'About', href: getRibbonSectionHref('about') },
        { label: 'Products', href: getRibbonSectionHref('products') },
        { label: 'Contact', href: getRibbonSectionHref('contact') },
    ];

    const navRef = useRef(null);
    const linkRefs = useRef([]);
    const [lineStyle, setLineStyle] = useState({ left: 0, width: 0 });
    const [hoverIndex, setHoverIndex] = useState(-1);

    const activeIndex = navLinks.findIndex(
        ({ href, routeName }) =>
            routeName != null
                ? currentRoute === routeName
                : href === '#careers' && url.includes('#careers')
    );

    const isRibbonLink = [1, 2, 3].includes(activeIndex);
    const ribbonLinksClass = isRibbonLink ? 'w-16 h-12 rounded overflow-hidden' : '';

    useEffect(() => {
        if (activeIndex === -1) return;
        const linkEl = linkRefs.current[activeIndex];
        const navEl = navRef.current;
        if (!linkEl || !navEl) return;
        const updateLine = () => {
            if (typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches) {
                setLineStyle({ left: 0, width: 0 });
                return;
            }
            const linkRect = linkEl.getBoundingClientRect();
            const navRect = navEl.getBoundingClientRect();
            setLineStyle({
                left: linkRect.left - navRect.left,
                width: linkRect.width,
            });
        };
        updateLine();
        window.addEventListener('resize', updateLine);
        return () => window.removeEventListener('resize', updateLine);
    }, [activeIndex, currentRoute, url]);

    return (
        <>
        <header
            onClick={scrollToTop}
            className={
                "fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 transition-opacity duration-300 " +
                (hidden
                    ? "-translate-y-full opacity-0 pointer-events-none"
                    : "translate-y-0 opacity-100 pointer-events-auto")
            }
        >
            {/* Top Logo Bar */}
            <div className="bg-[linear-gradient(to_right,_rgb(163,163,163)_0%,_rgb(209,213,219)_18%,_white_26%,_white_100%)] border-b border-gray-200">
                <div className="mx-auto flex max-w-7xl items-center px-6 py-2">
                    <Link href="/">
                        <img
                            src={sundia?.logo_path ?? '/Sundialogo.png'}
                            alt="Sundia Logo"
                            className="h-16 w-auto"
                        />
                    </Link>
                </div>
            </div>

            {/* Red Navigation Bar with Curved Left Edge */}
            <div className="absolute right-0 top-11 w-full flex justify-end pointer-events-none">
                <div
                    className="relative h-[73px] w-1/2 md:w-[68%] lg:w-[72%] pointer-events-auto"
                >
                    {/* SVG background that draws the slanted red bar with curved left edge */}
                    <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox="0 0 1171 82"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M60.2824 0.595664C60.4442 0.230656 60.8026 0 61.2019 0H1169.54C1170.1 0 1170.54 0.447715 1170.54 1V81C1170.54 81.5523 1170.1 82 1169.54 82H1.01415C0.115465 82 -0.34191 80.9141 0.298992 80.2841C5.92651 74.7525 23.8345 56.9164 35.5439 42.5974C48.3201 26.974 58.5425 4.5188 60.2824 0.595664Z"
                            fill={navBarColor}
                        />
                    </svg>

                    {/* Nav content on top of the shape */}
                    <div className="relative z-10 flex h-full items-center justify-end pr-4 md:pr-12">
                        <nav
                            ref={navRef}
                            className="relative hidden items-center gap-6 font-sans md:flex"
                            aria-label="Main"
                        >
                            {navLinks.map(({ href, label, icon, routeName }, i) => {
                                const isActive =
                                    routeName != null
                                        ? currentRoute === routeName
                                        : href === '#careers' && url.includes('#careers');
                                const isRibbonLink = i === 1 || i === 2 || i === 3;
                                const showRibbon = hoverIndex === i;

                                return (
                                    <div
                                        key={href}
                                        className="relative"
                                        onMouseEnter={() => isRibbonLink && setHoverIndex(i)}
                                        onMouseLeave={() => isRibbonLink && setHoverIndex(-1)}
                                    >
                                        <Link
                                            ref={(el) => (linkRefs.current[i] = el)}
                                            href={href}
                                            className={
                                                'group relative flex items-center gap-2 px-4 py-2 pb-3 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-in-out ' +
                                                (isActive
                                                    ? 'text-white'
                                                    : 'text-white/90 hover:text-white')
                                            }
                                        >
                                            <span className="shrink-0 opacity-90 mr-2">{icon}</span>
                                            {label}
                                        </Link>

                                        {isRibbonLink && (
                                            <div
                                                className={`absolute left-1/2 top-full z-20 -translate-x-1/2 transition-all duration-200 ${
                                                    showRibbon ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-1 pointer-events-none'
                                                }`}
                                            >
                                                <RibbonHoverMenu
                                                    items={ribbonMenuItems}
                                                    onItemClick={handleRibbonItemClick}
                                                    backgroundColor={navBarColor}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            {/* Single sliding underline — smooth transition when switching nav items */}
                            <span
                                className="pointer-events-none absolute bottom-1 h-1 rounded-full bg-white"
                                style={{
                                    left: lineStyle.left,
                                    width: lineStyle.width,
                                    transition: 'left 0.80s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                aria-hidden
                            />
                        </nav>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setMobileNavOpen((open) => !open);
                            }}
                            className="relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-white md:hidden"
                            aria-expanded={mobileNavOpen}
                            aria-controls="mobile-nav-menu"
                            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
                        >
                            <span className="sr-only">{mobileNavOpen ? 'Close menu' : 'Open menu'}</span>
                            {mobileNavOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>

        {/* Mobile menu backdrop + panel (below md) */}
        {mobileNavOpen ? (
            <button
                type="button"
                className="fixed inset-0 z-[99] bg-black/40 md:hidden"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
            />
        ) : null}
        <nav
            id="mobile-nav-menu"
            className={
                'fixed left-0 right-0 z-[101] overflow-y-auto border-t border-white/20 shadow-lg transition-[max-height,opacity] duration-300 ease-out md:hidden ' +
                (mobileNavOpen
                    ? 'max-h-[min(70vh,calc(100vh-7.5rem))] opacity-100'
                    : 'pointer-events-none max-h-0 opacity-0')
            }
            style={{ top: '120px', backgroundColor: navBarColor }}
            aria-hidden={!mobileNavOpen}
            aria-label="Mobile navigation"
        >
            <ul className="flex flex-col py-2">
                {navLinks.map(({ href, label, icon, routeName }) => {
                    const isActive =
                        routeName != null
                            ? currentRoute === routeName
                            : href === '#careers' && url.includes('#careers');
                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                onClick={(e) => e.stopPropagation()}
                                className={
                                    'flex items-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] transition-colors ' +
                                    (isActive ? 'text-white' : 'text-white/90 active:bg-white/10')
                                }
                            >
                                <span className="shrink-0 opacity-90 mr-2">{icon}</span>
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>

        {/* Spacer so page content is not hidden under fixed header (logo bar ~80px + nav bar ~73px) */}
        <div className="h-[120px] shrink-0" aria-hidden="true" />
        </>
    );
}
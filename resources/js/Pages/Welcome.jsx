import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { publicAssetUrl } from '@/utils/publicAssetUrl';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

function SundiaLogoMark() {
    return (
        <svg
            width="40"
            height="18"
            viewBox="0 0 57 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.680664 0H24.4875L30.4733 6.53183H6.66639V9.2752L30.4733 9.53647V16.0683H0.680664V0Z"
                fill="white"
            />
            <path
                d="M6.25781 19.2036H30.6088L24.4871 25.9967H0L6.25781 19.2036Z"
                fill="white"
            />
            <path
                d="M27.2079 0.130371H56.5924V25.7351H26.7998L33.0576 19.2033H50.8787V6.27029H32.7855L27.2079 0.130371Z"
                fill="white"
            />
        </svg>
    );
}

function renderCompanyLogo(logoKey, companyLabel) {
    const key = (logoKey || '').toLowerCase();
    if (key === 'sundia') return <SundiaLogoMark />;
    if (key === 'tpsmi') {
        return (
            <img
                src="/Tpsmilogo.png"
                alt={companyLabel || 'TPSMI'}
                className="h-6 w-auto brightness-0 invert"
            />
        );
    }
    if (key === 'top') {
        return (
            <img
                src="/topoffroadlogo.png"
                alt={companyLabel || 'TOP OFFROAD'}
                className="h-4 w-auto brightness-0 invert"
            />
        );
    }
    return null;
}

function ContactIcon({ icon, type }) {
    const key = (icon || type || '').toLowerCase();

    if (key === 'address' || key === 'map' || key === 'map-pin' || key === 'pin') {
        return (
            <svg width="40" height="40" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 10C33.5 10 24 19.5 24 31C24 48 45 75 45 75C45 75 66 48 66 31C66 19.5 56.5 10 45 10ZM45 40C40 40 36 36 36 31C36 26 40 22 45 22C50 22 54 26 54 31C54 36 50 40 45 40Z" fill="#DC2626" />
            </svg>
        );
    }

    if (key === 'phone' || key === 'call' || key === 'telephone') {
        return (
            <svg width="40" height="40" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M73.1 56.5C67.8 56.5 62.7 55.6 57.9 53.9C56.3 53.3 54.5 53.7 53.3 54.9L46.3 63.5C35.5 58.3 26.7 49.8 21.3 39L29.9 31.7C31.1 30.5 31.5 28.7 30.9 27.1C29.2 22.3 28.3 17.2 28.3 11.9C28.3 9.3 26.2 7.2 23.6 7.2H12.3C9.7 7.2 7.2 8.3 7.2 11.9C7.2 47.9 37.1 77.8 73.1 77.8C76.5 77.8 77.8 75.4 77.8 72.7V61.2C77.8 58.6 75.7 56.5 73.1 56.5Z" fill="#DC2626" />
            </svg>
        );
    }

    if (key === 'email' || key === 'mail' || key === 'envelope') {
        return (
            <svg width="40" height="35" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M75 15H15C11.7 15 9 17.7 9 21V69C9 72.3 11.7 75 15 75H75C78.3 75 81 72.3 81 69V21C81 17.7 78.3 15 75 15ZM75 27L45 48L15 27V21L45 42L75 21V27Z" fill="#DC2626" />
            </svg>
        );
    }

    return (
        <svg width="37" height="37" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M45 7.5C24.3 7.5 7.5 24.3 7.5 45C7.5 65.7 24.3 82.5 45 82.5C65.7 82.5 82.5 65.7 82.5 45C82.5 24.3 65.7 7.5 45 7.5ZM45 75C28.4 75 15 61.6 15 45C15 28.4 28.4 15 45 15C61.6 15 75 28.4 75 45C75 61.6 61.6 75 45 75ZM48.8 41.3L48.8 22.5H41.3V45L58.1 55.1L62.3 48.2L48.8 41.3Z" fill="#DC2626" />
        </svg>
    );
}

function MultilineText({ value }) {
    const text = (value ?? '').toString();
    const lines = text.split(/\r?\n/);
    return (
        <>
            {lines.map((line, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={idx}>
                    {line}
                    {idx < lines.length - 1 ? <br /> : null}
                </span>
            ))}
        </>
    );
}

function LocationPinIcon({ className }) {
    return (
        <svg
            className={className}
            width="14"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
        </svg>
    );
}

const DEFAULT_UPCOMING_EVENTS = [
    {
        id: '1',
        title: 'SUNDIA COMPANY OUTING',
        location: 'Lobo Batangas',
        monthLabel: 'MAR',
        dayLabel: '30',
    },
    {
        id: '2',
        title: 'SUNDIA COMPANY OUTING',
        location: 'Lobo Batangas',
        monthLabel: 'MAR',
        dayLabel: '30',
    },
    {
        id: '3',
        title: 'SUNDIA COMPANY OUTING',
        location: 'Lobo Batangas',
        monthLabel: 'MAR',
        dayLabel: '30',
    },
];

/** Visible height for exactly three event rows (h-20 cards + space-y-4 gaps). */
const UPCOMING_EVENTS_MAX_VISIBLE = 3;
const UPCOMING_EVENTS_LIST_MAX_HEIGHT =
    'max-h-[272px]'; /* 3×5rem + 2×1rem */

function UpcomingEventsListContent({ events }) {
    const list = Array.isArray(events) ? events : [];
    const isScrollable = list.length > UPCOMING_EVENTS_MAX_VISIBLE;

    return (
        <>
            <h2 className="text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
                UPCOMING EVENTS
            </h2>

            {list.length === 0 ? (
                <p className="mt-5 text-sm font-medium text-white/80">
                    No upcoming events scheduled.
                </p>
            ) : (
                <ul
                    className={
                        'mt-5 space-y-4 ' +
                        (isScrollable
                            ? `${UPCOMING_EVENTS_LIST_MAX_HEIGHT} overflow-y-auto overflow-x-hidden pr-1 [scrollbar-color:rgba(255,255,255,0.45)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/40`
                            : '')
                    }
                >
                    {list.map((ev) => (
                        <li key={ev.id}>
                            <div className="flex h-20 items-center justify-between gap-2 overflow-hidden rounded-2xl border-2 border-white bg-white/40 pl-4 pr-3 sm:pl-6">
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-extrabold uppercase leading-tight text-white sm:text-base">
                                        {ev.title}
                                    </p>
                                    <div className="mt-1 flex items-center gap-2 text-xs font-bold text-white">
                                        <LocationPinIcon className="h-4 w-3.5 shrink-0 text-white" />
                                        <span>{ev.location}</span>
                                    </div>
                                </div>
                                <div className="flex shrink-0 gap-0">
                                    <div className="flex h-11 w-11 items-center justify-center bg-white">
                                        <span className="text-center text-sm font-extrabold leading-none text-black sm:text-base">
                                            {ev.monthLabel}
                                        </span>
                                    </div>
                                    <div className="flex h-11 w-11 items-center justify-center bg-red-600">
                                        <span className="text-center text-base font-extrabold leading-none text-white">
                                            {ev.dayLabel}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

function UpcomingEventsPanel({ events }) {
    return (
        <div className="hidden w-full max-w-[511px] shrink-0 animate-upcoming-rise font-['Inter'] motion-reduce:animate-none [animation-play-state:running] lg:block lg:max-w-[min(511px,42vw)]">
            <div className="relative min-h-[min(514px,auto)] rounded-[32px] border-2 border-white bg-white/10 px-6 pb-8 pt-7 backdrop-blur-[2px] animate-upcoming-float [animation-delay:1.5s] [animation-play-state:running] motion-reduce:animate-none hover:[animation-play-state:paused]">
                <UpcomingEventsListContent events={events} />
            </div>
        </div>
    );
}

function UpcomingEventsMobileCollapsible({ events }) {
    const [open, setOpen] = useState(false);
    const list = Array.isArray(events) ? events : [];

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <div className="lg:hidden">
            {open ? (
                <button
                    type="button"
                    className="fixed inset-0 z-[43] bg-black/40"
                    aria-label="Close upcoming events"
                    onClick={() => setOpen(false)}
                />
            ) : null}
            <div className="fixed bottom-6 left-4 z-[44] flex w-[min(calc(100vw-2rem),380px)] max-w-[calc(100vw-2rem)] flex-col items-stretch">
                <div
                    id="upcoming-events-mobile-panel"
                    role="region"
                    aria-label="Upcoming events"
                    aria-hidden={!open}
                    className={
                        'overflow-hidden transition-all duration-300 ease-out ' +
                        (open
                            ? 'mb-3 max-h-[min(65vh,480px)] opacity-100'
                            : 'pointer-events-none max-h-0 opacity-0')
                    }
                >
                    <div className="max-h-[min(65vh,480px)] overflow-y-auto rounded-2xl border-2 border-white bg-white/15 px-5 pb-6 pt-5 shadow-2xl backdrop-blur-[2px] [scrollbar-color:rgba(255,255,255,0.45)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/40">
                        <UpcomingEventsListContent events={events} />
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="flex items-center gap-2 self-start rounded-full bg-red-600 px-4 py-3 text-white shadow-lg ring-2 ring-white/35 transition-transform active:scale-[0.98]"
                    aria-expanded={open}
                    aria-controls="upcoming-events-mobile-panel"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden
                        >
                            <path
                                d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <span className="text-xs font-extrabold uppercase tracking-wide">Events</span>
                    {list.length > 0 ? (
                        <span className="min-w-[1.25rem] rounded-full bg-white px-1.5 py-0.5 text-center text-[11px] font-extrabold leading-none text-red-600">
                            {list.length}
                        </span>
                    ) : null}
                </button>
            </div>
        </div>
    );
}

function mapUpcomingEventsForPanel(raw) {
    if (!Array.isArray(raw)) return null;
    if (raw.length === 0) return [];
    return raw.map((e) => ({
        id: String(e.id),
        title: e.title,
        location: e.location,
        monthLabel: e.month_label ?? e.monthLabel ?? '',
        dayLabel: e.day_label ?? e.dayLabel ?? '',
    }));
}

export default function Welcome({ appName }) {
    const { props } = usePage();
    const backgroundPicture = props.backgroundPicture;
    const [bgIndex, setBgIndex] = useState(0);
    const backgrounds = (backgroundPicture?.images ?? [])
        .map((path) => publicAssetUrl(path))
        .filter(Boolean);
    const resolvedBackgrounds =
        backgrounds.length > 0
            ? backgrounds
            : ['/sundia-group-background.JPG'];

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % resolvedBackgrounds.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [resolvedBackgrounds.length]);

    useEffect(() => {
        if (bgIndex >= resolvedBackgrounds.length) {
            setBgIndex(0);
        }
    }, [bgIndex, resolvedBackgrounds.length]);

    const sundia = props.sundia;
    const homepageVideo = props.homepageVideo;
    const missionVision = props.missionVision;
    const teamMembers = props.teamMembers || [];
    const trustedCompaniesFromDb = props.trustedCompanies || [];
    const contactInfosFromDb = props.contactInfos || [];
    const upcomingMapped = mapUpcomingEventsForPanel(props.upcomingEvents);
    const heroUpcomingEvents =
        upcomingMapped !== null ? upcomingMapped : DEFAULT_UPCOMING_EVENTS;
    const fallbackTeamMembers = [
        {
            name: 'MR. DANTE LAMANDO',
            title: 'CHAIRMAN',
            company: 'SUNDIA',
            logo: 'sundia',
        },
        {
            name: 'MR. JEP BERNAS',
            title: 'PRESIDENT',
            company: 'TPSMI',
            logo: 'tpsmi',
        },
        {
            name: 'MR. GENER DOCTORA',
            title: 'VICE PRESIDENT',
            company: 'TOP OFFROAD',
            logo: 'top',
        },
        {
            name: 'MS. RHOMAY ANTONIO',
            title: 'ASST. PLANT MANAGER',
            company: 'SUNDIA',
            logo: 'sundia',
        },
        {
            name: 'MR. RD ELIZONDO',
            title: 'MARKETING MANAGER',
            company: 'SUNDIA',
            logo: 'sundia',
        },
        {
            name: 'MR. ROMEO AMORES, JR.',
            title: 'SR. ACCOUNTS OFFICER',
            company: 'SUNDIA',
            logo: 'sundia',
        },
    ];

    const resolvedTeamMembers =
        teamMembers && teamMembers.length > 0 ? teamMembers : fallbackTeamMembers;

    const fallbackTrustedCompanies = [
        { name: 'SIAM DIRECT', logo_path: '/siam-direct.svg' },
        { name: 'TPSMI', logo_path: '/tpsmi-logo.svg' },
        { name: 'TOP OFFROAD', logo_path: '/topoffroad-logo.svg' },
    ];

    const resolvedTrustedCompanies =
        Array.isArray(trustedCompaniesFromDb) && trustedCompaniesFromDb.length > 0
            ? trustedCompaniesFromDb
            : fallbackTrustedCompanies;

    const fallbackContactInfos = [
        {
            type: 'Address',
            title: 'ADDRESS',
            icon: 'address',
            value: '123 Business District, Metro\nManila, Philippines',
            display_order: 0,
        },
        {
            type: 'Phone',
            title: 'PHONE',
            icon: 'phone',
            value: '+63 900 000 0000',
            display_order: 1,
        },
        {
            type: 'Email',
            title: 'EMAIL',
            icon: 'email',
            value: 'info@sundia.com',
            display_order: 2,
        },
        {
            type: 'Hours',
            title: 'HOURS',
            icon: 'hours',
            value: 'Mon - Fri\n8:00 AM - 5:00 PM',
            display_order: 3,
        },
    ];

    const resolvedContactInfos =
        Array.isArray(contactInfosFromDb) && contactInfosFromDb.length > 0
            ? contactInfosFromDb
            : fallbackContactInfos;

    const statsTitleLine1 = sundia?.content?.stats_title_line1 ?? 'WHAT';
    const statsTitleLine2 = sundia?.content?.stats_title_line2 ?? 'WE';
    const statsTitleLine3 = sundia?.content?.stats_title_line3 ?? 'DO?';
    const statsItems =
        sundia?.content?.stats_items ?? [
            { value: '25+', label: 'Years Experience' },
            { value: '5', label: 'Affiliated Companies' },
            { value: '500+', label: 'Team Members' },
            { value: '1000+', label: 'Projects Completed' },
        ];
    const legacyVideoConfig = sundia?.content?.video ?? {};
    const activeHomepageVideo =
        homepageVideo && homepageVideo.is_active ? homepageVideo : null;
    const resolvedVideoTitle =
        activeHomepageVideo?.title ??
        legacyVideoConfig.title ??
        'Sundia Group Company Video';
    const resolvedVideoUrl =
        activeHomepageVideo?.video_path ??
        activeHomepageVideo?.video_url ??
        legacyVideoConfig.url ??
        "/2025%20Sundia%20Company%20video.mp4";
    const resolvedVideoThumbnail =
        activeHomepageVideo?.thumbnail_path ??
        legacyVideoConfig.thumbnail ??
        null;
    const resolvedOverlayEnabled =
        (activeHomepageVideo?.overlay_enabled ?? true) &&
        (legacyVideoConfig.overlay_enabled ?? true);
    const resolvedVideoActive =
        activeHomepageVideo ? true : (legacyVideoConfig.active ?? true);

    const isEmbedUrl = (url) => {
        if (!url) return false;
        const u = url.toLowerCase();
        return u.includes('youtube.com') || u.includes('youtu.be') || u.includes('vimeo.com');
    };

    const toEmbedUrl = (url) => {
        if (!url) return url;
        try {
            const parsed = new URL(url, window.location.origin);
            const host = parsed.hostname.toLowerCase();

            // YouTube
            if (host.includes('youtube.com')) {
                const id = parsed.searchParams.get('v');
                if (id) return `https://www.youtube.com/embed/${id}`;
                if (parsed.pathname.startsWith('/embed/')) return url;
            }
            if (host === 'youtu.be') {
                const id = parsed.pathname.replace('/', '').trim();
                if (id) return `https://www.youtube.com/embed/${id}`;
            }

            // Vimeo
            if (host.includes('vimeo.com')) {
                const parts = parsed.pathname.split('/').filter(Boolean);
                const id = parts[0];
                if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
                if (parsed.hostname.includes('player.vimeo.com')) return url;
            }
        } catch {
            // If it's already an embed URL or a relative path, just return it.
        }
        return url;
    };
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const dbSubsidiaries = props.subsidiaries;
    const subsidiaries =
        Array.isArray(dbSubsidiaries) && dbSubsidiaries.length > 0
            ? dbSubsidiaries.map((s) => ({
                id: s.id,
                name: s.name,
                logo: s.logo_path || '',
                description: s.description || '',
                dark: s.display_style === 'dark',
                image: s.background_path || '',
            }))
            : [
            {
                name: 'SD TRADING C.',
                logo: '/sd-remove.png',
                description:
                    'Founded in 1982 and forged an exclusive partnership with Sunstar of Japan, started supplying windshield sealers to local automotive OEMs. Other products introduced include body sealers, D/G, primers, and adhesives',
                dark: true,
                image: '/SD.JPG',
            },
            {
                name: 'SIAM DIRECT',
                logo: '/siam.png',
                description:
                    'Established in 2010 to handle distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group.',
                dark: false,
            },
            {
                name: 'TPMSI',
                logo: '/Tpsmilogo.png',
                description:
                    'Offer a broad range of packaging solutions to meet our customer needs and continuously improve our operations to better respond to those needs.',
                dark: true,
                image: '/Tpsmiprod.JPG',
            },
            {
                name: 'R2R',
                logo: '/Sundialogo.png',
                description:
                    'A primary painting contractor of automotive, motorcycle, and electronic components that includes ED painting, powder coating, and automotive plastic painting.',
                dark: false,
            },
            {
                name: 'TOP OFFROAD',
                logo: '/topoffroadlogo.png',
                description:
                    'TOP Offroad Philippines have become a major player in the distribution and installation of outdoor and off-road vehicle accessories. We continuously expand our product line to help our customers enjoy the outdoor experience.',
                dark: true,
                image: '/ford.jpg',
            },
        ];

    const coreValues = [
        { letter: 'S', title: 'SOLUTION ORIENTED', description: 'Committed To Provide Solutions To All The Stakeholders', image: '/s.jpg' },
        { letter: 'U', title: 'UNITED', description: 'We Believe That Teamwork Will Be The Recipe For Success', image: '/u.jpg' },
        { letter: 'N', title: 'NURTURING', description: 'And Developing All Team Members With Empowerment', image: '/n.jpg' },
        { letter: 'D', title: 'DISCIPLINED', description: 'We Abide To Our Policies To Accomplish Our Goals', image: '/d.jpg' },
        { letter: 'I', title: 'INTEGRITY', description: 'We Will Uphold The Principles Of Our Management Philosophy With Honor Nobility', image: '/i.jpg' },
        { letter: 'A', title: 'ADAPTABLE TO CHANGE', description: 'To Embrace New Ideas And Techniques For Continual Improvement', image: '/a.jpg' }
    ];

    return (
        <>
            <Head title="Welcome to Sundia" />

            <div className="min-h-screen font-sans antialiased">
                <section className="relative flex min-h-[46vh] flex-col overflow-visible sm:min-h-[56vh] lg:min-h-[68vh]">
                    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                        {resolvedBackgrounds.map((bg, index) => (
                            <div
                                key={bg}
                                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                                    index === bgIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${bg}')`,
                                }}
                            />
                        ))}
                    </div>

                    <Header />

                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-28 font-['Inter'] sm:px-6 sm:pb-12 sm:pt-28 md:pb-32 md:pt-32 lg:px-8 lg:pb-40 lg:pt-32">
                        <main className="flex w-full flex-col gap-5 sm:gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                            <div className="max-w-[711px] shrink-0">
                                <h1 className="text-balance text-white text-hero">
                                    Sundia Group Company Profile
                                </h1>
                                <p className="mt-6 font-['Inter'] text-subtitle text-red-600">
                                    Bringing Innovative Solutions to Life
                                </p>
                                <p className="mt-4 font-['Inter'] text-body text-neutral-200">
                                    At Sundia Group Philippines, our core values drive us every day. We are
                                    solutions-oriented, united, disciplined, have integrity, and are adaptable to
                                    change.
                                </p>

                                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <Link
                                        href="#"
                                        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-8 text-base font-medium text-white shadow-md hover:from-red-500 hover:to-red-600"
                                    >
                                        <span>Learn More</span>
                                        <span className="inline-flex h-4 w-6 items-center justify-start pl-2">
                                            <span className="flex h-4 w-4 items-center justify-center overflow-hidden">
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M3.33301 8H12.6663"
                                                        stroke="white"
                                                        strokeWidth="1.33333"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M8 3.33337L12.6667 8.00004L8 12.6667"
                                                        stroke="white"
                                                        strokeWidth="1.33333"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </span>
                                    </Link>
                                    <Link
                                        href="#contact"
                                        className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 text-base font-medium text-black shadow-sm ring-1 ring-slate-700 hover:bg-gray-50"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>

                            <UpcomingEventsPanel events={heroUpcomingEvents} />
                        </main>
                    </div>

                    {/* Same pattern as TPSMI/SIAM: mobile in-flow; md+ 50/50 on hero bottom */}
                    <div className="relative z-20 mt-6 w-full px-4 sm:mt-8 sm:px-6 md:pointer-events-none md:absolute md:bottom-0 md:left-0 md:right-0 md:mt-0 md:translate-y-1/2 lg:px-8">
                        <div className="pointer-events-auto mx-auto max-w-7xl">
                            <div className="flex flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl lg:flex-row lg:min-h-[12rem]">
                                <div
                                    className="flex shrink-0 flex-col justify-center p-6 text-white sm:p-8 lg:w-52 lg:min-h-0 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.09)]"
                                    style={{ backgroundColor: '#dc2626' }}
                                >
                                    <div className="text-caption">
                                        <svg width="33" height="10" viewBox="0 0 33 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.388672 0.673863C0.388672 0.301699 0.690371 0 1.06254 0H13.788C13.9232 0 14.0553 0.040683 14.1671 0.11676L15.6078 1.09715C16.1563 1.47039 15.8921 2.32812 15.2287 2.32812H4.3004C4.02946 2.32812 3.80983 2.54776 3.80983 2.8187C3.80983 3.08833 4.02742 3.30742 4.29705 3.30927L16.7474 3.39448C17.1178 3.39701 17.4167 3.69796 17.4167 4.06833V5.05332C17.4167 5.42548 17.115 5.72718 16.7428 5.72718H1.06254C0.690371 5.72718 0.388672 5.42548 0.388672 5.05332V0.673863Z" fill="white" />
                                            <path d="M3.40554 6.96057C3.51706 6.88507 3.64864 6.84473 3.7833 6.84473H15.3365C15.9972 6.84473 16.2633 7.69675 15.72 8.07271L14.1687 9.14624C14.0553 9.2242 13.9222 9.26597 13.7852 9.26597H2.1975C1.53324 9.26597 1.26967 8.40646 1.81974 8.03409L3.40554 6.96057Z" fill="white" />
                                            <path d="M15.5506 0.0463867H32.3454V9.17263H15.3174L18.894 6.8445H29.0798V2.23482H18.7385L15.5506 0.0463867Z" fill="white" />
                                        </svg>
                                    </div>
                                    <h2 className="mt-4 text-balance font-['Inter'] text-section leading-tight">
                                        {statsTitleLine1}
                                        <br />
                                        {statsTitleLine2}
                                        <br />
                                        {statsTitleLine3}
                                    </h2>
                                </div>

                                <div className="grid flex-1 grid-cols-2 gap-6 p-6 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.06)] sm:gap-8 sm:p-10 lg:grid-cols-4 lg:p-12 items-center">
                                    {statsItems.map((item, index) => (
                                        <div
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={index}
                                            className="flex flex-col items-center justify-center gap-1.5 text-center"
                                        >
                                            <div className="font-['Inter'] text-subtitle" style={{ color: '#dc2626' }}>
                                                {item.value}
                                            </div>
                                            <div className="font-['Inter'] text-caption text-gray-400 text-xs">
                                                {item.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="relative z-0 bg-white pt-10 pb-24 sm:pb-28 md:pt-[clamp(7rem,22vw,11rem)] lg:pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* ISO logo - white background */}


                        {/* Video Section */}
                        {resolvedVideoActive && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-[30px] bg-gray-900 shadow-2xl group">
                                {isEmbedUrl(resolvedVideoUrl) ? (
                                    <iframe
                                        className="h-full w-full rounded-[30px]"
                                        src={toEmbedUrl(resolvedVideoUrl)}
                                        title={resolvedVideoTitle}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        ref={videoRef}
                                        className="h-full w-full object-cover rounded-[30px]"
                                        src={resolvedVideoUrl}
                                        poster={resolvedVideoThumbnail || undefined}
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                        onClick={togglePlay}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {resolvedOverlayEnabled && !isPlaying && !isEmbedUrl(resolvedVideoUrl) && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <button
                                            onClick={togglePlay}
                                            className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                                            aria-label={resolvedVideoTitle}
                                        >
                                            <svg className="ml-1 h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* History Section */}
                        <div className="mt-24 rounded-[3px]">
                            <img src="/SundiaIcon.png" alt="Sundia Logo" className="mx-auto h-16 w-auto" />
                            <p className="mx-auto mt-8 max-w-4xl text-body-lg text-gray-700">
                                Founded in 1982 by Chairman Mr. Futami Funayama, the company partnered exclusively with Sunstar of Japan to supply windshield sealants to local automotive OEMs. By 1983, it expanded supplies to NISSAN and Toyota Motors Philippines and introduced new products through SD Trading. In 1985, a partnership with OROTEX led to collaborations with Honda Cars Philippines and Isuzu Philippines.
                            </p>
                        </div>

                        {/* Core Values Section */}
                        <div className="mt-32">
                            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                                {coreValues.map((value) => (
                                    <div key={value.letter} className="w-full max-w-[303px] h-[400px] relative group overflow-hidden rounded-[3px]">
                                        <div className="absolute top-0 left-0 w-full h-[336px] overflow-hidden rounded-[3px] shadow-lg">
                                            <img
                                                src={value.image}
                                                alt={value.title}
                                                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                                            />
                                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-black/0 to-black/70" />
                                        </div>

                                        <div className="absolute top-0 left-0 w-full p-8 text-center flex flex-col h-[336px] justify-center">
                                            <h3 className="text-white text-subtitle uppercase">
                                                {value.title}
                                            </h3>
                                            <p className="mt-6 text-neutral-100 text-body text-sm px-4 opacity-90 group-hover:opacity-100">
                                                {value.description}
                                            </p>
                                        </div>

                                        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 z-20">
                                            <div className="w-20 h-20 bg-red-600 flex items-center justify-center">
                                                <span className="text-white text-6xl font-extrabold tracking-tighter">
                                                    {value.letter}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MISSION & VISION Section */}
                <div className="relative py-60 w-full overflow-hidden shadow-2xl">
                    <img
                        className="absolute inset-0 h-full w-full object-cover brightness-50"
                        src="/MV.JPG"
                        alt="Mission Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />

                    <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
                        <div className="mb-12">
                            <img src="/SundiaIcon.png" alt="Sundia Logo" className="h-24 w-auto" />
                        </div>

                        <div className="max-w-6xl">
                            <h2 className="text-white text-section tracking-widest uppercase">MISSION</h2>
                            <p className="mt-4 text-white text-body-lg tracking-wide">
                                {missionVision?.mission_text ??
                                    "Commits to provide solutions to every clients' need through continual improvement in every aspect of its business, efficient approach to Research and Development, and maximize use of its network while continuously expanding and building bridges among and beyond the industries it caters."}
                            </p>

                            <h2 className="mt-16 text-white text-section tracking-widest uppercase">VISION</h2>
                            <p className="mt-4 text-white text-body-lg tracking-wide">
                                {missionVision?.vision_text ??
                                    'To be chosen as one of the premiere partners by our clients in each of the subsidiaries products and services for every major industry played upon.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* New White Section for KEY FACTORS, SOLUTION, Subsidiaries, etc. */}
                <div className="bg-white pt-32 pb-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* KEY FACTORS Section */}
                        <div className="pb-16">
                            <h2 className="text-center text-black text-section tracking-widest uppercase mb-16">
                                KEY FACTORS
                            </h2>

                            <div className="flex flex-col gap-12 max-w-6xl mx-auto">
                                {/* INNOVATION CARD */}
                                <div className="flex flex-col lg:flex-row bg-neutral-100 rounded-[3px] shadow-lg overflow-hidden h-auto lg:h-56">
                                    <div className="bg-red-600 w-full lg:w-40 flex items-center justify-center p-8">
                                        <svg width="62" height="41" viewBox="0 0 62 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.75086 40.7048L0 36.9804L25.6485 11.3319L36.2144 21.8977L58.112 0L61.8629 3.72446L36.2144 29.373L25.6485 18.8072L3.75086 40.7048Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 p-8">
                                        <h3 className="text-neutral-700 text-section tracking-widest uppercase">INNOVATION</h3>
                                        <p className="mt-4 text-black text-body-lg">
                                            With a dedicated research and development team at the helm, they continually push the boundaries of technology and design to create cutting-edge products that set industry standards.
                                        </p>
                                    </div>
                                </div>

                                {/* INFRASTRUCTURE CARD */}
                                <div className="flex flex-col lg:flex-row-reverse bg-neutral-100 rounded-[3px] shadow-lg overflow-hidden h-auto lg:h-64">
                                    <div className="bg-red-600 w-full lg:w-40 flex items-center justify-center p-8">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 bg-white rounded-full" />
                                                <div className="w-3 h-3 bg-white rounded-full" />
                                                <div className="w-3 h-3 bg-white rounded-full" />
                                            </div>
                                            <div className="w-12 h-10 bg-white" style={{ clipPath: 'polygon(0 100%, 20% 0, 80% 0, 100% 100%)' }} />
                                        </div>
                                    </div>
                                    <div className="flex-1 p-8 text-right lg:text-left">
                                        <h3 className="text-neutral-700 text-section tracking-widest uppercase">INFRASTRUCTURE</h3>
                                        <p className="mt-4 text-black text-body-lg">
                                            With an extensive network of production facilities, warehousing capabilities, and distribution centers, ensuring efficient and timely delivery to customers. This comprehensive infrastructure not only enhances their capacity to meet growing demands but also underscores their commitment to operational excellence.
                                        </p>
                                    </div>
                                </div>

                                {/* CREATIVITY CARD */}
                                <div className="flex flex-col lg:flex-row bg-neutral-100 rounded-[3px] shadow-lg overflow-hidden h-auto lg:h-44">
                                    <div className="bg-red-600 w-full lg:w-40 flex items-center justify-center p-8">
                                        <svg width="52" height="71" viewBox="0 0 52 71" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M49.063 70.4394H43.2909V43.3202L46.1769 37.4503V26.4148C46.1769 20.9659 44.0483 15.7403 40.2597 11.8874C36.471 8.03451 31.3325 5.86995 25.9745 5.86995C20.6165 5.86995 15.4779 8.03451 11.6892 11.8874C7.90052 15.7403 5.77211 20.9659 5.77211 26.4148H0C0 19.4091 2.73644 12.6905 7.60761 7.73673C12.4788 2.783 19.0856 0 25.9745 0C32.8634 0 39.4701 2.783 44.3412 7.73673C49.2124 12.6905 51.949 19.4091 51.949 26.4148V38.859L49.063 44.729V70.4394Z" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 p-8">
                                        <h3 className="text-neutral-700 text-section tracking-widest uppercase">CREATIVITY</h3>
                                        <p className="mt-4 text-black text-body-lg">
                                            We foster a culture of innovation and encourage employees to think outside the box, resulting in a steady stream of inventive products and solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SOLUTION Section */}
                    <div className="relative w-full min-h-[80vh] overflow-hidden flex flex-col justify-end">
                        <img
                            src="/Uniform.jpg"
                            alt="Solution Background"
                            className="absolute inset-0 h-full w-full object-cover object-[50%_75%] grayscale"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
                            <h2 className="text-white text-section tracking-widest uppercase mb-8">
                                SOLUTION
                            </h2>
                            <p className="text-white/90 text-body-lg max-w-4xl">
                                We provide comprehensive solutions tailored to every client&apos;s needs. From automotive sealants and adhesives to packaging, painting services, and off-road accessories — Sundia Group delivers innovative, high-quality products backed by decades of industry expertise.
                            </p>
                        </div>
                    </div>

                    {/* Subsidiaries Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 h-auto shadow-xl">
                        {subsidiaries.map((sub) => (
                            <div
                                key={sub.id ?? sub.name}
                                className={`relative flex flex-col items-center justify-start p-10 h-[500px] text-center group overflow-hidden ${sub.dark ? 'text-white' : 'bg-white text-black'}`}
                            >
                                {sub.dark && (
                                    <>
                                        <div className="absolute inset-0">
                                            {sub.image ? (
                                                <img
                                                    src={sub.image}
                                                    alt={sub.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-neutral-900" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-bl from-zinc-500/0 to-black/90 opacity-100" />
                                        </div>
                                    </>
                                )}
                                <div className="relative z-10 flex flex-col items-center h-full">
                                    <div className="h-20 flex items-center justify-center mb-10">
                                        <img
                                            src={sub.logo}
                                            alt={sub.name}
                                            className="h-10 w-auto object-contain"
                                        />
                                    </div>
                                    <h3 className={`text-subtitle tracking-wider mb-8 uppercase ${!sub.dark ? 'text-neutral-700' : 'text-white'}`}>
                                        {sub.name}
                                    </h3>
                                    <p className={`text-body text-sm tracking-wide ${sub.dark ? 'text-white/90' : 'text-neutral-600'}`}>
                                        {sub.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MEET THE TEAM Section */}
                    <div className="mt-32 pb-20 flex flex-col items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-black text-section tracking-widest uppercase mb-16 text-left w-full">
                            MEET THE TEAM
                        </h2>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
                            {resolvedTeamMembers.slice(0, 6).map((member, index) => {
                                const logoKey = member.company_logo ?? member.logo;
                                return (
                                    <div key={member.id ?? member.name ?? index} className="w-80 group">
                                        <div className="w-80 h-64 bg-zinc-300 overflow-hidden rounded-t-[3px]">
                                            <img
                                                src={
                                                    member.profile_image_path ||
                                                    `https://placehold.co/320x256`
                                                }
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="w-80 h-40 bg-white shadow-[6px_6px_20px_0px_rgba(0,0,0,0.08)] rounded-b-[3px] relative flex flex-col">
                                            <div className="flex items-start justify-between">
                                                <div className="w-20 h-14 bg-red-600 flex items-center justify-center rounded-br-[3px]">
                                                    {renderCompanyLogo(
                                                        logoKey,
                                                        member.company,
                                                    )}
                                                </div>
                                                <div className="pt-4 pr-5 text-neutral-400 text-[10px] font-semibold tracking-widest uppercase">
                                                    {member.company}
                                                </div>
                                            </div>

                                            <div className="px-5 pb-6 mt-auto">
                                                <h3 className="text-neutral-800 text-lg font-extrabold tracking-wide uppercase leading-none">
                                                    {member.name}
                                                </h3>
                                                <p className="mt-1 text-neutral-400 text-[11px] font-medium tracking-widest uppercase">
                                                    {member.title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-16 w-full flex justify-center">
                            <Link 
                                href="/team"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-10 text-sm font-extrabold tracking-widest text-white shadow-md transition-all hover:scale-105 hover:from-red-500 hover:to-red-600 uppercase"
                            >
                                SEE MORE
                            </Link>
                        </div>
                    </div>

                    {/* SD Trading Corporation Section - full width, no side margin, not scrollable */}
                    <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden">
                        <div className="relative min-h-[min(100svh,520px)] w-full sm:min-h-[560px] lg:min-h-[595px]">
                            <div
                                className="absolute inset-0 z-0 bg-cover bg-center "
                                style={{ backgroundImage: "url('/production.jpg')" }}
                            />
                            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-neutral-400/0 to-stone-950/100 pointer-events-none" />
                            <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-7xl flex-col items-center gap-6 px-4 pb-12 pt-8 sm:gap-8 sm:px-6 sm:pb-16 sm:pt-10 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:pb-16 lg:pt-12">
                                <div className="flex h-56 w-56 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[-3px_12px_14px_0px_rgba(0,0,0,0.08)] sm:h-72 sm:w-72 lg:h-96 lg:w-96">
                                    <img
                                        className="h-24 w-40 object-contain sm:h-28 sm:w-48 lg:h-32 lg:w-56"
                                        src="/sd-remove.png"
                                        alt="SD Trading"
                                    />
                                </div>
                                <div className="w-full flex-1 text-white">
                                    <h2 className="text-section font-['Inter'] tracking-widest mb-6">
                                        SD TRADING CORPORATION
                                    </h2>
                                    <p className="text-body-lg font-['Inter'] tracking-wide text-white/90">
                                        Founded in 1982 and forged an exclusive partnership with Sunstar of Japan, started supplying windshield sealers to local automotive OEMs. Other products introduced include body sealers, D/G, primers, and adhesives. Certified BS EN ISO 14001:2004 Products include Sunstar Penguin Seal, Sunstar Penguin Foam, Sunstar Penguin Cement, and Orotex Sealant
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="bg-white pt-12 pb-0">
                    {/* Trusted Companies Section */}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                        <div className="text-center mb-16 w-full">
                            <h2 className="text-black text-section font-['Inter'] mb-4 uppercase">
                                SUNDIA TRUSTED COMPANIES
                            </h2>
                            <p className="text-neutral-500 text-body text-sm font-['Inter']">
                                Delivering excellence through innovative solutions and dedicated expertise
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-32">
                            {resolvedTrustedCompanies.map((c) => (
                                <img
                                    key={c.id ?? c.name}
                                    className="max-h-24 lg:max-h-32 w-auto object-contain"
                                    src={c.logo_path}
                                    alt={c.name}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-10 w-screen relative left-1/2 -translate-x-1/2">
                        <img
                            src="/2026%20Sundia%20lobby.png"
                            alt="2026 Sundia lobby"
                            loading="lazy"
                            className="w-screen max-w-none h-auto object-cover block"
                        />
                    </div>

                    {/* Get In Touch Section */}
                    <div
                        id="contact"
                        className="mt-0 w-screen relative left-1/2 -translate-x-1/2 bg-red-600 pt-10 pb-12"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-10">
                                <div className="text-white text-4xl font-extrabold font-['Inter'] leading-9">
                                    Get In Touch
                                </div>
                                <div className="mt-2 text-white text-xs font-normal font-['Inter'] leading-5">
                                    We&apos;d love to hear from you
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {resolvedContactInfos.map((i) => (
                                    <div
                                        key={i.id ?? `${i.type}-${i.title}`}
                                        className="bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.18)] overflow-hidden"
                                    >
                                        <div className="h-[170px] flex flex-col items-center justify-center px-6">
                                            <ContactIcon icon={i.icon} type={i.type} />
                                            <div className="mt-4 text-center text-black text-xs font-bold font-['Inter'] uppercase leading-4">
                                                {(i.title || i.type || '').toString().toUpperCase()}
                                            </div>
                                            <div className="mt-2 text-center text-black text-[10px] font-normal font-['Inter'] leading-4">
                                                <MultilineText value={i.value || ''} />
                                            </div>
                                        </div>
                                        <div className="h-14 bg-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Maps Section */}
                <div className="w-full h-[450px] bg-white pt-3">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d683.5324601848853!2d121.08392021601612!3d14.274000867836397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d8036175e4af%3A0x9f5d8162fef05b1b!2sTop%20OffRoad%20PH%20-%20Santa%20Rosa%20Branch!5e0!3m2!1sen!2sph!4v1772089113143!5m2!1sen!2sph"
                        width="100%"
                        height="100%"
                        style={{ border: 0, display: 'block' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <UpcomingEventsMobileCollapsible events={heroUpcomingEvents} />

                <Footer />
            </div>
        </>
    );
}

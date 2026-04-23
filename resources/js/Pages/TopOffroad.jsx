import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { publicAssetUrl } from '@/utils/publicAssetUrl';
import { Head, router } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';

export default function TopOffroad({ topoffroad, topoffroadProducts = [], backgroundPicture }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeCategory, setActiveCategory] = useState('car-accessories');
    const [bgIndex, setBgIndex] = useState(0);
    const backgrounds = (backgroundPicture?.images ?? [])
        .map((path) => publicAssetUrl(path))
        .filter(Boolean);
    const resolvedBackgrounds =
        backgrounds.length > 0
            ? backgrounds
            : ['/Topoffroad.png?v=2', '/bro.jpg', '/lineup.jpg'];

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
    const brandLogos = [
        { src: '/arb.png', alt: 'ARB' },
        { src: '/dometic.png', alt: 'Dometic' },
        { src: '/ecoflow.png', alt: 'EcoFlow' },
        { src: '/federal.png', alt: 'Federal' },
        { src: '/fuel.png', alt: 'Fuel Offroad' },
        { src: '/4x4.png', alt: 'Steelcore' },
        { src: '/oldman.png', alt: 'Old Man Emu' },
        { src: '/hamer.png', alt: 'Hamer' },
        { src: '/mycoolman.png', alt: 'MyCoolman' },
        { src: '/nitto.png', alt: 'Nitto' },
        { src: '/varta.png', alt: 'Varta' },
        { src: '/radar.png', alt: 'Radar' },
        { src: '/raptor.png', alt: 'Raptor' },
        { src: '/rhino.png', alt: 'Rhino' },
        { src: '/thule.png', alt: 'Thule' },
    ];
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

    const topoffroadContent = (() => {
        const raw = topoffroad?.content;
        if (!raw) return {};
        if (typeof raw === 'object') return raw;
        if (typeof raw === 'string') {
            try {
                const parsed = JSON.parse(raw);
                return parsed && typeof parsed === 'object' ? parsed : {};
            } catch {
                return {};
            }
        }
        return {};
    })();

    const statsTitleLine1 = topoffroadContent?.stats_title_line1 ?? 'WHAT';
    const statsTitleLine2 = topoffroadContent?.stats_title_line2 ?? 'WE';
    const statsTitleLine3 = topoffroadContent?.stats_title_line3 ?? 'DO?';
    const statsItems = Array.isArray(topoffroadContent?.stats_items) && topoffroadContent.stats_items.length > 0
        ? topoffroadContent.stats_items.slice(0, 4)
        : [
              { value: '25+', label: 'Years Experience' },
              { value: '5', label: 'Affiliated Companies' },
              { value: '500+', label: 'Team Members' },
              { value: '1000+', label: 'Projects Completed' },
          ];
    const topoffroadVideoUrl =
        topoffroadContent?.video?.url ?? '/2024%20TOP%20Offroad%20presentation.mp4';
    const productsForActiveCategory = (topoffroadProducts || []).filter(
        (p) => (p.category || 'car-accessories') === activeCategory
    );
    const previewTopoffroadProducts = productsForActiveCategory;

    const adventureStatsStrip = [
        { value: '18+', label: 'Years of Adventure' },
        { value: '5000+', label: 'Vehicles Customized' },
        { value: '120+', label: 'Expert Technicians' },
        { value: '3', label: 'Service Centers' },
    ];

    const topOffroadFeaturedBlurb =
        'TOP Offroad Philippines has become a major player in the distribution and installation of outdoor and off-road vehicle accessories. We continuously expand our product line to help our customers enjoy the outdoor experience. Products include bed covers, plastic garnishes, metal garnishes, roof racks, lighting and electronic accessories, portable power supply, car camping gear, window tint, batteries, and our automotive consumables.';

    const outreachBlurb =
        'TOP Offroad Philippines has become a trusted name in the distribution and installation of outdoor and off-road vehicle accessories in the country. Known for quality products and reliable service, the company supports both off-road enthusiasts and everyday drivers who want to enhance their vehicles’ performance and style. From suspension upgrades and lighting systems to roof racks and recovery gear, TOP Offroad Philippines offers a wide range of durable and high-performance accessories.';

    const advantageBlocks = [
        {
            key: 'coordination',
            title: 'STREAMLINED COORDINATION',
            body: "Engaging a single group of companies for various services or solutions ensures seamless coordination and communication. With all components of a project or task under one roof, there's greater efficiency in managing timelines, resources, and objectives, reducing the risk of miscommunication and delays.",
            image: '/coordination.jpg',
            imageAlt: 'Streamlined coordination',
            icon: (
                <>
                    <path d="M10 13a5 5 0 0 1 0-7l.7-.7a5 5 0 0 1 7.1 7.1l-.6.6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 11a5 5 0 0 1 0 7l-.7.7a5 5 0 0 1-7.1-7.1l.6-.6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </>
            ),
            imageFirst: false,
        },
        {
            key: 'quality',
            title: 'CONSISTENT QUALITY',
            body: 'Companies within the same group often share common standards, practices, and quality control measures. This results in a higher likelihood of maintaining consistent quality across all aspects of the project, from design and development to implementation and support, ensuring a cohesive and reliable outcome.',
            image: '/prod.jpg',
            imageAlt: 'Consistent quality',
            icon: (
                <>
                    <path d="M12 3l7 4v6c0 5-3 8-7 8s-7-3-7-8V7l7-4z" stroke="white" strokeWidth="2" />
                    <path d="M8.5 12.5l2.2 2.2L15.8 9.6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </>
            ),
            imageFirst: true,
        },
        {
            key: 'cost',
            title: 'COST EFFICIENCY',
            body: 'Bundling services from a single group of companies can often lead to cost savings. There may be economies of scale in play, reducing overall project expenses.',
            image: '/cost.jpg',
            imageAlt: 'Cost efficiency',
            icon: (
                <>
                    <path d="M12 1v22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M17 5.5c0-2-2.2-3.5-5-3.5S7 3.5 7 5.5 9.2 9 12 9s5 1.5 5 3.5S14.8 16 12 16s-5 1.5-5 3.5S9.2 23 12 23s5-1.5 5-3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </>
            ),
            imageFirst: false,
        },
    ];

    return (
        <>
            <Head title="TOP OFFROAD" />

            <div id="about" className="min-h-screen font-['Inter'] antialiased bg-white">
                <section className="relative flex min-h-[46vh] flex-col overflow-visible bg-cover bg-center sm:min-h-[56vh] lg:min-h-[68vh]">
                    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                        {resolvedBackgrounds.map((bg, index) => (
                            <div
                                key={bg}
                                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                                    index === bgIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{ backgroundImage: `url('${bg}')` }}
                            />
                        ))}
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black to-black/30" />

                    <Header />

                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-32 sm:px-6 sm:pb-12 md:pb-32 md:pt-32 lg:px-8 lg:pb-40 lg:pt-36">
                        <div className="w-full max-w-[min(100%,42rem)]">
                            <img
                                className="h-auto max-h-16 w-auto max-w-full object-contain object-left sm:max-h-20"
                                src="/TOPLOGO.png"
                                alt="TOP OFFROAD"
                            />
                            <p className="mt-6 font-['Inter'] text-subtitle text-orange-500">
                                Premium Off-Road Accessories
                            </p>
                            <p className="mt-4 font-['Inter'] text-body text-neutral-200">
                                Your one-stop shop for quality off-road accessories and parts. From suspension
                                upgrades to recovery gear, we have everything you need to conquer any terrain.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                                <button
                                    type="button"
                                    onClick={() => router.visit(route('home') + '#contact')}
                                    className="inline-flex min-h-12 w-full max-w-xs items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-black shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10),0px_1px_3px_0px_rgba(0,0,0,0.10)] transition-colors hover:bg-gray-50 sm:w-auto sm:max-w-none sm:px-8 sm:text-base"
                                >
                                    REQUEST FOR QUOTATION
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* TPSMI-style: mobile in-flow; md+ 50/50 on hero bottom — brand orange */}
                    <div className="relative z-20 mt-6 w-full px-4 sm:mt-8 sm:px-6 md:pointer-events-none md:absolute md:bottom-0 md:left-0 md:right-0 md:mt-0 md:translate-y-1/2 lg:px-8">
                        <div className="pointer-events-auto mx-auto max-w-7xl">
                            <div className="flex flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl lg:flex-row lg:min-h-[12rem]">
                                <div
                                    className="flex shrink-0 flex-col justify-center p-6 text-white sm:p-8 lg:w-52 lg:min-h-0 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.09)]"
                                    style={{ backgroundColor: '#FF6E00' }}
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
                                            key={`topoffroad-stat-${index}`}
                                            className="flex flex-col items-center justify-center gap-1.5 text-center"
                                        >
                                            <div className="font-['Inter'] text-subtitle" style={{ color: '#FF6E00' }}>
                                                {item?.value ?? ''}
                                            </div>
                                            <div className="font-['Inter'] text-caption text-gray-400 text-xs">
                                                {item?.label ?? ''}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="relative z-0 bg-white pt-10 pb-0 md:pt-[clamp(7rem,22vw,11rem)]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Video Section */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-[30px] bg-gray-900 shadow-2xl group">
                            <video
                                ref={videoRef}
                                className="h-full w-full object-cover rounded-[30px]"
                                src={topoffroadVideoUrl}
                                onPlay={() => setIsPlaying(true)}
                                onPause={() => setIsPlaying(false)}
                                onClick={togglePlay}
                            >
                                Your browser does not support the video tag.
                            </video>

                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <button
                                        onClick={togglePlay}
                                        className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                                    style={{ backgroundColor: '#FF6E00' }}
                                    >
                                        <svg className="ml-1 h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* About Section - logo and details like Welcome.jsx */}
                        <div className="mt-16 rounded-[3px]">
                            <img src="/topoffroadlogo.png" alt="TOP Offroad Logo" className="mx-auto h-24 w-auto" />
                            <p className="mx-auto mt-6 max-w-4xl text-body-lg text-gray-700">
                                {topOffroadFeaturedBlurb}
                            </p>
                        </div>
                    </div>

                        {/* Featured: mobile = logo + orange card stack; md+ = logo overlaps orange, text has real width */}
                        <div id="topoffroad-about" className="relative left-1/2 mt-16 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden scroll-mt-36">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col items-center gap-6 md:hidden">
                                    <div className="flex h-44 w-44 shrink-0 items-center justify-center rounded-full bg-white p-4 shadow-xl ring-1 ring-black/5">
                                        <img
                                            className="h-full w-full object-contain"
                                            src="/topoffroadlogo.png"
                                            alt="TOP Offroad"
                                        />
                                    </div>
                                    <div
                                        className="w-full max-w-2xl rounded-[40px] px-6 py-8 shadow-lg sm:px-8 sm:py-9"
                                        style={{ backgroundColor: '#FF6E00' }}
                                    >
                                        <p className="text-pretty font-['Inter'] text-sm font-semibold leading-relaxed tracking-wide text-white sm:text-base">
                                            {topOffroadFeaturedBlurb}
                                        </p>
                                    </div>
                                </div>

                                {/* Desktop View - Siam Style with larger box radius and no border */}
                                <div className="relative hidden w-full pr-0 md:block py-6">
                                    <div className="relative h-[380px] pl-24 lg:pl-28 pr-0 z-10" style={{ marginLeft: '96px' }}>
                                        <div
                                            className="absolute left-24 sm:left-28 right-[-50vw] top-0 h-full rounded-tl-[100px] rounded-bl-[100px] shadow-lg"
                                            style={{ backgroundColor: '#FF6E00' }}
                                        />
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-full shadow-xl flex items-center justify-center p-8 z-20">
                                            <img
                                                className="w-full h-full object-contain"
                                                src="/topoffroadlogo.png"
                                                alt="TOP Offroad"
                                            />
                                        </div>
                                        <div className="absolute left-80 sm:left-96 right-8 sm:right-12 top-1/2 -translate-y-1/2 flex items-center z-20">
                                            <p className="text-white text-body-lg font-semibold tracking-wide font-['Inter']">
                                                {topOffroadFeaturedBlurb}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative left-1/2 z-0 mt-16 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden border-y border-black">
                            <div className="bg-neutral-700 px-4 py-8 sm:px-6 sm:py-10 md:py-12">
                                <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-8 md:grid-cols-4 md:gap-x-4">
                                    {adventureStatsStrip.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="flex min-w-0 flex-col items-center justify-center gap-2 px-1 text-center sm:px-2"
                                        >
                                            <div className="font-['Inter'] text-2xl font-bold tabular-nums leading-none text-white sm:text-3xl md:text-4xl">
                                                {stat.value}
                                            </div>
                                            <div className="max-w-[11rem] text-balance font-['Inter'] text-[10px] font-medium uppercase leading-snug tracking-wide text-white/95 sm:max-w-none sm:text-xs">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Outreach — fluid layout (replaces fixed px / absolute) */}
                        <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden bg-stone-900">
                            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-12 pb-24 sm:px-6 sm:pt-16 sm:pb-32 lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:pb-36">
                                <div className="min-w-0 flex-1">
                                    <h2 className="font-['Inter'] text-xl font-bold tracking-tight text-white sm:text-2xl md:text-section">
                                        OUTREACH MISSION &amp; EVENTS
                                    </h2>
                                    <p className="mt-5 text-pretty font-['Inter'] text-sm leading-relaxed text-white/90 sm:text-base lg:text-body-lg">
                                        {outreachBlurb}
                                    </p>
                                </div>
                                <div className="w-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 lg:max-w-[min(100%,520px)]">
                                    <img
                                        className="h-auto w-full object-cover grayscale"
                                        src="/outreach.jpg"
                                        alt="Outreach mission and events"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Competitive Advantage — responsive stacks (replaces 1341px canvas) */}
                        <div className="relative left-1/2 z-10 -mt-12 w-screen max-w-[100vw] -translate-x-1/2 px-4 sm:-mt-16 sm:px-6 lg:-mt-20 lg:px-8">
                            <div className="mx-auto max-w-6xl overflow-hidden rounded-t-[32px] border-4 border-orange-400 bg-orange-500 sm:rounded-t-[48px] md:border-8 md:rounded-t-[64px]">
                                <div className="px-4 pb-6 pt-8 sm:px-6 sm:pb-8 sm:pt-10 md:px-10">
                                    <h2 className="text-center font-['Inter'] text-lg font-bold uppercase tracking-tight text-white sm:text-xl md:text-section">
                                        COMPETITIVE ADVANTAGE
                                    </h2>
                                </div>

                                <div className="flex flex-col bg-zinc-100 rounded-t-2xl sm:rounded-b-[48px] sm:rounded-t-[48px] md:rounded-b-[56px] w-full overflow-hidden">
                                    {advantageBlocks.map((block) => (
                                        <article
                                            key={block.key}
                                            className={`flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10 px-4 py-10 sm:px-6 sm:py-14 md:px-10 lg:px-12 ${
                                                block.imageFirst ? 'bg-[#1a1a1a] rounded-[32px] sm:rounded-[48px] relative z-10 shadow-xl' : 'bg-transparent'
                                            }`}
                                        >
                                            <div
                                                className={
                                                    'flex min-w-0 flex-1 flex-col gap-5 sm:gap-6 lg:pr-8 ' +
                                                    (block.imageFirst ? 'order-2 lg:order-2 lg:pl-10 lg:pr-0' : 'order-1 lg:order-1')
                                                }
                                            >
                                                <div>
                                                    <div className="inline-flex max-w-full flex-wrap items-center gap-2 rounded-full bg-orange-600 px-2 py-2 sm:gap-3 sm:px-2 sm:py-2">
                                                        {block.imageFirst ? (
                                                            <>
                                                                <span className="break-words pl-4 sm:pl-5 text-left font-['Inter'] text-xs font-bold uppercase leading-snug tracking-wider text-white sm:text-sm md:text-base mr-1">
                                                                    {block.title}
                                                                </span>
                                                                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 border-[2px] border-white rounded-full bg-transparent">
                                                                    <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                                        {block.icon}
                                                                    </svg>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 shrink-0 border-[2px] border-white rounded-full bg-transparent">
                                                                    <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                                                        {block.icon}
                                                                    </svg>
                                                                </div>
                                                                <span className="break-words pr-4 sm:pr-5 text-left font-['Inter'] text-xs font-bold uppercase leading-snug tracking-wider text-white sm:text-sm md:text-base ml-1">
                                                                    {block.title}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-pretty font-['Inter'] text-[13px] font-semibold tracking-wide leading-relaxed text-orange-600 sm:text-[15px] lg:text-base lg:leading-8">
                                                    {block.body}
                                                </p>
                                            </div>
                                            <div
                                                className={
                                                    'w-full shrink-0 overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 lg:max-w-[min(100%,500px)] lg:flex-1 ' +
                                                    (block.imageFirst ? 'order-1 lg:order-1' : 'order-2 lg:order-2')
                                                }
                                            >
                                                <img
                                                    src={block.image}
                                                    alt={block.imageAlt}
                                                    className="aspect-[4/3] h-auto w-full object-cover sm:aspect-[588/400]"
                                                />
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Our Products — wrap / grid on narrow screens */}
                        <div id="products" className="relative left-1/2 mt-12 w-screen max-w-[100vw] -translate-x-1/2 sm:mt-16">
                            <div className="bg-neutral-900 py-10 sm:py-12">
                                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                                    <div className="text-center font-['Inter'] text-section font-medium text-white">
                                        OUR PRODUCTS
                                    </div>
                                    <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
                                        <button
                                            type="button"
                                            aria-pressed={activeCategory === 'car-accessories'}
                                            onClick={() => setActiveCategory('car-accessories')}
                                            className={`min-h-12 w-full rounded-2xl border-[3px] border-orange-500 px-3 py-3 text-center text-xs font-medium transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:w-auto sm:min-w-[10.5rem] sm:px-6 sm:text-base ${
                                                activeCategory === 'car-accessories'
                                                    ? 'bg-orange-400 text-white hover:bg-orange-300'
                                                    : 'bg-transparent text-white hover:bg-orange-500/15'
                                            }`}
                                        >
                                            Car Accessories
                                        </button>
                                        <button
                                            type="button"
                                            aria-pressed={activeCategory === 'mags-tires'}
                                            onClick={() => setActiveCategory('mags-tires')}
                                            className={`min-h-12 w-full rounded-2xl border-[3px] border-orange-500 px-3 py-3 text-center text-xs font-medium transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:w-auto sm:min-w-[10.5rem] sm:px-6 sm:text-base ${
                                                activeCategory === 'mags-tires'
                                                    ? 'bg-orange-400 text-white hover:bg-orange-300'
                                                    : 'bg-transparent text-white hover:bg-orange-500/15'
                                            }`}
                                        >
                                            Mags &amp; Tires
                                        </button>
                                        <button
                                            type="button"
                                            aria-pressed={activeCategory === 'lights'}
                                            onClick={() => setActiveCategory('lights')}
                                            className={`min-h-12 w-full rounded-2xl border-[3px] border-orange-500 px-3 py-3 text-center text-xs font-medium transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:w-auto sm:min-w-[10.5rem] sm:px-6 sm:text-base ${
                                                activeCategory === 'lights'
                                                    ? 'bg-orange-400 text-white hover:bg-orange-300'
                                                    : 'bg-transparent text-white hover:bg-orange-500/15'
                                            }`}
                                        >
                                            Lights
                                        </button>
                                        <button
                                            type="button"
                                            aria-pressed={activeCategory === 'tints'}
                                            onClick={() => setActiveCategory('tints')}
                                            className={`min-h-12 w-full rounded-2xl border-[3px] border-orange-500 px-3 py-3 text-center text-xs font-medium transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:w-auto sm:min-w-[10.5rem] sm:px-6 sm:text-base ${
                                                activeCategory === 'tints'
                                                    ? 'bg-orange-400 text-white hover:bg-orange-300'
                                                    : 'bg-transparent text-white hover:bg-orange-500/15'
                                            }`}
                                        >
                                            Tints
                                        </button>
                                        <button
                                            type="button"
                                            aria-pressed={activeCategory === 'camping-gears'}
                                            onClick={() => setActiveCategory('camping-gears')}
                                            className={`col-span-2 min-h-12 w-full max-w-xs justify-self-center rounded-2xl border-[3px] border-orange-500 px-3 py-3 text-center text-xs font-medium transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:col-span-1 sm:w-auto sm:min-w-[10.5rem] sm:max-w-none sm:px-6 sm:text-base ${
                                                activeCategory === 'camping-gears'
                                                    ? 'bg-orange-400 text-white hover:bg-orange-300'
                                                    : 'bg-transparent text-white hover:bg-orange-500/15'
                                            }`}
                                        >
                                            Camping Gears
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product cards - 3x3 grid like reference */}
                        <div className="w-screen mt-16 pb-16" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
                            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {previewTopoffroadProducts.length === 0 && (
                                        <div className="col-span-full py-16 text-center text-sm text-neutral-500">
                                            No products in this category yet.
                                        </div>
                                    )}
                                    {previewTopoffroadProducts.map((product, idx) => {
                                        const bullets = (product?.description || '')
                                            .split(',')
                                            .map((text) => text.trim())
                                            .filter(Boolean)
                                            .slice(0, 3);

                                        const cardImageUrl = product.image_path
                                            ? publicAssetUrl(product.image_path)
                                            : '/case.png';

                                        return (
                                            <div
                                                key={product.id ?? `topoffroad-product-${idx}`}
                                                className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]"
                                            >
                                                <div
                                                    className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                                    style={{
                                                        backgroundImage: `url('${cardImageUrl}')`,
                                                    }}
                                                />
                                                <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                                    <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                        {product.title}
                                                    </div>
                                                    <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                        {bullets.map((feature, featureIdx) => (
                                                            <div
                                                                key={`${product.id ?? idx}-feature-${featureIdx}`}
                                                                className="flex items-center gap-1"
                                                            >
                                                                <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                                <span className="text-[10px] text-white/80">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Brands We Carry */}
                        <div className="w-screen bg-black pt-16 pb-0 mt-20" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
                            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                                <div className="text-center">
                                    <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-400 bg-black px-4 py-1 text-[11px] font-semibold tracking-[0.22em] uppercase text-orange-400 shadow-sm">
                                        Trusted Partners
                                    </div>
                                    <h2 className="mt-4 text-center text-white text-section font-semibold tracking-tight">
                                        Brands We Carry
                                    </h2>
                                    <div className="mt-3 flex items-center justify-center">
                                        <span className="h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.8)]" />
                                    </div>
                                    <p className="mt-4 text-center text-body text-gray-300">
                                        Trusted global brands that power our off-road builds.
                                    </p>
                                </div>
                            </div>

                            {/* Full-bleed moving lineup */}
                            <div className="mt-9 w-screen" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
                                <div className="brandsMarquee bg-white border-y border-gray-200 shadow-sm" aria-label="Brand logos moving marquee">
                                    <div className="brandsTrack">
                                        {[...brandLogos, ...brandLogos].map((b, idx) => (
                                            <div className="brandsItem" key={`brand-${b.alt}-${idx}`}>
                                                <img
                                                    src={b.src}
                                                    alt={b.alt}
                                                    loading="lazy"
                                                    className="h-16 sm:h-20 w-auto object-contain opacity-95 transition duration-200 hover:opacity-100"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Lineup Image with black gradient overlay */}
                            <div className="relative w-screen mt-0 mb-0" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
                                <img
                                    src="/Built for Mission.png"
                                    alt="Built for Mission"
                                    loading="lazy"
                                    className="w-screen max-w-none h-auto object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center translate-y-4 sm:translate-y-20">
                                    <button
                                        type="button"
                                        onClick={() => window.location.assign('https://www.facebook.com/TopOffroadPhilippines')}
                                        className="group w-64 h-12 relative rounded-3xl cursor-pointer select-none transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                                    >
                                        <div className="w-64 h-12 left-0 top-0 absolute bg-red-600 rounded-3xl border-[0.87px] border-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-colors duration-200 group-hover:bg-red-500" />
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-base font-bold font-['Inter'] tracking-[0.1em] uppercase">
                                            GET IN TOUCH NOW
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>

                <Footer />
            </div>

            <style>{`
                .brandsMarquee {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    --brandsEdgeFade: 72px;
                    padding: 16px 0;
                    -webkit-mask-image: linear-gradient(
                        90deg,
                        transparent,
                        #000 var(--brandsEdgeFade),
                        #000 calc(100% - var(--brandsEdgeFade)),
                        transparent
                    );
                    mask-image: linear-gradient(
                        90deg,
                        transparent,
                        #000 var(--brandsEdgeFade),
                        #000 calc(100% - var(--brandsEdgeFade)),
                        transparent
                    );
                }
                .brandsTrack {
                    display: flex;
                    align-items: center;
                    gap: 56px;
                    width: max-content;
                    padding: 6px var(--brandsEdgeFade);
                    animation: brandsScroll 34s linear infinite;
                    will-change: transform;
                }
                .brandsMarquee:hover .brandsTrack {
                    animation-play-state: paused;
                }
                .brandsItem {
                    flex: 0 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                @keyframes brandsScroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .brandsTrack {
                        animation: none !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </>
    );
}

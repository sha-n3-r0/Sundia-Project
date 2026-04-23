import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { publicAssetUrl } from '@/utils/publicAssetUrl';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function Tpsmi() {
    const { props } = usePage();
    const backgroundPicture = props.backgroundPicture;
    const [bgIndex, setBgIndex] = useState(0);
    const backgrounds = (backgroundPicture?.images ?? [])
        .map((path) => publicAssetUrl(path))
        .filter(Boolean);
    const resolvedBackgrounds =
        backgrounds.length > 0
            ? backgrounds
            : ['/tpsmi.jpg'];

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

    const tpsmi = props.tpsmi;
    const tpsmiPageVideo = props.tpsmiPageVideo;
    const tpsmiProducts = props.tpsmiProducts ?? [];
    const vacuumformedplastics = props.vacuumformedplastics ?? [];

    const statsTitleLine1 = tpsmi?.content?.stats_title_line1 ?? 'WHAT';
    const statsTitleLine2 = tpsmi?.content?.stats_title_line2 ?? 'WE';
    const statsTitleLine3 = tpsmi?.content?.stats_title_line3 ?? 'DO?';
    const statsItems =
        tpsmi?.content?.stats_items ?? [
            { value: '25+', label: 'Years Experience' },
            { value: '3', label: 'Affiliated Companies' },
            { value: '500+', label: 'Team Members' },
            { value: '1000+', label: 'Projects Completed' },
        ];

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVfpIndex, setCurrentVfpIndex] = useState(0);
    const dbVfpImages = vacuumformedplastics
        .filter((item) => item?.is_active !== false)
        .map((item, index) => ({
            src: item?.image_path ? publicAssetUrl(item.image_path) : '',
            alt: item?.title || `Vacuum formed plastic ${index + 1}`,
        }))
        .filter((item) => Boolean(item.src));
    const vfpImages = dbVfpImages.length
        ? dbVfpImages
        : [
              { src: '/Aircon Evaporator Cover.png', alt: 'Aircon Evaporator Cover' },
              { src: '/Tpsmiprod.JPG', alt: 'TPSMI Product 1' },
              { src: '/MetalFabrication.png', alt: 'TPSMI Product 2' },
          ];

    const nextVfpImage = () => {
        setCurrentVfpIndex((prev) => (prev + 1) % vfpImages.length);
    };

    const prevVfpImage = () => {
        setCurrentVfpIndex((prev) => (prev - 1 + vfpImages.length) % vfpImages.length);
    };

    useEffect(() => {
        if (currentVfpIndex >= vfpImages.length) {
            setCurrentVfpIndex(0);
        }
    }, [currentVfpIndex, vfpImages.length]);

    // Prefer legacy owner-dashboard format: `tpsmi.content.video` (title/url/thumbnail/active).
    const activeTpsmiContentVideo =
        tpsmi?.content?.video && (tpsmi?.content?.video?.active ?? true)
            ? tpsmi.content.video
            : null;

    const activeTpsmiPageVideo =
        tpsmiPageVideo && tpsmiPageVideo.is_active ? tpsmiPageVideo : null;

    const resolvedVideoTitle =
        activeTpsmiContentVideo?.title ??
        activeTpsmiPageVideo?.title ??
        'TPSMI Page Video';

    const resolvedVideoUrl =
        activeTpsmiContentVideo?.url ??
        activeTpsmiPageVideo?.video_path ??
        activeTpsmiPageVideo?.video_url ??
        '/2025%20Sundia%20Company%20video.mp4';

    const resolvedVideoThumbnail =
        activeTpsmiContentVideo?.thumbnail ??
        activeTpsmiPageVideo?.thumbnail_path ??
        null;

    // Legacy format has no overlay_enabled toggle, so default to showing overlay play button.
    const resolvedOverlayEnabled =
        activeTpsmiContentVideo ? true : activeTpsmiPageVideo?.overlay_enabled ?? true;

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
                if (id && /^\\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
                if (parsed.hostname.includes('player.vimeo.com')) return url;
            }
        } catch {
            // If it's already an embed URL or a relative path, just return it.
        }
        return url;
    };

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

    const parseFeaturesFromDescription = (description) => {
        if (!description) return [];
        if (Array.isArray(description)) return description;
        if (typeof description !== 'string') return [];
        return description
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
    };

    const resolvedTpsmiProducts = tpsmiProducts.map((p) => ({
        id: p.id,
        title: p.title ?? '',
        img: p.image_path ?? '',
        features: parseFeaturesFromDescription(p.description),
    }));
    const productsPerPage = 6;
    const totalProductPages = Math.max(1, Math.ceil(resolvedTpsmiProducts.length / productsPerPage));
    const [currentProductPage, setCurrentProductPage] = useState(0);
    const visibleTpsmiProducts = resolvedTpsmiProducts.slice(
        currentProductPage * productsPerPage,
        (currentProductPage + 1) * productsPerPage,
    );

    const goToPreviousProductPage = () => {
        setCurrentProductPage((prev) => (prev === 0 ? totalProductPages - 1 : prev - 1));
    };

    const goToNextProductPage = () => {
        setCurrentProductPage((prev) => (prev === totalProductPages - 1 ? 0 : prev + 1));
    };
    return (
        <>
            <Head title="TPSMI" />
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
                    <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black to-black/30" />

                    <Header />

                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-32 sm:px-6 sm:pb-12 md:pb-32 md:pt-32 lg:px-8 lg:pb-40 lg:pt-36">
                        <div className="w-full max-w-[min(100%,42rem)]">
                            <h1 className="text-balance font-['Inter'] text-white text-hero">
                                <span className="block">TOTAL PACKAGING SOLUTIONS</span>
                                <span className="block">MANUFACTURING INC.</span>
                            </h1>
                            <p className="mt-6 font-['Inter'] text-subtitle text-red-600">
                                Bringing Innovative Solutions to Life
                            </p>
                            <p className="mt-4 font-['Inter'] text-body text-neutral-200">
                                At Sundia Group Philippines, our core values drive us every day. We are
                                solutions-oriented, united, disciplined, have integrity, and are adaptable to
                                change.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                            <button
                                type="button"
                                onClick={() => router.visit(route('home') + '#contact')}
                                className="inline-flex min-h-12 w-full max-w-md items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-5 py-3 text-center text-xs sm:text-base font-medium leading-snug text-white shadow-md transition-colors hover:from-red-500 hover:to-red-600 sm:w-auto sm:max-w-none sm:px-8 sm:leading-7"
                            >
                                <span>REQUEST FOR QUOTATION</span>
                                <span className="inline-flex h-4 w-6 items-center justify-start pl-2">
                                    <span className="flex h-4 w-4 items-center justify-center overflow-hidden">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile: in-flow below CTAs. md+: pinned to hero bottom, 50/50 on image & white. */}
                    <div className="relative z-20 mt-6 w-full px-4 sm:px-6 sm:mt-8 md:pointer-events-none md:absolute md:bottom-0 md:left-0 md:right-0 md:mt-0 md:translate-y-1/2 lg:px-8">
                        <div className="pointer-events-auto mx-auto max-w-7xl">
                            <div className="flex flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl lg:flex-row lg:min-h-[12rem]">
                                <div
                                    className="flex shrink-0 flex-col justify-center p-6 text-white sm:p-8 lg:w-52 lg:min-h-0 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.09)]"
                                    style={{ backgroundColor: '#dc2626' }}
                                >
                                    <div className="text-caption">
                                        <svg width="33" height="10" viewBox="0 0 33 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.388672 0.673863C0.388672 0.301699 0.690371 0 1.06254 0H13.788C13.9232 0 14.0553 0.040683 14.1671 0.11676L15.6078 1.09715C16.1563 1.47039 15.8921 2.32812 15.2287 2.32812H4.3004C4.02946 2.32812 3.80983 2.54776 3.80983 2.8187C3.80983 3.08833 4.02742 3.30742 4.29705 3.30927L16.7474 3.39448C17.1178 3.39701 17.4167 3.69796 17.4167 4.06833V5.05332C17.4167 5.42548 17.115 5.72718 16.7428 5.72718H1.06254C0.690371 5.72718 0.388672 5.42548 0.388672 5.05332V0.673863Z" fill="white" />
                                            <path d="M3.40554 6.96057C3.51706 6.88507 3.64864 6.84473 3.7833 6.84473H15.3365C15.9972 6.84473 16.2633 7.69675 15.72 8.07271L14.1687 9.14624C14.056 9.2242 13.9222 9.26597 13.7852 9.26597H2.1975C1.53324 9.26597 1.26967 8.40646 1.81974 8.03409L3.40554 6.96057Z" fill="white" />
                                            <path d="M15.5506 0.0463867H32.3454V9.17263H15.3174L18.894 6.8445H29.0798V2.23482H18.7385L15.5506 0.0463867Z" fill="white" />
                                        </svg>
                                    </div>
                                    <h2 className="mt-4 text-balance text-section leading-tight">
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
                                            <div className="text-subtitle" style={{ color: '#dc2626' }}>
                                                {item.value}
                                            </div>
                                            <div className="text-caption text-gray-400 text-xs">
                                                {item.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reserve space for lower half of stats card (50/50 overlap) */}
                <div className="relative z-0 bg-white pt-10 pb-32 md:pt-[clamp(7rem,22vw,11rem)]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                                <>
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

                                    {resolvedOverlayEnabled && !isPlaying && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <button
                                                onClick={togglePlay}
                                                className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                                                style={{ backgroundColor: '#E00000' }}
                                            >
                                                <svg className="ml-1 h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* About Section - logo and details like Welcome.jsx */}
                        <div className="mt-16 rounded-[3px]">
                            <img src="/Tpsmilogo.png" alt="TPSMI LOGO" className="mx-auto h-32 w-auto" />
                            <p className="mx-auto mt-6 max-w-4xl text-body-lg text-gray-700">
                                Total Packaging Solutions and Manufacturing, Inc. (TPSMI) offer a broad range of packaging solutions to meet our customer needs and continuously improve our operations to better respond to those needs. We provide high-quality packaging materials and services tailored to the requirements of the automotive and electronics industries.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Featured section - with background image and red bar */}
                <div
                    id="tpsmi-about"
                    className="relative w-screen overflow-hidden bg-white py-14 sm:py-16 lg:py-20 scroll-mt-36"
                    style={{ marginLeft: 'calc(-50vw + 50%)' }}
                >
                    <div className="absolute left-0 top-0 w-full h-full z-0 overflow-hidden">
                        <img
                            src="/production.jpg"
                            alt="Background"
                            className="w-full h-full object-cover grayscale opacity-20"
                        />
                        <div className="absolute inset-0 bg-white/60" />
                    </div>

                    {/* Mobile/tablet layout (kept responsive) */}
                    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:hidden">
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-52 h-52 sm:w-64 sm:h-64 bg-white rounded-full shadow-xl flex items-center justify-center p-7 sm:p-8">
                                <img className="w-full h-full object-contain" src="/Tpsmilogo.png" alt="TPSMI Logo" />
                            </div>
                            <div
                                className="w-full overflow-hidden rounded-[28px] shadow-lg"
                                style={{ backgroundColor: '#E31E25' }}
                            >
                                <div className="px-6 py-8 sm:px-10 sm:py-10">
                                    <p className="text-white text-sm sm:text-base font-semibold tracking-wide leading-relaxed">
                                        Total Packaging Solutions and Manufacturing, Inc. (TPSMI) offer a broad range of
                                        packaging solutions to meet our customer needs and continuously improve our
                                        operations to better respond to those needs. We provide high-quality packaging
                                        materials and services tailored to the requirements of the automotive and
                                        electronics industries.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop layout (restored to original design) */}
                    <div className="relative z-10 hidden lg:block">
                        <div
                            className="relative h-[380px] pl-25 sm:pl-20 lg:pl-24 pr-0"
                            style={{ marginLeft: '96px' }}
                        >
                            {/* Red bar - extends flush to right edge, rounded only on left */}
                            <div
                                className="absolute left-24 sm:left-28 right-0 top-0 h-full rounded-tl-[100px] rounded-bl-[100px] shadow-lg"
                                style={{ backgroundColor: '#E31E25' }}
                            />

                            {/* White circle with logo - overlaps left edge of red bar */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-full shadow-xl flex items-center justify-center p-8 z-20">
                                <img className="w-full h-full object-contain" src="/Tpsmilogo.png" alt="TPSMI Logo" />
                            </div>

                            {/* Text content - white, left-aligned, inside red bar */}
                            <div className="absolute left-80 sm:left-96 right-12 top-1/2 -translate-y-1/2 flex items-center z-20">
                                <p className="text-white text-body-lg font-semibold tracking-wide">
                                    Total Packaging Solutions and Manufacturing, Inc. (TPSMI) offer a broad range of
                                    packaging solutions to meet our customer needs and continuously improve our
                                    operations to better respond to those needs. We provide high-quality packaging
                                    materials and services tailored to the requirements of the automotive and
                                    electronics industries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative border border-black bg-neutral-700 py-8 sm:py-10">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-6 lg:gap-x-10">
                        <div className="flex flex-col items-center justify-center gap-2 px-2 text-center sm:gap-2.5">
                            <div className="font-['Inter'] text-3xl font-bold leading-none text-white sm:text-4xl">
                                18+
                            </div>
                            <div className="max-w-[9rem] font-['Inter'] text-xs font-normal uppercase leading-snug tracking-wide text-white sm:max-w-none">
                                Years of Adventure
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 px-2 text-center sm:gap-2.5">
                            <div className="font-['Inter'] text-3xl font-bold leading-none text-white sm:text-4xl">
                                5000+
                            </div>
                            <div className="max-w-[9rem] font-['Inter'] text-xs font-normal uppercase leading-snug tracking-wide text-white sm:max-w-none">
                                Vehicles Customized
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 px-2 text-center sm:gap-2.5">
                            <div className="font-['Inter'] text-3xl font-bold leading-none text-white sm:text-4xl">
                                120+
                            </div>
                            <div className="max-w-[9rem] font-['Inter'] text-xs font-normal uppercase leading-snug tracking-wide text-white sm:max-w-none">
                                Expert Technicians
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 px-2 text-center sm:gap-2.5">
                            <div className="font-['Inter'] text-3xl font-bold leading-none text-white sm:text-4xl">3</div>
                            <div className="max-w-[9rem] font-['Inter'] text-xs font-normal uppercase leading-snug tracking-wide text-white sm:max-w-none">
                                Service Centers
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ISO logo - white background */}
            <div className="flex justify-center bg-white py-12">
                <img src="/iso.png" alt="ISO" className="h-26 w-auto object-contain" />
            </div>
            {/* separator line below ISO logo */}
            <div className="w-full border-t-8 border-gray-200" />

            {/* Premium Packaging and Protective Solutions */}
            <div className="bg-white py-12 pb-14">
                <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-center text-red-600 text-section font-['Inter'] tracking-widest mb-16">
                        Premium Packaging and Protective<br />Solutions for your Buisiness Needs
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 justify-items-center text-center">
                        {/* DURABLE MATERIALS - hexagon with checkmark, thin outline */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 flex items-center justify-center text-neutral-500" style={{ color: '#737373' }}>
                                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
                                    <path d="M32 10L52 22V42L32 54L12 42V22L32 10Z" strokeLinejoin="round" />
                                    <path d="M22 32L28 36L42 24" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-red-600 text-caption font-['Inter']">DURABLE MATERIALS</span>
                        </div>
                        {/* FAST DELIVERY - pickup truck, thin outline */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 flex items-center justify-center text-neutral-500" style={{ color: '#737373' }}>
                                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
                                    <path d="M6 38V26L26 26L30 18H44L52 28V38" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M52 38H42L38 30H26L22 38H6" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="16" cy="46" r="4" />
                                    <circle cx="46" cy="46" r="4" />
                                    <path d="M20 46H42" strokeLinecap="round" />
                                    <path d="M30 18L38 28" strokeLinecap="round" />
                                </svg>
                            </div>
                            <span className="text-red-600 text-caption font-['Inter']">FAST DELIVERY</span>
                        </div>
                        {/* COMPETETIVE PRICING - rectangular box with dotted pattern inside, horizontal line above */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 flex items-center justify-center text-neutral-500" style={{ color: '#737373' }}>
                                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
                                    <path d="M18 22H46V54H18V22Z" strokeLinejoin="round" />
                                    <path d="M22 18H42" strokeLinecap="round" />
                                    <path d="M22 32H42M22 40H42M22 48H42" strokeLinecap="round" strokeDasharray="3 2" />
                                </svg>
                            </div>
                            <span className="text-red-600 text-caption font-['Inter']">COMPETETIVE PRICING</span>
                        </div>
                        {/* QUALITY ASSURED - shield with checkmark, thin outline */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 flex items-center justify-center text-neutral-500" style={{ color: '#737373' }}>
                                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
                                    <path d="M32 10L10 20V34C10 46 32 58 32 58C32 58 54 46 54 34V20L32 10Z" strokeLinejoin="round" />
                                    <path d="M22 34L28 40L42 26" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="text-red-600 text-caption font-['Inter']">QUALITY ASSURED</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* VACUUM FORMED PLASTIC PRODUCTS - whole section on grayscale bg.jpg */}
            <div className="relative w-full overflow-hidden min-h-[800px]">
                <div
                    className="absolute inset-0 z-0 min-h-full"
                    style={{
                        backgroundImage: "url('/bg.jpg')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        filter: 'grayscale(100%)',
                    }}
                />
                {/* Mobile: solid red. sm+: red/gray diagonal (SVG). */}
                <div className="relative z-10 w-full min-h-[5.25rem] overflow-hidden bg-[#E31E25] sm:bg-transparent sm:min-h-0 sm:h-24">
                    <svg
                        className="pointer-events-none absolute inset-0 hidden h-full min-h-[5.25rem] w-full sm:block sm:min-h-0"
                        viewBox="0 0 771 103"
                        fill="none"
                        preserveAspectRatio="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                    >
                        <path d="M0 0H320L400 103H0V0Z" fill="#E31E25" />
                        <path d="M320 0L400 103L771 103L771 0Z" fill="#8C8C8C" />
                    </svg>
                    <div className="relative z-10 flex min-h-[5.25rem] w-full items-center px-4 py-3.5 sm:min-h-0 sm:h-full sm:px-6 sm:py-0 md:pl-10 md:pr-8 lg:pl-12">
                        <h2 className="max-w-full text-balance font-['Inter'] text-[11px] font-semibold uppercase leading-snug tracking-wide text-white sm:text-sm md:text-base lg:text-body-lg sm:leading-normal sm:tracking-[0.1em] md:tracking-[0.12em]">
                            VACUUM FORMED PLASTIC PRODUCTS
                        </h2>
                    </div>
                </div>

                {/* Product cards 3x2 + carousel buttons */}
                <div className="relative z-10 w-full min-h-[700px] py-16">
                    <div className="relative max-w-6xl mx-auto px-4">
                        <div id="products" className="grid grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 sm:gap-16 lg:grid-cols-3 lg:gap-20">
                            {visibleTpsmiProducts.map((product, i) => (
                                <div
                                    key={product.id ?? `${product.title}-${i}`}
                                    className="flex w-full max-w-sm min-h-0 cursor-pointer flex-col overflow-hidden rounded-[20px] shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out hover:scale-105 hover:shadow-none"
                                >
                                    <div className="shrink-0 rounded-t-[20px] bg-white p-3 pt-4 sm:p-4 sm:pt-5">
                                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                                            <img
                                                className="h-full w-full object-cover"
                                                src={
                                                    product.img
                                                        ? publicAssetUrl(product.img)
                                                        : 'https://placehold.co/800x600/e5e5e5/737373?text=No+image'
                                                }
                                                alt={product.title}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center rounded-b-[20px] bg-red-600 px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
                                        <h3 className="mb-3 text-center font-['Inter'] text-caption text-white sm:mb-4">
                                            {product.title}
                                        </h3>
                                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 sm:gap-x-5">
                                            {product.features.map((feature, j) => (
                                                <div key={j} className="flex max-w-full items-center gap-2 px-0.5">
                                                    <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
                                                    <span className="font-['Inter'] text-sm leading-snug text-white">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Carousel prev/next buttons */}
                        <button
                            type="button"
                            onClick={goToPreviousProductPage}
                            disabled={resolvedTpsmiProducts.length <= productsPerPage}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-12 h-12 rounded-full bg-white border-2 border-neutral-300 shadow-lg flex items-center justify-center hover:bg-neutral-50 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous"
                        >
                            <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={goToNextProductPage}
                            disabled={resolvedTpsmiProducts.length <= productsPerPage}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-12 h-12 rounded-full bg-white border-2 border-neutral-300 shadow-lg flex items-center justify-center hover:bg-neutral-50 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next"
                        >
                            <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Stone background — VFP product showcase (responsive; replaces fixed absolute layout) */}
            <div className="w-full bg-stone-900 py-10 sm:py-14 lg:py-16">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl border-4 border-red-600 bg-white shadow-2xl sm:rounded-[2.5rem] sm:border-[5px] lg:rounded-[3rem]">
                        <div className="bg-[#E31E25] px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                                <h2 className="max-w-full text-balance font-['Inter'] text-xs font-semibold uppercase leading-snug tracking-wide text-white sm:text-sm md:text-base lg:text-subtitle">
                                    VACUUM FORMED PLASTIC PRODUCTS
                                </h2>
                                <img
                                    src="/Tpsmilogo.png"
                                    alt="TPSMI"
                                    className="h-9 w-auto shrink-0 object-contain grayscale sm:h-11 lg:h-12"
                                />
                            </div>
                        </div>
                        <div className="bg-white px-4 py-8 sm:px-12 sm:py-12 lg:px-16 lg:py-16">
                            <div className="mx-auto w-full max-w-4xl relative">
                                <img
                                    src={vfpImages[currentVfpIndex].src}
                                    alt={vfpImages[currentVfpIndex].alt}
                                    className="mx-auto h-auto w-full object-contain object-center max-h-[min(65vh,560px)] sm:max-h-[min(70vh,640px)] transition-opacity duration-300"
                                />

                                <button
                                    type="button"
                                    onClick={prevVfpImage}
                                    className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-red-600 border-[3px] border-white shadow-[0_4px_12px_rgba(227,30,37,0.4)] text-white transition-transform hover:scale-110 hover:bg-red-500 z-10"
                                >
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    onClick={nextVfpImage}
                                    className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-red-600 border-[3px] border-white shadow-[0_4px_12px_rgba(227,30,37,0.4)] text-white transition-transform hover:scale-110 hover:bg-red-500 z-10"
                                >
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-8 flex justify-center gap-2">
                                {vfpImages.map((_, idx) => (
                                    <button
                                        key={`dot-${idx}`}
                                        type="button"
                                        onClick={() => setCurrentVfpIndex(idx)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            idx === currentVfpIndex ? 'w-8 bg-red-600' : 'w-2.5 bg-gray-300 hover:bg-red-400'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {/* Customize box section (full-bleed) */}
            <div
                className="relative left-1/2 m-0 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden p-0"
                style={{ width: '100vw' }}
            >
            </div>

            {/* Full-bleed Karton banner with cards */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 m-0 p-0">
                <img
                    src="/karton.png"
                    alt="Karton"
                    loading="lazy"
                    className="w-screen max-w-none h-[520px] sm:h-[560px] lg:h-[640px] object-cover block m-0 p-0"
                />

                {/* Overlay cards */}
                <div className="absolute inset-0">
                    <div className="mx-auto flex h-full w-full max-w-7xl items-start px-4 pt-6 sm:px-6 sm:pt-10 lg:items-center lg:px-8 lg:pt-0">
                        <div className="w-full max-w-[520px] space-y-4 sm:space-y-5">
                            <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-red-600/90 shadow-[0px_4px_14.1px_0px_rgba(0,0,0,0.62)] backdrop-blur-[1px]">
                                <div className="px-5 py-5 text-center sm:px-8 sm:py-6">
                                    <div className="text-white text-base sm:text-xl font-extrabold font-['Inter'] leading-tight">
                                        Quotation
                                    </div>
                                    <div className="mt-2 text-white text-sm sm:text-xl font-normal font-['Inter'] leading-snug sm:leading-6">
                                        Get a free estimate tailored to your budget and requirements.
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-red-600/90 shadow-[0px_4px_14.1px_0px_rgba(0,0,0,0.62)] backdrop-blur-[1px]">
                                <div className="px-5 py-5 text-center sm:px-8 sm:py-6">
                                    <div className="text-white text-base sm:text-xl font-extrabold font-['Inter'] leading-tight">
                                        Delivery
                                    </div>
                                    <div className="mt-2 text-white text-sm sm:text-xl font-normal font-['Inter'] leading-snug sm:leading-6">
                                        We provide reliable delivery services to clients anywhere in the Philippines.
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-red-600/90 shadow-[0px_4px_14.1px_0px_rgba(0,0,0,0.62)] backdrop-blur-[1px]">
                                <div className="px-5 py-5 text-center sm:px-8 sm:py-6">
                                    <div className="text-white text-base sm:text-xl font-extrabold font-['Inter'] leading-tight">
                                        Free Customization
                                    </div>
                                    <div className="mt-2 text-white text-sm sm:text-xl font-normal font-['Inter'] leading-snug sm:leading-6">
                                        Enjoy free customization of style, color, and size based on your specific needs
                                    </div>
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-red-600/90 shadow-[0px_4px_14.1px_0px_rgba(0,0,0,0.62)] backdrop-blur-[1px]">
                                <div className="px-5 py-5 text-center sm:px-8 sm:py-6">
                                    <div className="text-white text-base sm:text-xl font-extrabold font-['Inter'] leading-tight">
                                        Printing
                                    </div>
                                    <div className="mt-2 text-white text-sm sm:text-xl font-normal font-['Inter'] leading-snug sm:leading-6">
                                        We offer customized printing solutions designed to match your brand and requirements.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customize box section (full-bleed, no side spacing) */}
            <div
                className="relative left-1/2 -translate-x-1/2 w-screen m-0 p-0 overflow-hidden"
                style={{ width: '100vw' }}
            >
                <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[520px]">
                    <img
                        src="/customize box.png"
                        alt="Customize Box"
                        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
                        aria-hidden="true"
                    />
                    <img
                        src="/customize box.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain"
                        aria-hidden="true"
                    />

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="w-full text-center px-4">
                            <p className="text-white text-base sm:text-lg lg:text-xl font-medium tracking-[0.25em]">
                                We are more than just a packaging company;
                            </p>
                            <h2 className="mt-3 text-white text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-widest">
                                WE MANUFACTURE AND CUSTOMIZE BOXES
                            </h2>
                            <p className="mt-3 text-white text-base sm:text-lg lg:text-xl font-medium">
                                of the highest quality.
                            </p>
                        </div>
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => router.visit(route('home') + '#contact')}
                                className="group inline-flex items-center justify-center px-8 sm:px-10 py-2.5 sm:py-3 bg-red-600 rounded-full border-2 border-white cursor-pointer select-none transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 hover:bg-red-500 shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
                            >
                                <span className="text-white text-base sm:text-lg font-extrabold tracking-[0.25em]">
                                    CUSTOMIZE NOW
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

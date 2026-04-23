import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { publicAssetUrl } from '@/utils/publicAssetUrl';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

function normalizeImageSrc(path) {
    return publicAssetUrl(path) || 'https://placehold.co/350x269';
}

export default function Siam() {
    const { props } = usePage();
    const backgroundPicture = props.backgroundPicture;
    const [bgIndex, setBgIndex] = useState(0);
    const backgrounds = (backgroundPicture?.images ?? [])
        .map((path) => publicAssetUrl(path))
        .filter(Boolean);
    const resolvedBackgrounds =
        backgrounds.length > 0
            ? backgrounds
            : ['/siambackground.JPG'];

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

    const siam = props.siam;
    const siamPageVideo = props.siamPageVideo;
    const siamProductCategories = props.siamProductCategories ?? [];
    const serviceCards = props.serviceCards ?? [];
    const statsTitleLine1 = siam?.content?.stats_title_line1 ?? 'WHAT';
    const statsTitleLine2 = siam?.content?.stats_title_line2 ?? 'WE';
    const statsTitleLine3 = siam?.content?.stats_title_line3 ?? 'DO?';
    const statsItems =
        siam?.content?.stats_items ?? [
            { value: '25+', label: 'Years Experience' },
            { value: '5', label: 'Affiliated Companies' },
            { value: '500+', label: 'Team Members' },
            { value: '1000+', label: 'Projects Completed' },
        ];
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [featuredProductIndex, setFeaturedProductIndex] = useState(0);
    const [galleryPage, setGalleryPage] = useState(0);
    const popupCloseTimerRef = useRef(null);

    const GALLERY_PER_PAGE = 3;

    const activeSiamContentVideo =
        siam?.content?.video && (siam?.content?.video?.active ?? true)
            ? siam.content.video
            : null;

    const activeSiampageVideo =
        siamPageVideo && siamPageVideo.is_active ? siamPageVideo : null;

    const resolvedVideoTitle =
        activeSiamContentVideo?.title ??
        activeSiampageVideo?.title ??
        'SIAM Page Video';

    const resolvedVideoUrl =
        activeSiamContentVideo?.url ??
        activeSiampageVideo?.video_path ??
        activeSiampageVideo?.video_url ??
        '/2025%20Sundia%20Company%20video.mp4';

    const resolvedVideoThumbnail =
        activeSiamContentVideo?.thumbnail ??
        activeSiampageVideo?.thumbnail_path ??
        null;

    const resolvedOverlayEnabled =
        activeSiamContentVideo ? true : activeSiampageVideo?.overlay_enabled ?? true;

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

            if (host.includes('youtube.com')) {
                const id = parsed.searchParams.get('v');
                if (id) return `https://www.youtube.com/embed/${id}`;
                if (parsed.pathname.startsWith('/embed/')) return url;
            }
            if (host === 'youtu.be') {
                const id = parsed.pathname.replace('/', '').trim();
                if (id) return `https://www.youtube.com/embed/${id}`;
            }

            if (host.includes('vimeo.com')) {
                const parts = parsed.pathname.split('/').filter(Boolean);
                const id = parts[0];
                if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
                if (parsed.hostname.includes('player.vimeo.com')) return url;
            }
        } catch {
            // keep as-is
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

    const modalIntroText =
        selectedCategory?.modal_short_description ||
        selectedCategory?.card_description ||
        'Products designed for health and safety during the pandemic, such as automated shoe disinfection systems and eco-friendly disinfecting mats to help maintain sanitation.';

    const openCategoryModal = (category) => {
        if (popupCloseTimerRef.current) {
            window.clearTimeout(popupCloseTimerRef.current);
            popupCloseTimerRef.current = null;
        }
        setFeaturedProductIndex(0);
        setGalleryPage(0);
        setSelectedCategory(category);
    };

    const closeCategoryModal = () => {
        setIsPopupVisible(false);
        if (popupCloseTimerRef.current) window.clearTimeout(popupCloseTimerRef.current);
        popupCloseTimerRef.current = window.setTimeout(() => {
            setSelectedCategory(null);
        }, 220);
    };

    useEffect(() => {
        if (!selectedCategory) return undefined;

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                closeCategoryModal();
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handleEsc);
        };
    }, [selectedCategory]);

    useEffect(() => {
        if (!selectedCategory) {
            setIsPopupVisible(false);
            return undefined;
        }

        setIsPopupVisible(false);
        const rafId = window.requestAnimationFrame(() => setIsPopupVisible(true));
        return () => window.cancelAnimationFrame(rafId);
    }, [selectedCategory]);

    const categoryProducts = selectedCategory?.products ?? [];
    const categoryProductCount = categoryProducts.length;
    const galleryPageCount =
        categoryProductCount > 0 ? Math.ceil(categoryProductCount / GALLERY_PER_PAGE) : 0;
    const gallerySliceStart = galleryPage * GALLERY_PER_PAGE;
    const gallerySlice = categoryProducts.slice(gallerySliceStart, gallerySliceStart + GALLERY_PER_PAGE);

    const featuredProduct = categoryProducts[featuredProductIndex] ?? null;

    const goFeaturedNext = () => {
        if (categoryProductCount <= 1) return;
        setFeaturedProductIndex((i) => {
            const next = (i + 1) % categoryProductCount;
            setGalleryPage(Math.floor(next / GALLERY_PER_PAGE));
            return next;
        });
    };

    const goFeaturedPrev = () => {
        if (categoryProductCount <= 1) return;
        setFeaturedProductIndex((i) => {
            const next = (i - 1 + categoryProductCount) % categoryProductCount;
            setGalleryPage(Math.floor(next / GALLERY_PER_PAGE));
            return next;
        });
    };

    const defaultProductBlurb =
        'Essential safety and protective products designed to promote health and prevent the spread of infection.';

    return (
        <>
            <Head title="SIAM" />
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
                    <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/80 to-black/40" />

                    <Header />

                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-10 pt-32 sm:px-6 sm:pb-12 md:pb-32 md:pt-32 lg:px-8 lg:pb-40 lg:pt-36">
                        <div className="w-full max-w-[min(100%,42rem)]">
                            <h1 className="text-balance font-['Inter'] text-white text-hero">SIAM</h1>
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
                                <span>CONTACT US</span>
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

                    {/* Mobile: in-flow below CTA. md+: pinned to hero bottom, 50/50 on image & white. */}
                    <div className="relative z-20 mt-6 w-full px-4 sm:px-6 sm:mt-8 md:pointer-events-none md:absolute md:bottom-0 md:left-0 md:right-0 md:mt-0 md:translate-y-1/2 lg:px-8">
                        <div className="pointer-events-auto mx-auto max-w-7xl">
                            <div className="flex flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl lg:flex-row lg:min-h-[12rem]">
                                <div className="flex shrink-0 flex-col justify-center bg-red-600 p-6 text-white sm:p-8 lg:w-52 lg:min-h-0 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.09)]">
                                    <div className="text-caption">
                                        <svg width="33" height="10" viewBox="0 0 33 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.388672 0.673863C0.388672 0.301699 0.690371 0 1.06254 0H13.788C13.9232 0 14.0553 0.040683 14.1671 0.11676L15.6078 1.09715C16.1563 1.47039 15.8921 2.32812 15.2287 2.32812H4.3004C4.02946 2.32812 3.80983 2.54776 3.80983 2.8187C3.80983 3.08833 4.02742 3.30742 4.29705 3.30927L16.7474 3.39448C17.1178 3.39701 17.4167 3.69796 17.4167 4.06833V5.05332C17.4167 5.42548 17.115 5.72718 16.7428 5.72718H1.06254C0.690371 5.72718 0.388672 5.42548 0.388672 5.05332V0.673863Z" fill="white" />
                                            <path d="M3.40554 6.96057C3.51706 6.88507 3.64864 6.84473 3.7833 6.84473H15.3365C15.9972 6.84473 16.2633 7.69675 15.72 8.07271L14.1687 9.14624C14.0553 9.2242 13.9222 9.26597 13.7852 9.26597H2.1975C1.53324 9.26597 1.26967 8.40646 1.81974 8.03409L3.40554 6.96057Z" fill="white" />
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
                                            <div className="text-subtitle text-red-600">{item.value}</div>
                                            <div className="text-caption text-gray-400 text-xs">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reserve space for the half of the stats card that sits below the hero (50/50 overlap) */}
                <div className="relative z-10 bg-white pt-10 pb-24 sm:pb-28 md:pt-[clamp(7rem,22vw,11rem)]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative z-20">
                            <div>
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
                                                        className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
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

                                <p className="mt-8 text-body-lg text-gray-700">
                                    It was established in 2010 to handle the distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group. Products include automotive acccessories, adhesives, chemicals, power coating, industrial oil, diesel fuel, kraft paper underlay, plastic overlay, and other manufacturing packaging and consumables. We also provide services for generator, truck, and forklift maintenance.
                                </p>

                                <div id="siam-about" className="mt-16 w-screen relative left-1/2 -translate-x-1/2 pr-0 scroll-mt-36">
                                    <div className="relative h-[380px] pl-25 sm:pl-20 lg:pl-24 pr-0 z-10" style={{ marginLeft: '96px' }}>
                                        <div
                                            className="absolute left-24 sm:left-28 right-0 top-0 h-full rounded-tl-[100px] rounded-bl-[100px]"
                                            style={{ backgroundColor: '#E31E25' }}
                                        />
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-full shadow-xl flex items-center justify-center p-8 z-20">
                                            <img className="w-full h-full object-contain" src="/siam.png" alt="SKOM DIRECT" />
                                        </div>
                                        <div className="absolute left-80 sm:left-96 right-8 sm:right-12 top-1/2 -translate-y-1/2 flex items-center z-20">
                                            <p className="text-white text-body-lg font-semibold tracking-wide font-['Inter']">
                                                It was established in 2010 to handle the distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group. Products include automotive acccessories, adhesives, chemicals, power coating, industrial oil, diesel fuel, kraft paper underlay, plastic overlay, and other manufacturing packaging and consumables. We also provide services for generator, truck, and forklift maintenance.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-12 min-h-[5.5rem] w-full sm:mt-20 sm:h-20 sm:min-h-0">
                        <div className="absolute left-0 top-0 h-full min-h-[5.5rem] w-[58%] sm:min-h-0">
                            <svg
                                className="block h-full w-full"
                                viewBox="0 0 771 80"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                            >
                                <path d="M-4 0H770.5L659.5 80H-4V0Z" fill="#E31E25" />
                            </svg>
                        </div>
                        <div className="absolute right-0 top-0 h-full min-h-[5.5rem] w-[58%] sm:min-h-0">
                            <svg
                                className="block h-full w-full"
                                viewBox="0 0 781 81"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                            >
                                <path d="M781 0L107.245 0L0 80.54H781V0Z" fill="#8C8C8C" />
                            </svg>
                        </div>
                        <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
                            <div className="flex h-full w-[42%] max-w-[11rem] items-center justify-center px-2 py-2 sm:max-w-none sm:w-[38%] sm:px-3">
                                <h2 className="text-center font-['Inter'] text-base font-extrabold uppercase leading-tight tracking-wide text-white sm:text-2xl lg:text-section">
                                    OUR PRODUCTS
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center gap-10 px-4 pb-0 sm:mt-16 sm:gap-14 sm:px-6 lg:mt-24 lg:gap-16 lg:px-8">
                        <div className="w-full">
                            <h2 className="text-center font-['Inter'] text-lg font-semibold leading-snug tracking-wide text-black sm:text-xl md:text-subtitle">
                                Delivering Quality Products Across Multiple Industries
                            </h2>
                            <p className="mt-5 text-center font-['Inter'] text-sm leading-relaxed tracking-wide text-neutral-800 sm:mt-6 sm:text-base md:text-body-lg">
                                We deliver high-quality products across multiple industries, ensuring reliability,
                                durability, and customer satisfaction. Our offerings include pandemic essentials,
                                precision metal fabrication, customized trophies and signages, durable boxes and
                                office supplies, construction materials, and other essential consumables. Each
                                product is designed to meet industry standards while providing practical and
                                cost-effective solutions for businesses.
                            </p>
                        </div>

                        <div id="products" className="grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
                            {siamProductCategories.map((category, index) => (
                                <button
                                    key={category.id ?? `siam-category-${index}`}
                                    type="button"
                                    onClick={() => openCategoryModal(category)}
                                    className="mx-auto flex w-full max-w-sm flex-col text-left transition-transform duration-300 ease-out hover:scale-[1.02]"
                                >
                                    <img
                                        className="w-full h-64 object-cover rounded-t-[20px]"
                                        src={normalizeImageSrc(category.card_image_path)}
                                        alt={category.name || 'SIAM category'}
                                    />
                                    <div className="bg-red-600 rounded-b-[20px] p-6 flex flex-col items-center justify-center min-h-[112px] text-center text-white">
                                        <h3 className="text-caption font-['Inter']">{category.name}</h3>
                                        <p className="mt-2 text-body text-xs font-['Inter'] px-2">
                                            {category.card_description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-28 bg-red-600 flex-shrink-0" />

            {/* 3x2 Cards Grid */}
            {serviceCards.length > 0 && (
                <div className="w-full px-4 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {serviceCards.map((card) => (
                                <div key={card.id} className="overflow-hidden rounded-lg">
                                    <img
                                        src={publicAssetUrl(card.image_path) || 'https://placehold.co/500x350/e31e25/white?text=No+Image'}
                                        alt={card.alt_text || card.title || 'Service card'}
                                        className="w-full h-72 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
                    <button
                        type="button"
                        aria-label="Close category products"
                        className={[
                            'absolute inset-0 bg-black/55 backdrop-blur-md transition-opacity duration-220',
                            isPopupVisible ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}
                        onClick={closeCategoryModal}
                    />
                    <div
                        className={[
                            'relative z-10 w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-[24px] bg-white shadow-2xl flex flex-col',
                            'transform transition-all duration-220 ease-out',
                            isPopupVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-[0.98]',
                        ].join(' ')}
                    >
                        <div className="relative h-[4.5rem] sm:h-20 w-full flex-shrink-0 overflow-hidden">
                            <svg
                                className="absolute inset-0 h-full w-full"
                                viewBox="0 0 1440 96"
                                fill="none"
                                preserveAspectRatio="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M0 0H840L940 96H0V0Z" fill="#E31E25" />
                                <path d="M840 0L940 96H1440V0H840Z" fill="#9CA3AF" />
                            </svg>
                            <div className="relative z-10 flex h-full items-center pl-5 pr-24 text-white">
                                <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-wide text-left leading-tight">
                                    {selectedCategory.name}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={closeCategoryModal}
                                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-neutral-800 shadow hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                            >
                                Close
                            </button>
                        </div>

                        <div className="px-3 pb-6 pt-4 sm:px-7 overflow-y-auto flex-1 min-h-0">
                            <p className="mx-auto max-w-2xl text-center text-sm sm:text-[15px] leading-relaxed text-neutral-700">
                                {modalIntroText}
                            </p>

                            {categoryProducts.length === 0 ? (
                                <p className="mt-8 text-center text-sm text-neutral-500">
                                    No products in this category yet. Check back soon.
                                </p>
                            ) : (
                                <div className="mt-6 space-y-8">
                                    {/* Featured product + arrows */}
                                    <div className="flex items-stretch gap-2 sm:gap-3">
                                        <button
                                            type="button"
                                            onClick={goFeaturedPrev}
                                            disabled={categoryProductCount <= 1}
                                            aria-label="Previous product"
                                            className="hidden sm:flex w-10 flex-shrink-0 items-center justify-center text-[#E31E25] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25"
                                        >
                                            <span className="text-3xl font-bold leading-none">&lsaquo;</span>
                                        </button>

                                        <div className="min-w-0 flex-1 overflow-hidden rounded-[20px] shadow-[0px_10px_40px_rgba(0,0,0,0.15)]">
                                            <div className="relative aspect-[16/10] w-full bg-neutral-100">
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={normalizeImageSrc(featuredProduct?.image_path)}
                                                    alt={featuredProduct?.title || 'Featured product'}
                                                />
                                            </div>
                                            <div
                                                className="px-4 py-4 text-white sm:px-6 sm:py-5"
                                                style={{ backgroundColor: '#E31E25' }}
                                            >
                                                <h4 className="text-center text-sm font-extrabold uppercase leading-snug tracking-wide sm:text-base">
                                                    {featuredProduct?.title}
                                                </h4>
                                                <p className="mt-2 text-center text-xs font-light leading-relaxed sm:text-sm">
                                                    {featuredProduct?.description || defaultProductBlurb}
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={goFeaturedNext}
                                            disabled={categoryProductCount <= 1}
                                            aria-label="Next product"
                                            className="flex w-9 flex-shrink-0 items-center justify-center text-[#E31E25] transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-25 sm:w-10"
                                        >
                                            <span className="text-3xl font-bold leading-none">&rsaquo;</span>
                                        </button>
                                    </div>

                                    {/* Thumbnail row (3 per view) + pagination */}
                                    <div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
                                            {gallerySlice.map((product, idx) => {
                                                const globalIndex = gallerySliceStart + idx;
                                                const isActive = globalIndex === featuredProductIndex;
                                                return (
                                                    <button
                                                        key={product.id ?? `thumb-${globalIndex}`}
                                                        type="button"
                                                        onClick={() => {
                                                            setFeaturedProductIndex(globalIndex);
                                                            setGalleryPage(
                                                                Math.floor(globalIndex / GALLERY_PER_PAGE)
                                                            );
                                                        }}
                                                        className={[
                                                            'overflow-hidden rounded-[16px] text-left shadow-md transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E31E25] focus-visible:ring-offset-2',
                                                            isActive ? 'ring-2 ring-[#E31E25] ring-offset-2' : '',
                                                        ].join(' ')}
                                                    >
                                                        <div className="aspect-[4/3] w-full bg-neutral-100">
                                                            <img
                                                                className="h-full w-full object-cover"
                                                                src={normalizeImageSrc(product.image_path)}
                                                                alt={product.title || 'Product'}
                                                            />
                                                        </div>
                                                        <div
                                                            className="px-2 py-3 text-white sm:px-3"
                                                            style={{ backgroundColor: '#E31E25' }}
                                                        >
                                                            <p className="text-center text-[10px] font-bold uppercase leading-tight tracking-wide sm:text-[11px]">
                                                                {selectedCategory.name}
                                                            </p>
                                                            <p className="mt-1 line-clamp-2 text-center text-[9px] font-light leading-snug opacity-95 sm:text-[10px]">
                                                                {product.description || defaultProductBlurb}
                                                            </p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {galleryPageCount > 1 && (
                                            <div className="mt-5 flex justify-center gap-2">
                                                {Array.from({ length: galleryPageCount }, (_, i) => (
                                                    <button
                                                        // eslint-disable-next-line react/no-array-index-key
                                                        key={i}
                                                        type="button"
                                                        aria-label={`Gallery page ${i + 1}`}
                                                        onClick={() => setGalleryPage(i)}
                                                        className={[
                                                            'h-2.5 w-2.5 rounded-full transition-colors',
                                                            galleryPage === i ? 'bg-[#E31E25]' : 'bg-neutral-300 hover:bg-neutral-400',
                                                        ].join(' ')}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
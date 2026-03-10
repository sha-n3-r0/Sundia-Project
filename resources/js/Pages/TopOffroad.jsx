import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function TopOffroad() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeCategory, setActiveCategory] = useState('car-accessories');
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
    return (
        <>
            <Head title="TOP OFFROAD" />

            <div className="min-h-screen font-['Inter'] antialiased bg-white">
                {/* HERO - same wrapper structure as Welcome.jsx for "What do we do" positioning */}
                <div className="relative min-h-[540px] sm:min-h-[620px] lg:min-h-[875px]">
                    <section
                        className="relative overflow-hidden min-h-[540px] sm:min-h-[620px] lg:min-h-[875px] bg-cover bg-center"
                        style={{ backgroundImage: "url('/Topoffroad.png?v=2')" }}
                    >
                        {/* Gradient overlay layer */}
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-black/30 pointer-events-none" />

                        {/* Navbar */}
                        <Header />

                        {/* Hero content - adjust marginLeft/left to fine-tune position */}
                        <div
                            className="relative z-10 mr-auto flex max-w-6xl min-h-[540px] flex-col justify-center pl-2 pr-4 sm:pl-4 sm:pr-5 lg:pl-6 lg:pr-8 pt-56 sm:pt-64"
                            style={{ marginLeft: '85px' }}
                        >
                        <div className="w-full max-w-[796px]">
                            <img
                                className="w-[500px] h-18 max-w-full"
                                src="TOPLOGO.PNG"
                                alt="TOP OFFROAD"
                            />
                            <p className="mt-6 text-orange-500 text-2xl font-medium leading-8">
                                Premium Off-Road Accessories
                            </p>
                            <p className="mt-3 text-white text-base sm:text-lg font-medium leading-7">
                                Your one-stop shop for quality off-road accessories and parts. From suspension
                                upgrades to recovery gear, we have everything you need to conquer any terrain.
                            </p>

                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <Link
                                    href={route('home') + '#contact'}
                                    className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-600 px-8 text-base font-normal text-white shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10),0px_1px_3px_0px_rgba(0,0,0,0.10)] hover:from-red-500 hover:to-orange-500"
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
                                                    d="M3.33398 8H12.6673"
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
                                    href={route('home') + '#contact'}
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-normal text-black shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ring-1 ring-slate-700 hover:bg-gray-50"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                    {/* What do we do - adjust transform to manually move up/down (e.g. -80px for top, 50% for default) */}
                    <div className="relative z-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative z-20" style={{ transform: 'translateY(-120px)' }}>
                            <div className="flex flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl lg:flex-row lg:h-48">
                                <div className="flex flex-col justify-center p-8 text-white lg:w-52 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.09)]" style={{ backgroundColor: '#FF6E00' }}>
                                    <div className="text-sm font-bold tracking-widest uppercase">
                                        <svg width="33" height="10" viewBox="0 0 33 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.388672 0.673863C0.388672 0.301699 0.690371 0 1.06254 0H13.788C13.9232 0 14.0553 0.040683 14.1671 0.11676L15.6078 1.09715C16.1563 1.47039 15.8921 2.32812 15.2287 2.32812H4.3004C4.02946 2.32812 3.80983 2.54776 3.80983 2.8187C3.80983 3.08833 4.02742 3.30742 4.29705 3.30927L16.7474 3.39448C17.1178 3.39701 17.4167 3.69796 17.4167 4.06833V5.05332C17.4167 5.42548 17.115 5.72718 16.7428 5.72718H1.06254C0.690371 5.72718 0.388672 5.42548 0.388672 5.05332V0.673863Z" fill="white" />
                                            <path d="M3.40554 6.96057C3.51706 6.88507 3.64864 6.84473 3.7833 6.84473H15.3365C15.9972 6.84473 16.2633 7.69675 15.72 8.07271L14.1687 9.14624C14.0553 9.2242 13.9222 9.26597 13.7852 9.26597H2.1975C1.53324 9.26597 1.26967 8.40646 1.81974 8.03409L3.40554 6.96057Z" fill="white" />
                                            <path d="M15.5506 0.0463867H32.3454V9.17263H15.3174L18.894 6.8445H29.0798V2.23482H18.7385L15.5506 0.0463867Z" fill="white" />
                                        </svg>
                                    </div>
                                    <h2 className="mt-4 text-3xl font-bold leading-none tracking-tight">
                                        WHAT<br />WE<br />DO?
                                    </h2>
                                </div>

                                <div className="grid flex-1 grid-cols-2 gap-8 p-12 lg:grid-cols-4 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.06)] items-center">
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold" style={{ color: '#FF6E00' }}>25+</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Years Experience</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold" style={{ color: '#FF6E00' }}>5</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Affiliated Companies</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold" style={{ color: '#FF6E00' }}>500+</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Team Members</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold" style={{ color: '#FF6E00' }}>1000+</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Projects Completed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="relative z-0 bg-white pt-20 pb-0">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Video Section */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-[30px] bg-gray-900 shadow-2xl group -mt-16">
                            <video
                                ref={videoRef}
                                className="h-full w-full object-cover rounded-[30px]"
                                src="/2024%20TOP%20Offroad%20presentation.mp4"
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
                            <p className="mx-auto mt-6 max-w-4xl text-base sm:text-lg font-medium leading-7 text-gray-700">
                                TOP Offroad Philippines has become a major player in the distribution and installation of outdoor and off-road vehicle accessories. We continuously expand our product line to help our customers enjoy the outdoor experience. Products include bed covers, plastic garnishes, metal garnishes, roof racks, lighting and electronic accessories, portable power supply, car camping gear, window tint, batteries, and our automotive consumables.
                            </p>
                        </div>
                    </div>

                        {/* Featured section - full width, orange flush right (no white space); marginLeft to manually move */}
                        <div className="relative w-screen mt-16 overflow-visible" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
                            <div className="relative h-[380px] pl-25 sm:pl-20 lg:pl-24 pr-0" style={{ marginLeft: '96px' }}>
                                {/* Orange bar - extends flush to right edge, rounded only on left */}
                                <div
                                    className="absolute left-24 sm:left-28 right-0 top-0 h-full rounded-tl-[50px] rounded-bl-[50px] border-4 border-orange-600 shadow-lg"
                                    style={{ backgroundColor: '#FF6E00' }}
                                />
                                {/* White circle with logo - overlaps left edge of orange */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 bg-white rounded-full shadow-lg flex items-center justify-center p-4 z-10">
                                    <img className="w-full h-full object-contain" src="/topoffroadlogo.png" alt="TOP Offroad" />
                                </div>
                                {/* Text content - white, left-aligned, inside orange bar */}
                                <div className="absolute left-72 sm:left-80 right-8 top-1/2 -translate-y-1/2 flex items-center z-10">
                                    <p className="text-white text-base sm:text-lg font-bold leading-relaxed tracking-wide">
                                        TOP Offroad Philippines has become a major player in the distribution and installation of outdoor and off-road vehicle accessories. We continuously expand our product line to help our customers enjoy the outdoor experience. Products include bed covers, plastic garnishes, metal garnishes, roof racks, lighting and electronic accessories, portable power supply, car camping gear, window tint, batteries, and our automotive consumables.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative w-screen mt-16"
                            style={{ marginLeft: 'calc(-50vw + 50%)' }}
                        >
                            <div className="relative h-48">
                                <div className="absolute inset-0 bg-neutral-700 border border-black" />
                                <div className="relative h-full flex items-center justify-center">
                                    <div className="w-full max-w-[1222.91px] inline-flex justify-center items-start gap-6">
                                        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-1.5">
                                            <div className="self-stretch flex flex-col justify-start items-center">
                                                <div className="text-center justify-center text-white text-4xl font-bold font-['Inter'] leading-9">18+</div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-center">
                                                <div className="text-center justify-center text-white text-xs font-normal font-['Inter'] uppercase leading-4 tracking-wide">Years of Adventure</div>
                                            </div>
                                        </div>
                                        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-1.5">
                                            <div className="self-stretch flex flex-col justify-start items-center">
                                                <div className="text-center justify-center text-white text-3xl font-bold font-['Inter'] leading-9">5000+</div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-center">
                                                <div className="text-center justify-center text-white text-xs font-normal font-['Inter'] uppercase leading-4 tracking-wide">Vehicles Customized</div>
                                            </div>
                                        </div>
                                        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-1.5">
                                            <div className="self-stretch flex flex-col justify-start items-center">
                                                <div className="text-center justify-center text-white text-3xl font-bold font-['Inter'] leading-9">120+</div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-center">
                                                <div className="text-center justify-center text-white text-xs font-normal font-['Inter'] uppercase leading-4 tracking-wide">Expert Technicians</div>
                                            </div>
                                        </div>
                                        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-1.5">
                                            <div className="self-stretch flex flex-col justify-start items-center">
                                                <div className="text-center justify-center text-white text-4xl font-bold font-['Inter'] leading-9">3</div>
                                            </div>
                                            <div className="self-stretch flex flex-col justify-start items-center">
                                                <div className="text-center justify-center text-white text-xs font-normal font-['Inter'] uppercase leading-4 tracking-wide">Service Centers</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="relative w-screen"
                            style={{ marginLeft: 'calc(-50vw + 50%)' }}
                        >
                            <div className="relative h-[660px]">
                                <div className="absolute inset-0 bg-stone-900" />
                                <div className="w-[613.86px] left-[120px] top-[195px] absolute justify-center text-white text-lg font-normal font-['Inter'] leading-relaxed tracking-wide">
                                TOP Offroad Philippines has become a trusted name in the distribution and installation of outdoor and off-road vehicle accessories in the country. Known for quality products and reliable service, the company supports both off-road enthusiasts and everyday drivers who want to enhance their vehicles’ performance and style. From suspension upgrades and lighting systems to roof racks and recovery gear, TOP Offroad Philippines offers a wide range of durable and high-performance accessories. 
                                </div>
                                <div className="w-[626px] h-12 left-[120px] top-[120px] absolute justify-center text-white text-4xl font-extrabold font-['Inter'] leading-tight">
                                    OUTREACH MISSION & EVENTS
                                </div>
                                <img
                                    className="w-[687.48px] h-[616.73px] right-0 top-[20px] absolute rounded object-cover object-center"
                                    src="Outreach.jpg"
                                    alt="Outreach mission and events"
                                    style={{ filter: 'grayscale(100%)' }}
                                />
                            </div>
                        </div>

                        {/* Competitive Advantage - layered/overlapping like screenshot */}
                        <div className="relative w-screen -mt-28 sm:-mt-36 lg:-mt-44 z-10" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
                            {/* Centered card, not full-screen width */}
                            <div className="relative mx-auto w-full max-w-[1341px] h-[2080px] bg-orange-500 rounded-tl-[80px] rounded-tr-[80px] border-8 border-orange-400 overflow-hidden">
                                {/* White body background starts just below the header text */}
                                <div className="absolute inset-x-0 top-36 bottom-0 bg-zinc-100" />
                            
                                {/* Inner canvas (keeps your exact pixel positions) */}
                                <div className="relative mx-auto w-[1341px] h-full">
                                    <div className="w-[1320px] h-[724px] left-[11px] top-[816px] absolute bg-stone-900 rounded-tl-[50px] rounded-tr-[50px]" />
                            
                                    <div className="w-[573px] h-14 left-[384px] top-[48px] absolute justify-center text-white text-4xl font-semibold tracking-tight">
                                        COMPETETIVE ADVANTAGE
                                    </div>
                            
                                    {/* Streamlined Coordination */}
                                    <div className="w-16 h-16 left-[59px] top-[263px] absolute bg-transparent rounded-full border-4 border-orange-500" />
                                    <div className="w-[512px] h-14 left-[154px] top-[268px] absolute bg-orange-500 rounded-[50px]" />
                                    <div className="left-[163px] top-[275px] absolute justify-center text-white text-3xl font-extrabold font-['Inter']">
                                        STREAMLINED COORDINATION
                                    </div>
                                    <div className="left-[78px] top-[281px] absolute">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="coordination.jpg" aria-hidden="true">
                                            <path d="M10 13a5 5 0 0 1 0-7l.7-.7a5 5 0 0 1 7.1 7.1l-.6.6" stroke="#FF6E00" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M14 11a5 5 0 0 1 0 7l-.7.7a5 5 0 0 1-7.1-7.1l.6-.6" stroke="#FF6E00" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div className="w-[625px] h-96 left-[56px] top-[329px] absolute justify-center text-orange-500 text-2xl font-normal font-['Inter'] leading-[50px] tracking-wide">
                                        Engaging a single group of companies for various services or solutions ensures seamless coordination and communication. With all components of a project or task under one roof, there's greater efficiency in managing timelines, resources, and objectives, reducing the risk of miscommunication and delays.
                                    </div>
                                    <img
                                        className="w-[588px] h-[489px] left-[703px] top-[241px] absolute rounded-[50px] object-cover object-center"
                                        src="coordination.jpg"
                                        alt="Streamlined coordination"
                                    />
                            
                                    {/* Consistent Quality */}
                                    <div className="w-20 h-16 left-[1122px] top-[937px] absolute bg-transparent rounded-full border-4 border-white" />
                                    <div className="w-96 h-14 left-[708px] top-[948px] absolute bg-orange-500 rounded-[50px]" />
                                    <div className="left-[718px] top-[957px] absolute justify-center text-white text-3xl font-extrabold font-['Inter']">
                                        CONSISTENT QUALITY
                                    </div>
                                    <div className="left-[1143px] top-[952px] absolute">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M12 3l7 4v6c0 5-3 8-7 8s-7-3-7-8V7l7-4z" stroke="#fff" strokeWidth="2" />
                                            <path d="M8.5 12.5l2.2 2.2L15.8 9.6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="w-[560px] h-96 left-[718px] top-[1020px] absolute justify-center text-orange-500 text-2xl font-normal font-['Inter'] leading-[50px] tracking-wide">
                                        Companies within the same group often share common standards, practices, and quality control measures. This results in a higher likelihood of maintaining consistent quality across all aspects of the project, from design and development to implementation and support, ensuring a cohesive and reliable outcome.
                                    </div>
                                    <img
                                        className="w-[588px] h-[489px] left-[64px] top-[930px] absolute rounded-[50px] object-cover object-center"
                                        src="prod.jpg"
                                        alt="Consistent quality"
                                    />
                            
                                    {/* Cost Efficiency */}
                                    <div className="w-20 h-20 left-[98px] top-[1641px] absolute bg-transparent rounded-full border-4 border-orange-500" />
                                    <div className="w-80 h-12 left-[198px] top-[1654px] absolute bg-orange-500 rounded-[50px]" />
                                    <div className="left-[208px] top-[1660px] absolute justify-center text-white text-3xl font-extrabold font-['Inter']">
                                        COST EFFIICIENCY
                                    </div>
                                    <div className="left-[118px] top-[1662px] absolute">
                                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M12 1v22" stroke="#FF6E00" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M17 5.5c0-2-2.2-3.5-5-3.5S7 3.5 7 5.5 9.2 9 12 9s5 1.5 5 3.5S14.8 16 12 16s-5 1.5-5 3.5S9.2 23 12 23s5-1.5 5-3.5" stroke="#FF6E00" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div className="w-[560px] h-64 left-[92px] top-[1704px] absolute justify-center text-orange-500 text-2xl font-normal font-['Inter'] leading-[50px] tracking-wide">
                                        Bundling services from a single group of companies can often lead to cost savings. There may be economies of scale in play, reducing overall project expenses
                                    </div>
                                    <img
                                        className="w-[588px] h-[489px] right-[72px] top-[1560px] absolute rounded-[50px] object-cover object-center"
                                        src="cost.jpg"
                                        alt="Cost efficiency"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Our Products section */}
                        <div className="w-screen mt-16" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
                            <div className="bg-neutral-900 py-10">
                                <div className="max-w-5xl mx-auto px-4">
                                    <div className="text-center text-white text-2xl sm:text-3xl font-medium">
                                        OUR PRODUCTS
                                    </div>
                                    <div className="mt-8 flex flex-nowrap items-center justify-center gap-4">
                                        <button
                                            type="button"
                                            aria-pressed={activeCategory === 'car-accessories'}
                                            onClick={() => setActiveCategory('car-accessories')}
                                            className={`min-w-[210px] h-14 px-8 rounded-2xl border-[3px] border-orange-500 text-base font-medium cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
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
                                            className={`min-w-[210px] h-14 px-8 rounded-2xl border-[3px] border-orange-500 text-base font-medium cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
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
                                            className={`min-w-[210px] h-14 px-8 rounded-2xl border-[3px] border-orange-500 text-base font-medium cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
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
                                            className={`min-w-[210px] h-14 px-8 rounded-2xl border-[3px] border-orange-500 text-base font-medium cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
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
                                            className={`min-w-[210px] h-14 px-8 rounded-2xl border-[3px] border-orange-500 text-base font-medium cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${
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
                                    {/* Row 1 */}
                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/adjustable-headrest.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                ADJUSTABLE HEADREST
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">360° Adjustable</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Memory foam comfort</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Easy installation</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/extreme-blast-horn.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                EXTREME BLAST HORN
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">High decibel</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Compact design</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Easy installation</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/differential-breather-kit.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                DIFFERENTIAL BREATHER KIT
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Off-road ready</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Water protection</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Easy installation</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/rugged-case.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                RUGGED CASE
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Heavy-duty build</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Weather resistant</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Lockable latches</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/front-bumper.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                FRONT BUMPER
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Winch ready</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Steel construction</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Easy installation</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/security-strap.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                SECURITY STRAP
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Heavy-duty hooks</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">High load rating</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Easy storage</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 3 */}
                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/case.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                CASE
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Keeps gear cold</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Durable shell</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Secure latches</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/rampage-leaf-spring.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                RAMPAGE LEAF SPRING
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Improved load</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Smoother ride</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Durable steel</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group bg-white rounded-[18px] overflow-hidden shadow-lg flex flex-col transform transition-transform duration-200 hover:scale-[1.03]">
                                        <div
                                            className="w-full h-52 bg-cover bg-center transform transition-transform duration-200 group-hover:scale-110"
                                            style={{ backgroundImage: "url('/coil-spring.png')" }}
                                        />
                                        <div className="bg-neutral-800 px-4 py-3 text-white rounded-b-[18px] h-24 flex flex-col justify-between">
                                            <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-center">
                                                COIL SPRING
                                            </div>
                                            <div className="mt-3 flex items-center gap-4 text-[10px] text-orange-400">
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Lift ready</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Enhanced control</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="inline-block h-3 w-3 rounded-full bg-orange-500" />
                                                    <span className="text-[10px] text-white/80">Easy fitment</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                    <h2 className="mt-4 text-center text-white text-3xl sm:text-4xl font-semibold tracking-tight">
                                        Brands We Carry
                                    </h2>
                                    <div className="mt-3 flex items-center justify-center">
                                        <span className="h-[3px] w-24 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.8)]" />
                                    </div>
                                    <p className="mt-4 text-center text-sm sm:text-base text-gray-300">
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
                                    src="/lineup.jpg"
                                    alt="Lineup"
                                    loading="lazy"
                                    className="w-screen max-w-none h-auto object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
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

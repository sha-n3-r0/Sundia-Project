import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function Tpsmi() {
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
    return (
        <>
            <Head title="TPSMI" />
            <div className="min-h-screen font-['Inter'] antialiased bg-white">
                {/* HERO - same format as TopOffroad.jsx */}
                <div className="relative min-h-[540px] sm:min-h-[620px] lg:min-h-[875px]">
                    <section
                        className="relative overflow-hidden min-h-[540px] sm:min-h-[620px] lg:min-h-[875px] bg-cover bg-center"
                        style={{ backgroundImage: "url('/tpsmi.jpg')" }}
                    >
                        {/* Gradient overlay layer */}
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black to-black/30 pointer-events-none" />

                        {/* Navbar */}
                        <Header />

                        {/* Hero content - same layout as TopOffroad */}
                        <div
                            className="relative z-10 mr-auto flex max-w-6xl min-h-[540px] flex-col justify-center pl-2 pr-4 sm:pl-4 sm:pr-5 lg:pl-6 lg:pr-8 pt-40 sm:pt-48 lg:pt-52"
                            style={{ marginLeft: '85px' }}
                        >
                            <div className="w-full max-w-[796px]">
                                <h1 className="text-4xl sm:text-5xl lg:text-4xl font-black leading-tight text-white">
                                    TOTAL PACKAGING SOLUTIONS MANUFACTURING INC.
                                </h1>
                                <p className="mt-6 text-red-500 text-2xl font-medium leading-8">
                                    Bringing Innovative Solutions to Life
                                </p>
                                <p className="mt-3 text-white text-base sm:text-lg font-medium leading-7">
                                    At Sundia Group Philippines, our core values drive us every day. We are
                                    solutions-oriented, united, disciplined, have integrity, and are adaptable
                                    to change.
                                </p>

                                <div className="mt-10 flex flex-wrap items-center gap-4">
                                    <Link
                                        href={route('home') + '#contact'}
                                        className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-600 px-8 text-base font-normal text-white shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10),0px_1px_3px_0px_rgba(0,0,0,0.10)] hover:from-red-500 hover:to-orange-500"
                                    >
                                        <span>Learn More</span>
                                        <span className="inline-flex h-4 w-6 items-center justify-start pl-2">
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.33398 8H12.6673" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
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

                    {/* What do we do - same position as TopOffroad.jsx */}
                    <div className="relative z-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="relative z-20" style={{ transform: 'translateY(-80px)' }}>
                                <div className="flex flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl lg:flex-row lg:h-48">
                                    <div className="flex flex-col justify-center p-8 text-white lg:w-52 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.09)]" style={{ backgroundColor: '#dc2626' }}>
                                        <div className="text-sm font-bold tracking-widest uppercase">
                                            <svg width="33" height="10" viewBox="0 0 33 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.388672 0.673863C0.388672 0.301699 0.690371 0 1.06254 0H13.788C13.9232 0 14.0553 0.040683 14.1671 0.11676L15.6078 1.09715C16.1563 1.47039 15.8921 2.32812 15.2287 2.32812H4.3004C4.02946 2.32812 3.80983 2.54776 3.80983 2.8187C3.80983 3.08833 4.02742 3.30742 4.29705 3.30927L16.7474 3.39448C17.1178 3.39701 17.4167 3.69796 17.4167 4.06833V5.05332C17.4167 5.42548 17.115 5.72718 16.7428 5.72718H1.06254C0.690371 5.72718 0.388672 5.42548 0.388672 5.05332V0.673863Z" fill="white" />
                                                <path d="M3.40554 6.96057C3.51706 6.88507 3.64864 6.84473 3.7833 6.84473H15.3365C15.9972 6.84473 16.2633 7.69675 15.72 8.07271L14.1687 9.14624C14.056 9.2242 13.9222 9.26597 13.7852 9.26597H2.1975C1.53324 9.26597 1.26967 8.40646 1.81974 8.03409L3.40554 6.96057Z" fill="white" />
                                                <path d="M15.5506 0.0463867H32.3454V9.17263H15.3174L18.894 6.8445H29.0798V2.23482H18.7385L15.5506 0.0463867Z" fill="white" />
                                            </svg>
                                        </div>
                                        <h2 className="mt-4 text-3xl font-bold leading-none tracking-tight">
                                            WHAT<br />WE<br />DO?
                                        </h2>
                                    </div>

                                    <div className="grid flex-1 grid-cols-2 gap-8 p-12 lg:grid-cols-4 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.06)] items-center">
                                        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                            <div className="text-2xl font-bold" style={{ color: '#dc2626' }}>25+</div>
                                            <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Years Experience</div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                            <div className="text-2xl font-bold" style={{ color: '#dc2626' }}>3</div>
                                            <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Affiliated Companies</div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                            <div className="text-2xl font-bold" style={{ color: '#dc2626' }}>500+</div>
                                            <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Team Members</div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                            <div className="text-2xl font-bold" style={{ color: '#dc2626' }}>1000+</div>
                                            <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Projects Completed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* White screen section below the stats section */}
                <div className="relative z-0 bg-white pt-20 pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative aspect-video w-full overflow-hidden rounded-[30px] bg-gray-900 shadow-2xl group -mt-16">
                            <video
                                ref={videoRef}
                                className="h-full w-full object-cover rounded-[30px]"
                                src="/2025%20Sundia%20Company%20video.mp4"
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
                            <img src="/Tpsmilogo.png" alt="TPSMI LOGO" className="mx-auto h-32 w-auto" />
                            <p className="mx-auto mt-6 max-w-4xl text-base sm:text-lg font-medium leading-7 text-gray-700">
                                Total Packaging Solutions and Manufacturing, Inc. (TPSMI) offer a broad range of packaging solutions to meet our customer needs and continuously improve our operations to better respond to those needs. We provide high-quality packaging materials and services tailored to the requirements of the automotive and electronics industries.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Featured section - with background image and red bar */}
                <div className="relative w-screen bg-white py-20 overflow-visible" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
                    <div className="absolute left-0 top-0 w-full h-full z-0 overflow-hidden">
                        <img 
                            src="/production.jpg" 
                            alt="Background" 
                            className="w-full h-full object-cover grayscale opacity-20"
                        />
                        <div className="absolute inset-0 bg-white/60" />
                    </div>
                    
                    <div className="relative h-[380px] pl-25 sm:pl-20 lg:pl-24 pr-0 z-10" style={{ marginLeft: '96px' }}>
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
                            <p className="text-white text-lg sm:text-xl font-bold leading-relaxed tracking-wide">
                                Total Packaging Solutions and Manufacturing, Inc. (TPSMI) offer a broad range of packaging solutions to meet our customer needs and continuously improve our operations to better respond to those needs. We provide high-quality packaging materials and services tailored to the requirements of the automotive and electronics industries.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

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

                {/* ISO logo - white background */}
                <div className="flex justify-center bg-white py-12">
                    <img src="/iso.png" alt="ISO" className="h-26 w-auto object-contain" />
                </div>
                {/* separator line below ISO logo */}
                <div className="w-full border-t-8 border-gray-200" />

                {/* Premium Packaging and Protective Solutions */}
                <div className="bg-white py-12 pb-14">
                    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
                        <h2 className="text-center text-red-600 text-2xl sm:text-3xl lg:text-4xl font-normal font-['Inter'] leading-tight tracking-widest mb-16">
                            Premium Packaging and Protective<br />Solutions for your Buisiness Needs
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 justify-items-center text-center">
                            {/* DURABLE MATERIALS - hexagon with checkmark, thin outline */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-20 h-20 flex items-center justify-center text-neutral-500" style={{ color: '#737373' }}>
                                    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
                                        <path d="M32 10L52 22V42L32 54L12 42V22L32 10Z" strokeLinejoin="round"/>
                                        <path d="M22 32L28 36L42 24" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span className="text-red-600 text-sm font-extrabold font-['Inter'] uppercase tracking-wide">DURABLE MATERIALS</span>
                            </div>
                            {/* FAST DELIVERY - pickup truck, thin outline */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-20 h-20 flex items-center justify-center text-neutral-500" style={{ color: '#737373' }}>
                                    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
                                        <path d="M6 38V26L26 26L30 18H44L52 28V38" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M52 38H42L38 30H26L22 38H6" strokeLinecap="round" strokeLinejoin="round"/>
                                        <circle cx="16" cy="46" r="4" />
                                        <circle cx="46" cy="46" r="4" />
                                        <path d="M20 46H42" strokeLinecap="round"/>
                                        <path d="M30 18L38 28" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <span className="text-red-600 text-sm font-extrabold font-['Inter'] uppercase tracking-wide">FAST DELIVERY</span>
                            </div>
                            {/* COMPETETIVE PRICING - rectangular box with dotted pattern inside, horizontal line above */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-20 h-20 flex items-center justify-center text-neutral-500" style={{ color: '#737373' }}>
                                    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
                                        <path d="M18 22H46V54H18V22Z" strokeLinejoin="round"/>
                                        <path d="M22 18H42" strokeLinecap="round"/>
                                        <path d="M22 32H42M22 40H42M22 48H42" strokeLinecap="round" strokeDasharray="3 2"/>
                                    </svg>
                                </div>
                                <span className="text-red-600 text-sm font-extrabold font-['Inter'] uppercase tracking-wide">COMPETETIVE PRICING</span>
                            </div>
                            {/* QUALITY ASSURED - shield with checkmark, thin outline */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-20 h-20 flex items-center justify-center text-neutral-500" style={{ color: '#737373' }}>
                                    <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5" stroke="currentColor">
                                        <path d="M32 10L10 20V34C10 46 32 58 32 58C32 58 54 46 54 34V20L32 10Z" strokeLinejoin="round"/>
                                        <path d="M22 34L28 40L42 26" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span className="text-red-600 text-sm font-extrabold font-['Inter'] uppercase tracking-wide">QUALITY ASSURED</span>
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
                    {/* Red/gray banner */}
                    <div className="relative z-10 w-full h-24 overflow-hidden">
                        <svg className="absolute inset-0 w-full h-full object-cover" viewBox="0 0 771 103" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H320L400 103H0V0Z" fill="#E31E25"/>
                            <path d="M320 0L400 103L771 103L771 0Z" fill="#8C8C8C"/>
                        </svg>
                        <div className="relative z-10 h-full flex items-center w-full pl-6 sm:pl-8 md:pl-12">
                            <span className="text-white text-base sm:text-lg font-bold font-['Inter'] uppercase tracking-wide whitespace-nowrap" style={{ letterSpacing: '0.12em', wordSpacing: '0.2em' }}>
                                VACUUM FORMED PLASTIC PRODUCTS
                            </span>
                        </div>
                    </div>

                    {/* Product cards 3x2 + carousel buttons */}
                    <div className="relative z-10 w-full min-h-[700px] py-16">
                    <div className="relative max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 lg:gap-24 justify-items-center">
                            {[
                                { title: 'CORRUGATED BOX', img: '/CORRUGATED BOX.png', features: ['Durable', 'Custom sizes', 'Eco-friendly'] },
                                { title: 'BILAO BOX', img: '/Bilao Box.png', features: ['Food-grade', 'Stackable', 'Secure fit'] },
                                { title: 'BELLY BOX', img: '/BELLY BOX.png', features: ['Heavy duty', 'Versatile', 'Cost-effective'] },
                                { title: 'ANTI-STATIC BUBBLE SHEET POUCH', img: '/AntiStatic.png', features: ['ESD protection', 'Reusable', 'Tear resistant'] },
                                { title: 'PE FOAM POUCH', img: '/PE FOAM PoUCH.png', features: ['Cushioning', 'Lightweight', 'Flexible'] },
                                { title: 'BUBBLE SHEET SLEEVES', img: '/BUBBLE SHEET SLEEVES.png', features: ['Easy to use', 'Protective', 'Multiple sizes'] }
                            ].map((product, i) => (
                                <div key={i} className="w-96 min-h-[442px] flex flex-col overflow-hidden shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] rounded-[20px] transition-transform duration-300 ease-out hover:scale-105 hover:shadow-none cursor-pointer">
                                    <div className="relative w-full h-64 flex-shrink-0">
                                        <img className="w-full h-full object-cover rounded-t-[20px]" src={product.img} alt={product.title} />
                                    </div>
                                    <div className="flex flex-col items-center justify-center min-h-[120px] py-4 px-5 rounded-b-[20px] bg-red-600">
                                        <h3 className="text-white text-base font-bold font-['Inter'] uppercase text-center tracking-wide mb-4">
                                            {product.title}
                                        </h3>
                                        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
                                            {product.features.map((feature, j) => (
                                                <div key={j} className="flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                                                    <span className="text-white text-sm font-normal font-['Inter']">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Carousel prev/next buttons */}
                        <button type="button" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-12 h-12 rounded-full bg-white border-2 border-neutral-300 shadow-lg flex items-center justify-center hover:bg-neutral-50 z-10" aria-label="Previous">
                            <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-12 h-12 rounded-full bg-white border-2 border-neutral-300 shadow-lg flex items-center justify-center hover:bg-neutral-50 z-10" aria-label="Next">
                            <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    </div>
                </div>

                {/* Stone background block with VFP content */}
                <div className="w-full flex justify-center bg-stone-900 min-h-[1537px] py-16">
                    <div className="w-[1442px] max-w-full h-[1537px] bg-stone-900">
                        <div className="w-[1328px] max-w-full h-[1287px] relative mx-auto">
                            <div className="w-[1243.79px] max-w-full h-[1236.69px] left-[84.21px] top-[50.31px] absolute bg-white rounded-[50px] border-[5px] border-red-600" />
                            <div data-svg-wrapper className="left-0 top-0 absolute">
                                <svg width="750" height="101" viewBox="0 0 750 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0H642.222L749.662 100.618H0V0Z" fill="#E31E25"/>
                                </svg>
                            </div>
                            <div className="left-[50.85px] top-[29.27px] absolute text-white text-xl sm:text-2xl font-bold font-['Inter'] leading-tight whitespace-nowrap flex items-center h-10">VACUUM FORMED PLASTIC PRODUCTS</div>
                            <img className="w-[1014.38px] max-w-full h-[1065.10px] left-[203.29px] top-[161.69px] absolute object-cover" src="/Aircon Evaporator Cover.png" alt="Aircon Evaporator Cover" />
                            <img className="w-36 h-24 left-[530px] top-[8px] absolute object-contain grayscale" src="/Tpsmilogo.png" alt="TPSMI" />
                        </div>
                    </div>
                </div>

                <Footer />
        </>
    );
}

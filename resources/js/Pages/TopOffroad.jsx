import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function TopOffroad() {
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
            <Head title="TOP OFFROAD" />

            <div className="min-h-screen font-sans antialiased bg-white">
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
                                className="w-[600px] h-16 max-w-full"
                                src="TOPLOGO.PNG"
                                alt="TOP OFFROAD"
                            />
                            <p className="mt-6 text-orange-500 text-2xl font-normal leading-8">
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

                <div className="relative z-0 bg-white pt-20 pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Video Section */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-[3px] bg-gray-900 shadow-2xl group -mt-16">
                            <video
                                ref={videoRef}
                                className="h-full w-full object-cover"
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
                            <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-gray-700">
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
                </div>

                <Footer />
            </div>
        </>
    );
}

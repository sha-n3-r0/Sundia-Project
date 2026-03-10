import Header from '@/Components/Header';
import { Head, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function Siam() {
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
            <Head title="SIAM" />
            <div className="min-h-screen font-['Inter'] antialiased bg-white">
                <div className="relative min-h-[540px] sm:min-h-[620px] lg:min-h-[875px]">
                    <section
                        className="relative overflow-hidden min-h-[540px] sm:min-h-[620px] lg:min-h-[875px] bg-cover bg-center"
                        style={{ backgroundImage: "url('/siambackground.JPG')" }}
                    >
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/80 to-black/40 pointer-events-none" />

                        {/* Navbar */}
                        <Header />

                        {/* Hero content */}
                        <div
                            className="relative z-10 mr-auto flex max-w-6xl min-h-[540px] flex-col justify-center px-4 sm:px-6 lg:px-8 pt-30 sm:pt-38"
                            style={{ marginLeft: '85px' }}
                        >
                            <div className="w-[772px] h-56 relative">
                                <div className="left-0 top-[129px] absolute justify-center text-[#FF0000] text-3xl font-normal font-['Inter'] leading-9">
                                    Bringing Innovative Solutions to Life
                                </div>
                                <div className="left-0 top-[173px] absolute justify-center text-neutral-200 text-base font-normal font-['Inter'] leading-7">
                                    At Sundia Group Philippines, our core values drive us every day. We are solutions-
                                    <br />
                                    oriented, united, disciplined, have integrity, and are adaptable to change.
                                </div>
                                <div className="left-0 top-0 absolute justify-center text-white text-8xl font-extrabold font-['Inter']">
                                    SIAM
                                </div>
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-4">
                                <Link
                                    href="#"
                                    className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-8 text-base font-medium text-white shadow-md hover:from-red-500 hover:to-red-600"
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
                                    href="#"
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-medium text-black shadow-sm ring-1 ring-slate-700 hover:bg-gray-50"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="relative z-10 bg-white pt-24 pb-28">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative z-20 -mt-32 sm:-mt-40">
                            <div className="flex flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl lg:flex-row lg:h-48">
                                <div className="flex flex-col justify-center bg-red-600 p-8 text-white lg:w-52 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.09)]">
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
                                        <div className="text-2xl font-bold text-red-600">25+</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Years Experience</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold text-red-600">5</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Affiliated Companies</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold text-red-600">500+</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Team Members</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold text-red-600">1000+</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Projects Completed</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-24">
                                <div className="relative aspect-video w-full overflow-hidden rounded-[30px] bg-gray-900 shadow-2xl group">
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
                                                className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
                                            >
                                                <svg className="ml-1 h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>


                                <p className="mt-8 text-base sm:text-lg font-medium leading-7 text-gray-700">
                                    It was established in 2010 to handle the distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group. Products include automotive acccessories, adhesives, chemicals, power coating, industrial oil, diesel fuel, kraft paper underlay, plastic overlay, and other manufacturing packaging and consumables. We also provide services for generator, truck, and forklift maintenance.
                                </p>

                                <div className="mt-16 flex justify-center">
                                    <div className="w-[1406.07px] h-[680px] relative max-w-full">
                                        <div className="w-[1029px] h-[680px] left-[377.07px] top-0 absolute bg-red-600 rounded-tl-[31px] rounded-bl-[31px] shadow-[0px_4px_25px_0px_rgba(0,0,0,1.00)] shadow-[inset_0px_4px_30px_0px_rgba(0,0,0,0.25)]" />
                                        <div className="w-[866px] h-96 left-[475px] top-[126px] absolute justify-center text-white text-2xl font-normal font-['Inter'] leading-[50px] tracking-wider">
                                            It was established in 2010 to handle the distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group. Products include automotive acccessories, adhesives, chemicals, power coating, industrial oil, diesel fuel, kraft paper underlay, plastic overlay, and other manufacturing packaging and consumables. We also provide services for generator, truck, and forklift maintenance.
                                        </div>
                                        <img
                                            className="w-120 h-[612px] left-[6.16px] top-[30.07px] absolute origin-top-left rotate-[0.58deg] rounded-[50px] opacity-30"
                                            src="Rectangle.png"
                                            alt="SIAM product"
                                        />
                                        <img
                                            className="w-96 h-28 left-[22px] top-[276px] absolute"
                                            src="/siam.png"
                                            alt="SIAM branding"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

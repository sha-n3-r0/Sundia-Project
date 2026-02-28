import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head, Link } from '@inertiajs/react';

export default function TopOffroad() {
    return (
        <>
            <Head title="TOP OFFROAD" />

            <div className="min-h-screen font-sans antialiased">
                {/* Hero Section */}
                <div className="relative min-h-[80vh]">
                    <div className="absolute inset-0 -z-10">
                        <img
                            src="/TOR-hero.png?v=1"
                            alt="TOP OFFROAD"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    <Header />

                    <div className="relative z-0 mx-auto flex max-w-7xl min-h-[80vh] flex-col justify-center px-6 lg:px-8">
                        <main className="pt-28 pb-10">
                            <div className="max-w-[711px]">
                                <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-none">
                                    TOP OFFROAD
                                </h1>
                                <p className="mt-6 text-2xl font-normal leading-8 text-red-600">
                                    Outdoor & Off-Road Vehicle Accessories
                                </p>
                                <p className="mt-4 text-neutral-200 text-base font-normal leading-7">
                                    TOP Offroad Philippines is a major player in the distribution and installation of
                                    outdoor and off-road vehicle accessories. We continuously expand our product line
                                    to help our customers enjoy the outdoor experience.
                                </p>

                                <div className="mt-10 flex flex-wrap items-center gap-4">
                                    <Link
                                        href={route('home') + '#contact'}
                                        className="inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 px-8 text-base font-medium text-white shadow-md hover:from-red-500 hover:to-red-600"
                                    >
                                        <span>Learn More</span>
                                        <span className="inline-flex h-4 w-6 items-center justify-start pl-2">
                                            <span className="flex h-4 w-4 items-center justify-center overflow-hidden">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.33301 8H12.6663" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </span>
                                    </Link>
                                    <Link
                                        href={route('home') + '#contact'}
                                        className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-medium text-black shadow-sm ring-1 ring-slate-700 hover:bg-gray-50"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>

                {/* Content Section with scrolling white background */}
                <div className="relative z-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative z-20 translate-y-1/2">
                            <div className="flex flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl lg:flex-row lg:h-48">
                                <div className="flex flex-col justify-center bg-red-600 p-8 text-white lg:w-52 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.09)]">
                                    <div className="text-sm font-bold tracking-widest uppercase">
                                        <img src="/topoffroadlogo.png" alt="TOP OFFROAD" className="h-8 w-auto brightness-0 invert" />
                                    </div>
                                    <h2 className="mt-4 text-3xl font-bold leading-none tracking-tight">
                                        WHAT<br />WE<br />DO?
                                    </h2>
                                </div>

                                <div className="grid flex-1 grid-cols-2 gap-8 p-12 lg:grid-cols-4 shadow-[10.1px_13.5px_20px_0px_rgba(0,0,0,0.06)] items-center">
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold text-red-600">Outdoor</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Accessories</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold text-red-600">Off-Road</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Vehicle Solutions</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold text-red-600">Distribution</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">& Installation</div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                                        <div className="text-2xl font-bold text-red-600">Quality</div>
                                        <div className="text-[8px] font-normal uppercase tracking-wide text-gray-400">Products</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-0 bg-white pt-48 pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Spacer / optional content */}
                    </div>
                </div>

                {/* MISSION & VISION Section */}
                <div className="relative py-60 w-full overflow-hidden shadow-2xl">
                    <img
                        className="absolute inset-0 h-full w-full object-cover brightness-50"
                        src="/TOR.png?v=2"
                        alt="TOP OFFROAD Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />

                    <div className="relative z-10 flex flex-col justify-center px-6 sm:px-12 lg:px-24">
                        <div className="mb-12">
                            <img src="/topoffroadlogo.png" alt="TOP OFFROAD" className="h-24 w-auto brightness-0 invert" />
                        </div>

                        <div className="max-w-6xl">
                            <h2 className="text-white text-4xl font-black tracking-widest uppercase">MISSION</h2>
                            <p className="mt-4 text-white text-xl font-normal leading-relaxed tracking-wide">
                                To be a major player in the distribution and installation of outdoor and off-road vehicle accessories, helping our customers enjoy the outdoor experience through quality products and continuous expansion of our product line.
                            </p>

                            <h2 className="mt-16 text-white text-4xl font-black tracking-widest uppercase">VISION</h2>
                            <p className="mt-4 text-white text-xl font-normal leading-relaxed tracking-wide">
                                To be the preferred partner for outdoor and off-road vehicle accessories, known for innovation, reliability, and customer satisfaction.
                            </p>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head, Link } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function Welcome({ appName, laravelVersion, phpVersion }) {
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

    const subsidiaries = [
        {
            name: 'SD TRADING C.',
            anchorId: 'sd-trading',
            logo: '/Sundialogo.png',
            description: 'Founded in 1982 and forged an exclusive partnership with Sunstar of Japan, started supplying windshield sealers to local automotive OEMs. Other products introduced include body sealers, D/G, primers, and adhesives',
            dark: true,
            image: '/SD.JPG'
        },
        {
            name: 'SIAM DIRECT',
            anchorId: 'siam',
            logo: '/siam.png',
            description: 'Established in 2010 to handle distribution of manufacturing consumables. We also stand as the sales and marketing arm of the whole Sundia group.',
            dark: false
        },
        {
            name: 'TPMSI',
            anchorId: 'tpsm',
            logo: '/Tpsmilogo.png',
            description: 'Offer a broad range of packaging solutions to meet our customer needs and continuously improve our operations to better respond to those needs.',
            dark: true,
            image: '/Tpsmiprod.JPG'
        },
        {
            name: 'R2R',
            anchorId: 'r2r',
            logo: '/Sundialogo.png',
            description: 'A primary painting contractor of automotive, motorcycle, and electronic components that includes ED painting, powder coating, and automotive plastic painting.',
            dark: false
        },
        {
            name: 'TOP OFFROAD',
            anchorId: 'top-offroad',
            logo: '/topoffroadlogo.png',
            description: 'TOP Offroad Philippines have become a major player in the distribution and installation of outdoor and off-road vehicle accessories. We continuously expand our product line to help our customers enjoy the outdoor experience.',
            dark: true,
            image: '/ford.jpg'
        }
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

            <div id="home" className="min-h-screen font-sans antialiased">
                <div className="relative min-h-[80vh]">
                    <div className="absolute inset-0 -z-10">
                        <img
                            src="/BackgroundSundia.JPG"
                            alt="Background"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    <Header />

                    <div className="relative z-0 mx-auto flex max-w-7xl min-h-[80vh] flex-col justify-center px-6 lg:px-8">
                    <main className="pt-28 pb-10">
                        <div className="max-w-[711px]">
                            <h1 className="text-white text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-none">
                                Sundia Group Company Profile
                            </h1>
                            <p className="mt-6 text-2xl font-normal leading-8 text-red-600">
                                Bringing Innovative Solutions to Life
                            </p>
                            <p className="mt-4 text-neutral-200 text-base font-normal leading-7">
                                At Sundia Group Philippines, our core values drive us every day. We are
                                solutions-oriented, united, disciplined, have integrity, and are adaptable to
                                change.
                            </p>

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
                    </main>
                </div>

                {/* Content Section with scrolling white background */}
                <div className="relative z-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative z-20 translate-y-1/2">
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
                        </div>
                    </div>
                </div>
                </div>

                <div className="relative z-0 bg-white pt-48 pb-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Video Section */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-[3px] bg-gray-900 shadow-2xl group">
                            <video
                                ref={videoRef}
                                className="h-full w-full object-cover"
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

                        {/* History Section */}
                        <div className="mt-24 rounded-[3px]">
                            <img src="/SundiaIcon.png" alt="Sundia Logo" className="mx-auto h-16 w-auto" />
                            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-gray-700">
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
                                            <h3 className="text-white text-2xl font-bold leading-7 tracking-tight uppercase">
                                                {value.title}
                                            </h3>
                                            <p className="mt-6 text-neutral-100 text-sm font-medium leading-5 px-4 opacity-90 group-hover:opacity-100">
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
                            <h2 className="text-white text-4xl font-black tracking-widest uppercase">MISSION</h2>
                            <p className="mt-4 text-white text-xl font-normal leading-relaxed tracking-wide">
                                Commits to provide solutions to every clients&apos; need through continual improvement in every aspect of its business, efficient approach to Research and Development, and maximize use of its network while continuously expanding and building bridges among and beyond the industries it caters.
                            </p>

                            <h2 className="mt-16 text-white text-4xl font-black tracking-widest uppercase">VISION</h2>
                            <p className="mt-4 text-white text-xl font-normal leading-relaxed tracking-wide">
                                To be chosen as one of the premiere partners by our clients in each of the subsidiaries products and services for every major industry played upon.
                            </p>
                        </div>
                    </div>
                </div>

                {/* New White Section for KEY FACTORS, SOLUTION, Subsidiaries, etc. */}
                <div className="bg-white py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* KEY FACTORS Section */}
                        <div className="pb-32">
                            <h2 className="text-center text-black text-4xl font-extrabold tracking-widest uppercase mb-16">
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
                                        <h3 className="text-neutral-700 text-3xl font-black tracking-widest uppercase">INNOVATION</h3>
                                        <p className="mt-4 text-black text-lg font-normal leading-relaxed">
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
                                        <h3 className="text-neutral-700 text-3xl font-black tracking-widest uppercase">INFRASTRUCTURE</h3>
                                        <p className="mt-4 text-black text-lg font-normal leading-relaxed">
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
                                        <h3 className="text-neutral-700 text-3xl font-black tracking-widest uppercase">CREATIVITY</h3>
                                        <p className="mt-4 text-black text-lg font-normal leading-relaxed">
                                            We foster a culture of innovation and encourage employees to think outside the box, resulting in a steady stream of inventive products and solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SOLUTION Section */}
                    <div className="relative w-full py-32 overflow-hidden">
                        <img
                            src="/Uniform.jpg"
                            alt="Solution Background"
                            className="absolute inset-0 h-full w-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="text-white text-4xl font-extrabold tracking-widest uppercase mb-8">
                                SOLUTION
                            </h2>
                            <p className="text-white/90 text-lg font-normal leading-relaxed max-w-4xl">
                                We provide comprehensive solutions tailored to every client&apos;s needs. From automotive sealants and adhesives to packaging, painting services, and off-road accessories — Sundia Group delivers innovative, high-quality products backed by decades of industry expertise.
                            </p>
                        </div>
                    </div>

                    {/* Subsidiaries Grid */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 h-auto shadow-[0_8px_24px_-10px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.06)]">
                        {subsidiaries.map((sub) => (
                            <div
                                key={sub.name}
                                id={sub.anchorId}
                                className={`scroll-mt-24 relative flex flex-col items-center justify-start p-10 h-[500px] text-center group overflow-hidden shadow-[0_-4px_14px_0_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04),8px_0_12px_-4px_rgba(0,0,0,0.05),-8px_0_12px_-4px_rgba(0,0,0,0.05)] ${sub.dark ? 'text-white' : 'bg-white text-black'}`}
                            >
                                {sub.dark && (
                                    <>
                                        <div className="absolute inset-0">
                                            <img
                                                src={sub.image}
                                                alt={sub.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
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
                                    <h3 className={`text-2xl font-black tracking-wider mb-8 uppercase ${!sub.dark ? 'text-neutral-700' : 'text-white'}`}>
                                        {sub.name}
                                    </h3>
                                    <p className={`text-sm font-normal leading-relaxed tracking-wide ${sub.dark ? 'text-white/90' : 'text-neutral-600'}`}>
                                        {sub.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* MEET THE TEAM Section */}
                    <div className="mt-32 pb-12 flex flex-col items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-black text-4xl font-extrabold tracking-widest uppercase mb-16 text-left w-full">
                            MEET THE TEAM
                        </h2>

                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
                            {[
                                { name: 'MR. DANTE LAMANDO', title: 'CHAIRMAN', company: 'SUNDIA', logo: 'sundia' },
                                { name: 'MR. JEP BERNAS', title: 'PRESIDENT', company: 'TPSMI', logo: 'tpsmi' },
                                { name: 'MR. GENER DOCTORA', title: 'VICE PRESIDENT', company: 'TOP OFFROAD', logo: 'top' },
                                { name: 'MS. RHOMAY ANTONIO', title: 'ASST. PLANT MANAGER', company: 'SUNDIA', logo: 'sundia' },
                                { name: 'MR. RD ELIZONDO', title: 'MARKETING MANAGER', company: 'SUNDIA', logo: 'sundia' },
                                { name: 'MR. ROMEO AMORES, JR.', title: 'SR. ACCOUNTS OFFICER', company: 'SUNDIA', logo: 'sundia' }
                            ].map((member, index) => (
                                <div key={index} className="w-80 group">
                                    <div className="w-80 h-64 bg-zinc-300 overflow-hidden rounded-t-[3px]">
                                        <img src={`https://placehold.co/320x256`} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    </div>

                                    <div className="w-80 h-40 bg-white shadow-[6px_6px_20px_0px_rgba(0,0,0,0.08)] rounded-b-[3px] relative flex flex-col">
                                        <div className="flex items-start justify-between">
                                            <div className="w-20 h-14 bg-red-600 flex items-center justify-center rounded-br-[3px]">
                                                {member.logo === 'sundia' && (
                                                    <svg width="40" height="18" viewBox="0 0 57 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M0.680664 0H24.4875L30.4733 6.53183H6.66639V9.2752L30.4733 9.53647V16.0683H0.680664V0Z" fill="white" />
                                                        <path d="M6.25781 19.2036H30.6088L24.4871 25.9967H0L6.25781 19.2036Z" fill="white" />
                                                        <path d="M27.2079 0.130371H56.5924V25.7351H26.7998L33.0576 19.2033H50.8787V6.27029H32.7855L27.2079 0.130371Z" fill="white" />
                                                    </svg>
                                                )}
                                                {member.logo === 'tpsmi' && <img src="/Tpsmilogo.png" alt="TPSMI" className="h-6 w-auto brightness-0 invert" />}
                                                {member.logo === 'top' && <img src="/topoffroadlogo.png" alt="TOP OFFROAD" className="h-4 w-auto brightness-0 invert" />}
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
                            ))}
                        </div>
                    </div>

                </div>

                    <div className="bg-white pt-4 pb-16">
                    {/* Trusted Companies Section */}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                        <div className="text-center mb-16 w-full">
                            <h2 className="text-black text-4xl font-extrabold font-['Inter'] leading-9 mb-4 uppercase">
                                SUNDIA TRUSTED COMPANIES
                            </h2>
                            <p className="text-neutral-500 text-sm font-normal font-['Inter'] leading-5">
                                Delivering excellence through innovative solutions and dedicated expertise
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-32">
                            <img className="h-20 lg:h-24 w-auto object-contain" src="/siam.png" alt="Siam Direct" />
                            <img className="h-28 lg:h-36 w-auto object-contain" src="/Tpsmilogo.png" alt="TPSMI" />
                            <img className="h-20 lg:h-24 w-auto object-contain" src="/topoffroadlogo.png" alt="Top Offroad" />
                        </div>
                    </div>

                    {/* Get In Touch Section */}
                    <div id="contact" className="scroll-mt-24 mt-16 w-full">
                        <div className="w-full bg-red-600 py-10 mb-10">
                            <div className="max-w-[930px] mx-auto flex flex-col items-center gap-3">
                                <div className="text-center text-white text-4xl font-extrabold font-['Inter'] leading-9">
                                    Get In Touch
                                </div>
                                <div className="text-center text-white text-xs font-normal font-['Inter'] leading-5">
                                    We&apos;d love to hear from you
                                </div>
                            </div>
                        </div>

                        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {/* Address Card */}
                            <div className="bg-white flex flex-col border border-gray-200">
                                <div className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-6">
                                    <svg width="40" height="40" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M45 10C33.5 10 24 19.5 24 31C24 48 45 75 45 75C45 75 66 48 66 31C66 19.5 56.5 10 45 10ZM45 40C40 40 36 36 36 31C36 26 40 22 45 22C50 22 54 26 54 31C54 36 50 40 45 40Z" fill="#DC2626"/>
                                    </svg>
                                    <div className="mt-4 text-center text-black text-sm font-bold font-['Inter'] uppercase leading-4">Address</div>
                                    <div className="mt-2 text-center text-black text-xs font-normal font-['Inter'] leading-4">
                                        123 Business District, Metro<br/>Manila, Philippines
                                    </div>
                                </div>
                                <div className="h-12 bg-zinc-300" />
                            </div>

                            {/* Phone Card */}
                            <div className="bg-white flex flex-col border border-gray-200">
                                <div className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-6">
                                    <svg width="40" height="40" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M73.1 56.5C67.8 56.5 62.7 55.6 57.9 53.9C56.3 53.3 54.5 53.7 53.3 54.9L46.3 63.5C35.5 58.3 26.7 49.8 21.3 39L29.9 31.7C31.1 30.5 31.5 28.7 30.9 27.1C29.2 22.3 28.3 17.2 28.3 11.9C28.3 9.3 26.2 7.2 23.6 7.2H12.3C9.7 7.2 7.2 8.3 7.2 11.9C7.2 47.9 37.1 77.8 73.1 77.8C76.5 77.8 77.8 75.4 77.8 72.7V61.2C77.8 58.6 75.7 56.5 73.1 56.5Z" fill="#DC2626"/>
                                    </svg>
                                    <div className="mt-4 text-center text-black text-sm font-bold font-['Inter'] uppercase leading-4">Phone</div>
                                    <div className="mt-2 text-center text-black text-xs font-normal font-['Inter'] leading-4">
                                        123 Business District, Metro<br/>Manila, Philippines
                                    </div>
                                </div>
                                <div className="h-12 bg-zinc-300" />
                            </div>

                            {/* Email Card */}
                            <div className="bg-white flex flex-col border border-gray-200">
                                <div className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-6">
                                    <svg width="40" height="35" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M75 15H15C11.7 15 9 17.7 9 21V69C9 72.3 11.7 75 15 75H75C78.3 75 81 72.3 81 69V21C81 17.7 78.3 15 75 15ZM75 27L45 48L15 27V21L45 42L75 21V27Z" fill="#DC2626"/>
                                    </svg>
                                    <div className="mt-4 text-center text-black text-sm font-bold font-['Inter'] uppercase leading-4">Email</div>
                                    <div className="mt-2 text-center text-black text-xs font-normal font-['Inter'] leading-4">
                                        123 Business District, Metro<br/>Manila, Philippines
                                    </div>
                                </div>
                                <div className="h-12 bg-zinc-300" />
                            </div>

                            {/* Hours Card */}
                            <div className="bg-white flex flex-col border border-gray-200">
                                <div className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-6">
                                    <svg width="37" height="37" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M45 7.5C24.3 7.5 7.5 24.3 7.5 45C7.5 65.7 24.3 82.5 45 82.5C65.7 82.5 82.5 65.7 82.5 45C82.5 24.3 65.7 7.5 45 7.5ZM45 75C28.4 75 15 61.6 15 45C15 28.4 28.4 15 45 15C61.6 15 75 28.4 75 45C75 61.6 61.6 75 45 75ZM48.8 41.3L48.8 22.5H41.3V45L58.1 55.1L62.3 48.2L48.8 41.3Z" fill="#DC2626"/>
                                    </svg>
                                    <div className="mt-4 text-center text-black text-sm font-bold font-['Inter'] uppercase leading-4">Hours</div>
                                    <div className="mt-2 text-center text-black text-xs font-normal font-['Inter'] leading-4">
                                        123 Business District, Metro<br/>Manila, Philippines
                                    </div>
                                </div>
                                <div className="h-12 bg-zinc-300" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Maps Section */}
                <div className="w-full h-[450px]">
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

                <Footer />
            </div>
        </>
    );
}
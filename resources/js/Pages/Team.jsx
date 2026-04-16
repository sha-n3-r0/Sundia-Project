import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import { Head } from '@inertiajs/react';

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

export default function Team({ teamMembers }) {
    const members = teamMembers || [];

    return (
        <>
            <Head title="Meet The Team" />
            <div className="min-h-screen font-sans antialiased bg-white flex flex-col overflow-x-hidden">
                
                <div className="flex-1 relative flex flex-col w-full">
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CgkJPGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlNWU3ZWIiLz4KCQk8L3N2Zz4=')] opacity-70 pointer-events-none" />
                    <div className="pointer-events-none absolute left-[-10%] top-[10%] h-96 w-96 rounded-full bg-red-600/20 blur-[100px]" aria-hidden="true" />
                    <div className="pointer-events-none absolute right-[-5%] top-[40%] h-[30rem] w-[30rem] rounded-full bg-red-500/15 blur-[120px]" aria-hidden="true" />
                    <div className="pointer-events-none absolute left-[20%] bottom-[-10%] h-[25rem] w-[25rem] rounded-full bg-red-700/15 blur-[100px]" aria-hidden="true" />

                    <div className="relative z-20 pt-28 sm:pt-32 w-full">
                        <Header />
                    </div>

                    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-6 relative z-10">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <span className="text-red-600 font-bold tracking-widest text-xs sm:text-sm uppercase mb-3 block">
                            The Faces Behind Sundia Group
                        </span>
                        <h1 className="text-black text-4xl sm:text-5xl font-['Inter'] font-black tracking-widest uppercase mb-6 drop-shadow-sm">
                            MEET THE <span className="text-red-600">ENTIRE TEAM</span>
                        </h1>
                        <div className="flex justify-center items-center gap-4">
                            <div className="h-[2px] w-12 sm:w-20 bg-gray-200"></div>
                            <div className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]"></div>
                            <div className="h-[2px] w-12 sm:w-20 bg-gray-200"></div>
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
                        {members.map((member, index) => {
                            const logoKey = member.company_logo ?? member.logo;
                            return (
                                <div key={member.id ?? member.name ?? index} className="w-80 group">
                                    <div className="w-80 h-64 bg-zinc-300 overflow-hidden rounded-t-[3px] relative">
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
                </main>
                </div>

                <Footer />
            </div>
        </>
    );
}

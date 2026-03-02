import { Link, usePage } from '@inertiajs/react';

export default function Header() {
    const { url, props } = usePage();
    const auth = props.auth;
    const isTopOffroadPage = route().current('top-offroad');
    const navBarColor = isTopOffroadPage ? '#FF6E00' : '#FF0000';

    const navLinks = [
        { 
            href: route('home'), 
            label: 'Home',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3 11V2C3 1.73478 3.10536 1.48043 3.29289 1.29289C3.48043 1.10536 3.73478 1 4 1H8C8.26522 1 8.51957 1.10536 8.70711 1.29289C8.89464 1.48043 9 1.73478 9 2V11H3Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3 6H2C1.73478 6 1.48043 6.10536 1.29289 6.29289C1.10536 6.48043 1 6.73478 1 7V10C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H3"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9 4.5H10C10.2652 4.5 10.5196 4.60536 10.7071 4.79289C10.8946 4.98043 11 5.23478 11 5.5V10C11 10.2652 10.8946 10.5196 10.7071 10.7071C10.5196 10.8946 10.2652 11 10 11H9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 3H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 5H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 7H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5 9H7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
        { 
            href: route('siam'), 
            label: 'SIAM',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 10C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V4L7.5 6.5V4L4 6.5V2C4 1.73478 3.89464 1.48043 3.70711 1.29289C3.51957 1.10536 3.26522 1 3 1H2C1.73478 1 1.48043 1.10536 1.29289 1.29289C1.10536 1.48043 1 1.73478 1 2V10Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.5 9H9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 9H6.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.5 9H4"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
        { 
            href: route('tpsmi'), 
            label: 'TPSMI',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 2H3C2.44772 2 2 2.44772 2 3V9C2 9.55228 2.44772 10 3 10H9C9.55228 10 10 9.55228 10 9V3C10 2.44772 9.55228 2 9 2Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7 4.5H5C4.72386 4.5 4.5 4.72386 4.5 5V7C4.5 7.27614 4.72386 7.5 5 7.5H7C7.27614 7.5 7.5 7.27614 7.5 7V5C7.5 4.72386 7.27614 4.5 7 4.5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M7.5 1V2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.5 10V11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 7.5H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 4.5H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 7.5H11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 4.5H11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 1V2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.5 10V11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        { 
            href: route('top-offroad'), 
            label: 'TOP OFFROAD',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.5 8.5H10.5C10.8 8.5 11 8.3 11 8V6.5C11 6.05 10.65 5.65 10.25 5.55C9.35 5.3 8 5 8 5C8 5 7.35 4.3 6.9 3.85C6.65 3.65 6.35 3.5 6 3.5H2.5C2.2 3.5 1.95 3.7 1.8 3.95L1.1 5.4C1.03379 5.59311 1 5.79585 1 6V8C1 8.3 1.2 8.5 1.5 8.5H2.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M3.5 9.5C4.05228 9.5 4.5 9.05228 4.5 8.5C4.5 7.94772 4.05228 7.5 3.5 7.5C2.94772 7.5 2.5 7.94772 2.5 8.5C2.5 9.05228 2.94772 9.5 3.5 9.5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M4.5 8.5H7.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.5 9.5C9.05228 9.5 9.5 9.05228 9.5 8.5C9.5 7.94772 9.05228 7.5 8.5 7.5C7.94772 7.5 7.5 7.94772 7.5 8.5C7.5 9.05228 7.94772 9.5 8.5 9.5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
        {
            href: '#careers',
            label: 'CAREERS',
            icon: (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 3.5H2C1.44772 3.5 1 3.94772 1 4.5V10C1 10.5523 1.44772 11 2 11H10C10.5523 11 11 10.5523 11 10V4.5C11 3.94772 10.5523 3.5 10 3.5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 3.5V2.5C8 2.23478 7.89464 1.98043 7.70711 1.79289C7.51957 1.60536 7.26522 1.5 7 1.5H5C4.73478 1.5 4.48043 1.60536 4.29289 1.79289C4.10536 1.98043 4 2.23478 4 2.5V3.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 7C6.55228 7 7 6.55228 7 6C7 5.44772 6.55228 5 6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
    ];

    return (
        <header className="relative z-50">
            {/* Top Logo Bar */}
            <div className="bg-[linear-gradient(to_right,_rgb(163,163,163)_0%,_rgb(209,213,219)_18%,_white_26%,_white_100%)] border-b border-gray-200">
                <div className="mx-auto flex max-w-7xl items-center px-6 py-2">
                    <Link href="/">
                        <img 
                            src="/Sundialogo.png" 
                            alt="Sundia Logo" 
                            className="h-16 w-auto"
                        />
                    </Link>
                </div>
            </div>

            {/* Red Navigation Bar with Curved Left Edge */}
            <div className="absolute right-0 top-11 w-full flex justify-end pointer-events-none">
                <div
                    className="relative w-[82%] h-[73px] pointer-events-auto"
                >
                    {/* SVG background that draws the slanted red bar with curved left edge */}
                    <svg
                        className="absolute inset-0 h-full w-full"
                        viewBox="0 0 1171 82"
                        preserveAspectRatio="none"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M60.2824 0.595664C60.4442 0.230656 60.8026 0 61.2019 0H1169.54C1170.1 0 1170.54 0.447715 1170.54 1V81C1170.54 81.5523 1170.1 82 1169.54 82H1.01415C0.115465 82 -0.34191 80.9141 0.298992 80.2841C5.92651 74.7525 23.8345 56.9164 35.5439 42.5974C48.3201 26.974 58.5425 4.5188 60.2824 0.595664Z"
                            fill={navBarColor}
                        />
                    </svg>

                    {/* Nav content on top of the shape */}
                    <div className="relative z-10 flex h-full items-center justify-end pr-12">
                        <nav className="flex items-center gap-6 font-sans">
                            {navLinks.map(({ href, label, icon }) => {
                                const isHomeLink = href === route('home');
                                const isActive =
                                    href === route('home')
                                        ? url === '/'
                                        : url.startsWith(href);

                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={
                                            'flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ' +
                                            (isActive
                                                ? 'text-white bg-white/15 rounded-full shadow-sm'
                                                : 'text-white/90 hover:text-white hover:bg-white/10 rounded-full')
                                        }
                                    >
                                        {icon}
                                        {label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
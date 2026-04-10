import { useState } from 'react';

export default function FloatingChatIcon() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredCompany, setHoveredCompany] = useState(null);

    const isTopOffroadPage = route().current('top-offroad');
    const chatColor = isTopOffroadPage ? '#FF6E00' : '#FF0000';

    const companies = [
        {
            name: 'SUNDIA GROUP',
            tooltip: 'Job vacancies and other related topic about hiring',
            link: 'https://www.facebook.com/profile.php?id=100071172685471',
        },
        {
            name: 'SIAM DIRECT TRADING CORP.',
            link: 'https://www.facebook.com/search/top?q=SIAM%20DIRECT%20TRADING%20CORP.',
        },
        {
            name: 'TOTAL PACKAGING SOLUTIONS MFG.',
            link: 'https://www.facebook.com/search/top?q=TOTAL%20PACKAGING%20SOLUTIONS%20MFG.',
        },
        {
            name: 'TOP OFFROAD PHILIPPINES',
            link: 'https://www.facebook.com/search/top?q=TOP%20OFFROAD%20PHILIPPINES',
        },
    ];

    return (
        <div
            className={
                'pointer-events-none fixed z-50 flex flex-col items-end gap-3 ' +
                'bottom-6 left-4 right-4 w-auto ' +
                'sm:left-auto sm:right-6 sm:w-auto sm:flex-row sm:items-end sm:gap-0'
            }
        >
            {/* Modal — full width within side insets on mobile; fixed width on sm+ */}
            {isOpen && (
                <div
                    className="pointer-events-auto w-full max-w-[min(380px,calc(100vw-2rem))] shrink-0 overflow-hidden rounded-[24px] p-2.5 shadow-2xl transition-all duration-300 ease-in-out sm:mr-4 sm:max-w-[380px] sm:rounded-[30px] sm:p-3"
                    style={{ backgroundColor: chatColor }}
                >
                    <div className="px-2 py-2 sm:px-3">
                        <h2 className="text-[13px] font-bold leading-snug text-white sm:text-[15px] sm:leading-tight">
                            Hi! Thank you for contacting us. We&apos;re here to provide solutions.
                        </h2>
                    </div>

                    <div className="rounded-[20px] bg-white p-3 sm:rounded-[25px] sm:p-5">
                        <p className="mb-3 text-[13px] font-medium text-gray-800 sm:text-[14px]">
                            Please Choose company for specific inquiries.
                        </p>

                        <div className="rounded-[16px] bg-[#D9D9D9] p-3 sm:rounded-[20px] sm:p-4">
                            <p className="mb-3 text-[14px] font-normal text-gray-700 sm:text-[16px]">
                                Active Social Media
                            </p>

                            <div className="space-y-2">
                                {companies.map((company, index) => (
                                    <div key={index} className="group relative">
                                        <button
                                            type="button"
                                            onClick={() => window.open(company.link, '_blank')}
                                            className="flex w-full items-center justify-between gap-2 rounded-full border border-gray-100 bg-white px-3 py-2 text-left text-[10px] font-extrabold uppercase tracking-wider text-black shadow-sm transition-all hover:scale-[1.01] hover:bg-gray-50 active:scale-[0.99] sm:px-5 sm:py-2.5 sm:text-[12px] sm:hover:scale-[1.02]"
                                        >
                                            <span className="min-w-0 flex-1 break-words leading-snug">
                                                {company.name}
                                            </span>
                                            <div
                                                className="shrink-0 cursor-pointer"
                                                role="presentation"
                                                onMouseEnter={() => setHoveredCompany(company.name)}
                                                onMouseLeave={() => setHoveredCompany(null)}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <svg
                                                    className="h-4 w-4 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m0 5h.01"
                                                    />
                                                </svg>
                                            </div>
                                        </button>

                                        {company.tooltip && hoveredCompany === company.name && (
                                            <div className="relative z-[60] mt-2 w-full rounded-2xl bg-[#222222] p-3 text-[11px] leading-snug text-white shadow-2xl sm:absolute sm:mt-0 sm:-top-[85px] sm:right-[-10px] sm:w-[260px]">
                                                <div className="mb-1 font-semibold text-gray-100">Sundia Group</div>
                                                <div className="text-gray-300">
                                                    Job vacancies and other related topic
                                                    <br />
                                                    about hiring
                                                </div>
                                                <div className="absolute bottom-[-8px] right-10 hidden h-3 w-3 rotate-45 bg-[#222222] sm:block" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="mt-3 text-[13px] font-medium italic text-gray-900 sm:mt-4 sm:text-[14px]">
                            (you will be directed to the link)
                        </p>
                    </div>
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
                style={{ backgroundColor: chatColor }}
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white sm:h-11 sm:w-11">
                    <svg
                        className="h-5 w-5 text-white sm:h-6 sm:w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            </button>
        </div>
    );
}

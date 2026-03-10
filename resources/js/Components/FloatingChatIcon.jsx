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
            link: 'https://www.facebook.com/profile.php?id=100071172685471'
        },
        { 
            name: 'SIAM DIRECT TRADING CORP.',
            link: 'https://www.facebook.com/search/top?q=SIAM%20DIRECT%20TRADING%20CORP.'
        },
        { 
            name: 'TOTAL PACKAGING SOLUTIONS MFG.',
            link: 'https://www.facebook.com/search/top?q=TOTAL%20PACKAGING%20SOLUTIONS%20MFG.'
        },
        { 
            name: 'TOP OFFROAD PHILIPPINES',
            link: 'https://www.facebook.com/search/top?q=TOP%20OFFROAD%20PHILIPPINES'
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center">
            {/* Modal */}
            {isOpen && (
                <div
                    className="mr-4 w-[340px] sm:w-[380px] rounded-[30px] p-3 shadow-2xl transition-all duration-300 ease-in-out"
                    style={{ backgroundColor: chatColor }}
                >
                    {/* Header */}
                    <div className="px-3 py-2">
                        <h2 className="text-white text-[15px] font-bold leading-tight">
                            Hi! Thank you for contacting us. We're here to provide solutions.
                        </h2>
                    </div>

                    {/* Inner White Container */}
                    <div className="bg-white rounded-[25px] p-5">
                        <p className="text-gray-800 text-[14px] font-medium mb-3">
                            Please Choose company for specific inquiries.
                        </p>

                        <div className="bg-[#D9D9D9] rounded-[20px] p-4">
                            <p className="text-gray-700 text-[16px] font-normal mb-3">
                                Active Social Media
                            </p>

                            <div className="space-y-2">
                                {companies.map((company, index) => (
                                    <div 
                                        key={index}
                                        className="relative group"
                                    >
                                        <button 
                                            onClick={() => window.open(company.link, '_blank')}
                                            className="w-full bg-white hover:bg-gray-50 text-black font-extrabold py-2.5 px-5 rounded-full text-left text-[12px] flex items-center justify-between shadow-sm transition-all uppercase tracking-wider border border-gray-100 cursor-pointer hover:scale-[1.02] active:scale-95"
                                        >
                                            {company.name}
                                            <div 
                                                className="cursor-pointer ml-2"
                                                onMouseEnter={() => setHoveredCompany(company.name)}
                                                onMouseLeave={() => setHoveredCompany(null)}
                                            >
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m0 5h.01" />
                                                </svg>
                                            </div>
                                        </button>

                                        {/* Tooltip for Sundia Group */}
                                        {company.tooltip && hoveredCompany === company.name && (
                                            <div className="absolute right-[-10px] top-[-85px] z-50 w-[260px] bg-[#222222] text-white p-3.5 rounded-2xl shadow-2xl text-[12px] leading-snug">
                                                <div className="font-semibold text-gray-100 mb-1">Sundia Group</div>
                                                <div className="text-gray-300">
                                                    Job vacancies and other related topic<br />
                                                    about hiring
                                                </div>
                                                <div className="absolute bottom-[-8px] right-10 w-3 h-3 bg-[#222222] rotate-45"></div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-gray-900 text-[14px] mt-4 font-medium italic">
                            (you will be directed to the link)
                        </p>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group shrink-0"
                style={{ backgroundColor: chatColor }}
            >
                <div className="w-11 h-11 rounded-full border-[3px] border-white flex items-center justify-center">
                    <svg 
                        className="w-6 h-6 text-white" 
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

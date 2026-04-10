import { Link } from '@inertiajs/react';

const jobs = [
    {
        title: 'Production Operator',
        type: 'Full-time',
        location: 'Santa Rosa, Laguna',
        summary:
            'Support daily production operations to ensure quality, safety, and on-time delivery.',
        bullets: ['Follow SOP and safety procedures', 'Perform basic machine operation', 'Maintain clean and organized work areas'],
        icon: (
            <svg width="28" height="28" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20 35C20 28.3726 25.3726 23 32 23H58C64.6274 23 70 28.3726 70 35V65C70 71.6274 64.6274 77 58 77H32C25.3726 77 20 71.6274 20 65V35Z"
                    fill="#DC2626"
                />
                <path
                    d="M28 37C28 32.5817 31.5817 29 36 29H54C58.4183 29 62 32.5817 62 37V63C62 67.4183 58.4183 71 54 71H36C31.5817 71 28 67.4183 28 63V37Z"
                    fill="white"
                    opacity="0.25"
                />
                <path
                    d="M32 49H58"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
                <path
                    d="M32 58H46"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                />
            </svg>
        ),
    },
    {
        title: 'Quality Assurance Officer',
        type: 'Full-time',
        location: 'Santa Rosa, Laguna',
        summary:
            'Monitor product quality and compliance through inspections, documentation, and continuous improvement.',
        bullets: ['Conduct incoming and in-process checks', 'Support corrective and preventive actions', 'Maintain quality records'],
        icon: (
            <svg width="28" height="28" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M45 10C32.5 10 22.5 20 22.5 32.5C22.5 49.2 45 80 45 80C45 80 67.5 49.2 67.5 32.5C67.5 20 57.5 10 45 10Z"
                    fill="#DC2626"
                />
                <path
                    d="M35 34L43 42L56 29"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22.5 32.5C22.5 49.2 45 80 45 80"
                    stroke="white"
                    strokeWidth="3"
                    opacity="0.35"
                />
            </svg>
        ),
    },
    {
        title: 'Sales Representative',
        type: 'Full-time',
        location: 'Metro Manila',
        summary:
            'Build customer relationships, promote Sundia products, and help achieve sales targets.',
        bullets: ['Identify customer needs and opportunities', 'Prepare proposals and quotations', 'Coordinate with operations for fulfillment'],
        icon: (
            <svg width="28" height="28" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18 30C18 23.3726 23.3726 18 30 18H60C66.6274 18 72 23.3726 72 30V60C72 66.6274 66.6274 72 60 72H30C23.3726 72 18 66.6274 18 60V30Z"
                    fill="#DC2626"
                />
                <path
                    d="M26 46L40 33L55 48L64 39"
                    stroke="white"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M26 62H64"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.7"
                />
            </svg>
        ),
    },
    {
        title: 'Maintenance Technician',
        type: 'Full-time',
        location: 'Santa Rosa, Laguna',
        summary:
            'Ensure equipment readiness through preventive maintenance, troubleshooting, and timely repairs.',
        bullets: ['Perform preventive maintenance schedules', 'Troubleshoot equipment and utilities', 'Coordinate repairs to minimize downtime'],
        icon: (
            <svg width="28" height="28" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M45 20C32 20 22 30 22 43C22 56 32 66 45 66C58 66 68 56 68 43C68 30 58 20 45 20Z"
                    fill="#DC2626"
                />
                <path
                    d="M45 29V43L55 50"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20 43H22.5"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.5"
                />
                <path
                    d="M67.5 43H70"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.5"
                />
            </svg>
        ),
    },
];

export default function Careers() {
    return (
        <section
            id="careers"
            className="scroll-mt-[140px] bg-white pt-16 pb-10"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-black text-section font-['Inter'] mb-4 uppercase tracking-widest">
                        CAREERS
                    </h2>
                    <p className="text-neutral-500 text-body font-['Inter'] max-w-3xl mx-auto">
                        At Sundia Group, we believe that strong teams build strong products. We are always
                        looking for talented people who value quality, safety, and continuous improvement.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job.title}
                            className="bg-neutral-100 rounded-[3px] shadow-lg overflow-hidden"
                        >
                            <div className="h-2 w-full bg-red-600" />
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-neutral-700 text-subtitle font-['Inter'] uppercase tracking-widest">
                                            {job.title}
                                        </h3>
                                        <p className="mt-2 text-neutral-500 text-body text-sm font-['Inter']">
                                            {job.type} • {job.location}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-red-600 rounded-[3px] flex items-center justify-center text-white flex-shrink-0">
                                        {job.icon}
                                    </div>
                                </div>

                                <p className="mt-4 text-black text-body-lg text-sm font-['Inter']">
                                    {job.summary}
                                </p>

                                <ul className="mt-4 space-y-2 text-neutral-700 text-[13px] font-['Inter']">
                                    {job.bullets.map((b) => (
                                        <li key={b} className="flex items-start gap-2">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-600 flex-shrink-0" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-5">
                                    <Link
                                        href="#contact"
                                        className="inline-flex items-center justify-center w-full h-11 rounded-full bg-red-600 text-white text-sm font-semibold font-['Inter'] shadow-md hover:bg-red-500"
                                    >
                                        Apply
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


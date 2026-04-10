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

function renderLogo(logoKey, companyLabel) {
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
                alt={companyLabel || 'Top Offroad'}
                className="h-4 w-auto brightness-0 invert"
            />
        );
    }
    return (
        <div className="text-[9px] font-semibold tracking-widest text-white/90">
            LOGO
        </div>
    );
}

export default function TeamMemberCardPreview({
    member,
    mode = 'admin',
    onEdit,
}) {
    const imageSrc =
        member?.local_profile_preview_url ||
        member?.profile_image_path ||
        'https://placehold.co/320x256';

    const isActive = member?.is_active ?? true;

    return (
        <div className={`w-80 group ${!isActive ? 'opacity-60' : ''}`}>
            <div className="w-80 h-64 bg-zinc-300 overflow-hidden rounded-t-[3px] relative">
                <img
                    src={imageSrc}
                    alt={member?.name || 'Team member'}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!isActive && (
                    <div className="absolute inset-0 bg-white/30 flex items-center justify-center">
                        <div className="rounded-full bg-gray-900/80 px-3 py-1 text-xs font-semibold text-white">
                            Inactive
                        </div>
                    </div>
                )}
            </div>

            <div className="w-80 h-40 bg-white shadow-[6px_6px_20px_0px_rgba(0,0,0,0.08)] rounded-b-[3px] relative flex flex-col">
                <div className="flex items-start justify-between">
                    <div className="w-20 h-14 bg-red-600 flex items-center justify-center rounded-br-[3px]">
                        {renderLogo(member?.company_logo, member?.company)}
                    </div>
                    <div className="pt-4 pr-5 text-neutral-400 text-[10px] font-semibold tracking-widest uppercase">
                        {member?.company || '—'}
                    </div>
                </div>

                <div className="px-5 pb-6 mt-auto">
                    <h3 className="text-neutral-800 text-lg font-extrabold tracking-wide uppercase leading-none">
                        {member?.name || '—'}
                    </h3>
                    <p className="mt-1 text-neutral-400 text-[11px] font-medium tracking-widest uppercase">
                        {member?.title || '—'}
                    </p>
                </div>

                {mode === 'admin' && member?.id && typeof onEdit === 'function' && (
                    <div className="absolute right-3 top-3 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => onEdit(member)}
                            className="rounded-md bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 ring-1 ring-gray-200 hover:bg-white"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


import NavLink from '@/Components/NavLink';
import ProfileModal from '@/Components/ProfileModal';
import { useRef } from 'react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AuthenticatedLayout({ header, children, showNavigation = true }) {
    const user = usePage().props.auth.user;
    const { mustVerifyEmail, status } = usePage().props;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const profileButtonRef = useRef(null);
    const [showLogoutLoading, setShowLogoutLoading] = useState(false);

    useEffect(() => {
        const showLogout = () => setShowLogoutLoading(true);
        window.addEventListener('sundia-logout-loading', showLogout);
        return () => window.removeEventListener('sundia-logout-loading', showLogout);
    }, []);

    return (
        <div className="min-h-screen">
            {showNavigation && (
                <nav className="border-b border-gray-100 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex">
                                <div className="hidden space-x-8 sm:-my-px sm:flex">
                                    {user?.is_admin && (
                                        <NavLink
                                            href={route('admin.dashboard')}
                                            active={route().current('admin.dashboard')}
                                        >
                                            Admin
                                        </NavLink>
                                    )}
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? 'inline-flex'
                                                    : 'hidden'
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? 'block' : 'hidden') +
                            ' sm:hidden'
                        }
                    >
                        <div className="space-y-1 pb-3 pt-2">
                            {user?.is_admin && (
                                <ResponsiveNavLink
                                    href={route('admin.dashboard')}
                                    active={route().current('admin.dashboard')}
                                >
                                    Admin
                                </ResponsiveNavLink>
                            )}
                        </div>

                        <div className="border-t border-gray-200 pb-1 pt-4">
                            <div className="px-4">
                                <div className="text-base font-medium text-gray-800">
                                    {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                    {user.email}
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <button
                                    type="button"
                                    ref={profileButtonRef}
                                    onClick={() => {
                                        setShowProfileModal(true);
                                        setShowingNavigationDropdown(false);
                                    }}
                                    className="flex w-full items-start border-l-4 border-transparent py-2 pe-4 ps-3 text-base font-medium text-gray-600 transition duration-150 ease-in-out hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800 focus:outline-none"
                                >
                                    Profile
                                </button>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                    onClick={() => window.dispatchEvent(new Event('sundia-logout-loading'))}
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            )}

            {showLogoutLoading && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-6">
                    <div className="flex flex-col items-center gap-4 rounded-[28px] border border-white/10 bg-white/95 px-8 py-10 shadow-2xl backdrop-blur-xl">
                        <img
                            src="/Slogo.png"
                            alt="Sundia Logo"
                            className="h-20 w-20 animate-spin rounded-full border-4 border-red-600/20 bg-white p-2"
                        />
                        <div className="text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-600">
                                Logging Out
                            </p>
                            <p className="mt-2 text-xs text-neutral-600">
                                Please wait while we sign you out.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <ProfileModal
                show={showProfileModal}
                onClose={() => {
                    setShowProfileModal(false);
                    // Return focus to trigger button after modal closes
                    if (profileButtonRef.current) {
                        setTimeout(() => profileButtonRef.current.focus(), 0);
                    }
                }}
                mustVerifyEmail={mustVerifyEmail}
                status={status}
                anchorRef={profileButtonRef}
            />

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

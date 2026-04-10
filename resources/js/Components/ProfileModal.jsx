import Modal from '@/Components/Modal';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import { useEffect, useMemo, useState } from 'react';

export default function ProfileModal({
    show,
    onClose,
    mustVerifyEmail,
    status,
    anchorRef,
}) {
    const [panelStyle, setPanelStyle] = useState(undefined);

    const anchored = !!anchorRef?.current;

    const containerClassName = useMemo(() => {
        if (!anchored) return '';
        return 'fixed inset-0 z-50';
    }, [anchored]);

    useEffect(() => {
        if (!show || !anchored) return;

        const compute = () => {
            const el = anchorRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();

            const gap = 10;
            const desiredWidth = 420;
            const maxWidth = Math.min(desiredWidth, window.innerWidth - 24);
                const heightPadding = 12;
                const maxPanelHeight = Math.min(560, window.innerHeight - 24);

            // Prefer to the right of the button; fallback to the left.
            const fitsRight = rect.right + gap + maxWidth <= window.innerWidth - 8;
            const left = fitsRight
                ? rect.right + gap
                : Math.max(8, rect.left - gap - maxWidth);

                // Place beside button; flip upward if near bottom.
                const spaceBelow = window.innerHeight - rect.bottom;
                const spaceAbove = rect.top;
                const canFitBelow = spaceBelow >= Math.min(220, maxPanelHeight * 0.6);
                const canFitAbove = spaceAbove >= Math.min(220, maxPanelHeight * 0.6);

                let top;
                if (canFitBelow || (!canFitAbove && spaceBelow >= spaceAbove)) {
                    // Below, aligned to top of button.
                    top = rect.top - 6;
                } else {
                    // Above, aligned to bottom of button (with estimated panel height).
                    top = rect.bottom - maxPanelHeight + 6;
                }

                // Clamp inside viewport.
                top = Math.min(
                    Math.max(8, top),
                    Math.max(8, window.innerHeight - maxPanelHeight - heightPadding),
                );

            setPanelStyle({
                position: 'fixed',
                left,
                top,
                width: maxWidth,
                margin: 0,
            });
        };

        compute();
        window.addEventListener('resize', compute);
        window.addEventListener('scroll', compute, true);

        return () => {
            window.removeEventListener('resize', compute);
            window.removeEventListener('scroll', compute, true);
        };
    }, [show, anchored, anchorRef]);

    return (
        <Modal
            show={show}
            onClose={onClose}
            maxWidth={anchored ? 'sm' : 'lg'}
            containerClassName={containerClassName}
            panelStyle={panelStyle}
            panelClassName={
                anchored
                    ? 'max-h-[min(560px,calc(100vh-1.5rem))] rounded-xl ring-1 ring-neutral-900'
                    : ''
            }
        >
            <div className="bg-neutral-950 text-neutral-100">
                <div className="flex items-start justify-between gap-3 border-b border-neutral-800/80 px-4 py-4 sm:px-5">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-100">
                            Account
                        </h2>
                        <p className="mt-1 text-[11px] leading-5 text-neutral-400">
                            Profile, password, and account controls
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-300 transition hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-neutral-950"
                        aria-label="Close"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <div className="divide-y divide-neutral-800/80">
                    <div className="px-4 py-5 sm:px-5">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-none"
                        />
                    </div>

                    <div className="px-4 py-5 sm:px-5">
                        <UpdatePasswordForm className="max-w-none" />
                    </div>

                    <div className="px-4 py-5 sm:px-5">
                        <DeleteUserForm className="max-w-none" />
                    </div>
                </div>
            </div>
        </Modal>
    );
}


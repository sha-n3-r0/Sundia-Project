import Modal from '@/Components/Modal';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import { useEffect, useState } from 'react';

export default function ProfileModal({
    show,
    onClose,
    mustVerifyEmail,
    status,
    anchorRef,
}) {
    const [isCentered, setIsCentered] = useState(true);

    useEffect(() => {
        // If a future page still passes an anchorRef, we intentionally ignore it:
        // the Profile dialog should always open centered for consistent UX.
        setIsCentered(true);
    }, [show, anchorRef]);

    return (
        <Modal
            show={show}
            onClose={onClose}
            maxWidth={isCentered ? '4xl' : 'lg'}
            panelClassName="overflow-hidden rounded-2xl"
        >
            <div
                className="bg-white text-neutral-900 dark:bg-white dark:text-neutral-900
                [&_label]:text-neutral-700 dark:[&_label]:text-neutral-700
                [&_h2]:text-neutral-900 dark:[&_h2]:text-neutral-900
                [&_p]:text-neutral-600 dark:[&_p]:text-neutral-600
                [&_input]:border-neutral-300 [&_input]:bg-white [&_input]:text-neutral-900 [&_input]:placeholder:text-neutral-400
                dark:[&_input]:border-neutral-300 dark:[&_input]:bg-white dark:[&_input]:text-neutral-900 dark:[&_input]:placeholder:text-neutral-400
                [&_input]:focus:border-red-600 [&_input]:focus:ring-red-600
                dark:[&_input]:focus:border-red-600 dark:[&_input]:focus:ring-red-600
                [&_textarea]:border-neutral-300 [&_textarea]:bg-white [&_textarea]:text-neutral-900 [&_textarea]:placeholder:text-neutral-400
                dark:[&_textarea]:border-neutral-300 dark:[&_textarea]:bg-white dark:[&_textarea]:text-neutral-900 dark:[&_textarea]:placeholder:text-neutral-400
                [&_textarea]:focus:border-red-600 [&_textarea]:focus:ring-red-600
                dark:[&_textarea]:focus:border-red-600 dark:[&_textarea]:focus:ring-red-600
                [&_select]:border-neutral-300 [&_select]:bg-white [&_select]:text-neutral-900
                dark:[&_select]:border-neutral-300 dark:[&_select]:bg-white dark:[&_select]:text-neutral-900
                [&_select]:focus:border-red-600 [&_select]:focus:ring-red-600
                dark:[&_select]:focus:border-red-600 dark:[&_select]:focus:ring-red-600"
            >
                <div className="flex items-start justify-between gap-3 bg-gradient-to-r from-red-600 to-red-700 px-5 py-4 sm:px-6">
                    <div>
                        <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-white">
                            Account
                        </h2>
                        <p className="mt-1 text-[11px] leading-5 text-red-100">
                            Profile, password, and account controls
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white/90 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-red-700"
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

                <div className="divide-y divide-neutral-200 bg-neutral-50">
                    <div className="px-5 py-6 sm:px-6">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-none"
                        />
                    </div>

                    <div className="px-5 py-6 sm:px-6">
                        <UpdatePasswordForm className="max-w-none" />
                    </div>

                    <div className="px-5 py-6 sm:px-6">
                        <DeleteUserForm className="max-w-none" />
                    </div>
                </div>
            </div>
        </Modal>
    );
}


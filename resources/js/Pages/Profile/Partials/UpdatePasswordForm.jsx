import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { router, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [showSuccessPrompt, setShowSuccessPrompt] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const passwordChecks = {
        minLength: data.password.length >= 8,
        uppercase: /[A-Z]/.test(data.password),
        number: /\d/.test(data.password),
        symbol: /[^A-Za-z0-9]/.test(data.password),
    };
    const hasTypedNewPassword = data.password.length > 0;
    const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowSuccessPrompt(true);
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-neutral-100">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-300">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="New Password" />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />

                    {hasTypedNewPassword && !isPasswordStrong && (
                        <div className="mt-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                                Password must include at least:
                            </p>
                            <ul className="mt-1 space-y-1 text-[11px] text-amber-900">
                                <li>{passwordChecks.minLength ? '✓' : '•'} 8 characters</li>
                                <li>{passwordChecks.uppercase ? '✓' : '•'} 1 uppercase letter</li>
                                <li>{passwordChecks.number ? '✓' : '•'} 1 number</li>
                                <li>{passwordChecks.symbol ? '✓' : '•'} 1 symbol</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-neutral-300">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>

            {showSuccessPrompt && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-6">
                    <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-[28px] border border-white/10 bg-white/95 px-8 py-10 text-center shadow-2xl backdrop-blur-xl">
                        <img
                            src="/Slogo.png"
                            alt="Sundia Logo"
                            className="h-20 w-20 rounded-full border-4 border-red-600/20 bg-white p-2"
                        />
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-600">
                                Password Updated
                            </p>
                            <p className="mt-2 text-xs text-neutral-600">
                                Your password was updated successfully. Choose what you want to do next.
                            </p>
                        </div>
                        <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => setShowSuccessPrompt(false)}
                                className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-700 transition-colors hover:bg-neutral-100"
                            >
                                Stay Logged In
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowSuccessPrompt(false);
                                    window.dispatchEvent(new Event('sundia-logout-loading'));
                                    router.post(route('logout'));
                                }}
                                className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-red-700"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

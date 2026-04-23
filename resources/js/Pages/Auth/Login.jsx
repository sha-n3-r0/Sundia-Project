import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                    Welcome back
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm text-gray-500">
                    Sign in to access your dashboard and keep your content up to date.
                </p>
            </div>

            {status && (
                <div className="mx-auto mt-6 max-w-md rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 shadow-sm">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="mt-8 space-y-6">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="flex items-center justify-between rounded-3xl border border-gray-200 bg-gray-50 p-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-gray-600 underline transition hover:text-gray-900"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <PrimaryButton className="w-full max-w-[220px] justify-center rounded-[9999px]" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}

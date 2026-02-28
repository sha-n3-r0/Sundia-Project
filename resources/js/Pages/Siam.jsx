import Header from '@/Components/Header';
import { Head } from '@inertiajs/react';

export default function Siam() {
    return (
        <>
            <Head title="SIAM" />
            <div className="min-h-screen">
                <Header />
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            SIAM
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Welcome to the SIAM page.
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}

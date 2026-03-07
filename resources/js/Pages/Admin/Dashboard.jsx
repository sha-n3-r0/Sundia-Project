import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function AdminDashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="space-y-2 p-6 text-gray-900">
                            <div className="text-lg font-semibold">
                                You are in the admin area.
                            </div>
                            <p className="text-sm text-gray-600">
                                Add your website management pages under
                                <span className="font-mono">
                                    {' '}
                                    resources/js/Pages/Admin
                                </span>{' '}
                                and protect the corresponding routes with the{' '}
                                <span className="font-mono">admin</span>{' '}
                                middleware.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


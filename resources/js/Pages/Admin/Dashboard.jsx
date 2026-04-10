import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

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

                            <div className="pt-4">
                                <div className="text-sm font-semibold text-gray-800">
                                    Quick links
                                </div>
                                <div className="mt-3 flex flex-wrap gap-3">
                                    <Link
                                        href={route('admin.subsidiaries.index')}
                                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                                    >
                                        Manage Subsidiaries
                                    </Link>
                                    <Link
                                        href={route('admin.homepage-videos.index')}
                                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                                    >
                                        Manage Homepage Videos
                                    </Link>
                                    <Link
                                        href={route('admin.siampage-videos.index')}
                                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                                    >
                                        Manage SIAM Page Videos
                                    </Link>
                                    <Link
                                        href={route('admin.team-members.index')}
                                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                                    >
                                        Manage Team Members
                                    </Link>
                                    <Link
                                        href={route('admin.trusted-companies.index')}
                                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
                                    >
                                        Manage Trusted Companies
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


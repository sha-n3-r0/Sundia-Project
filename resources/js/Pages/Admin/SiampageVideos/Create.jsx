import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import VideoForm from './VideoForm';

export default function Create() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add SIAM Page Video
                </h2>
            }
        >
            <Head title="Add SIAM Page Video" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <VideoForm mode="create" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


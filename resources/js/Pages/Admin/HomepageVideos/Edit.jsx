import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import VideoForm from './VideoForm';

export default function Edit({ video }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Homepage Video
                </h2>
            }
        >
            <Head title="Edit Homepage Video" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <VideoForm mode="edit" initialVideo={video} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


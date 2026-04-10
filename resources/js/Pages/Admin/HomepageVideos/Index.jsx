import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ videos }) {
    const { props } = usePage();
    const success = props?.flash?.success;

    const destroyVideo = (id) => {
        if (!confirm('Delete this homepage video?')) return;
        router.delete(route('admin.homepage-videos.destroy', id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Homepage Videos
                    </h2>
                    <Link
                        href={route('admin.homepage-videos.create')}
                        className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Add Video
                    </Link>
                </div>
            }
        >
            <Head title="Homepage Videos" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                    {success && (
                        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                            {success}
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {(!videos || videos.length === 0) ? (
                                <div className="text-sm text-gray-600">
                                    No homepage videos yet. Click <span className="font-semibold">Add Video</span> to create one.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left text-sm">
                                        <thead className="border-b text-xs uppercase tracking-wider text-gray-500">
                                            <tr>
                                                <th className="py-2 pr-4">Title</th>
                                                <th className="py-2 pr-4">Source</th>
                                                <th className="py-2 pr-4">Thumbnail</th>
                                                <th className="py-2 pr-4">Overlay</th>
                                                <th className="py-2 pr-4">Status</th>
                                                <th className="py-2 pr-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {videos.map((v) => {
                                                const source = v.video_path || v.video_url || '';
                                                return (
                                                    <tr key={v.id} className="align-top">
                                                        <td className="py-3 pr-4 font-medium text-gray-900">
                                                            {v.title || <span className="text-gray-400">(no title)</span>}
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <div className="max-w-[420px] truncate text-gray-700">
                                                                {source}
                                                            </div>
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            {v.thumbnail_path ? (
                                                                <img
                                                                    src={v.thumbnail_path}
                                                                    alt="thumbnail"
                                                                    className="h-12 w-20 rounded object-cover ring-1 ring-gray-200"
                                                                />
                                                            ) : (
                                                                <span className="text-gray-400">—</span>
                                                            )}
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <div className="text-gray-700">
                                                                {v.overlay_enabled ? 'Enabled' : 'Disabled'}
                                                            </div>
                                                            {v.overlay_image_path && (
                                                                <div className="mt-2">
                                                                    <img
                                                                        src={v.overlay_image_path}
                                                                        alt="overlay"
                                                                        className="h-10 w-10 rounded object-cover ring-1 ring-gray-200"
                                                                    />
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <span
                                                                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                                    v.is_active
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-gray-100 text-gray-700'
                                                                }`}
                                                            >
                                                                {v.is_active ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 pr-4">
                                                            <div className="flex items-center gap-3">
                                                                <Link
                                                                    href={route('admin.homepage-videos.edit', v.id)}
                                                                    className="text-sm font-semibold text-red-600 hover:text-red-700"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => destroyVideo(v.id)}
                                                                    className="text-sm font-semibold text-gray-600 hover:text-gray-800"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-sm text-gray-600">
                        Public homepage will display the <span className="font-semibold">latest Active</span> record.
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


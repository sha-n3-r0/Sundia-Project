import { useEffect, useMemo, useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

function isProbablyEmbedUrl(url) {
    if (!url) return false;
    const u = url.toLowerCase();
    return u.includes('youtube.com') || u.includes('youtu.be') || u.includes('vimeo.com');
}

export default function VideoForm({ mode, initialVideo }) {
    const { props } = usePage();
    const success = props?.flash?.success;

    const form = useForm({
        title: initialVideo?.title ?? '',
        video_url: initialVideo?.video_url ?? '',
        video_file: null,
        thumbnail_file: null,
        overlay_enabled: initialVideo?.overlay_enabled ?? true,
        overlay_image_file: null,
        is_active: initialVideo?.is_active ?? true,
    });

    const [localVideoPreviewUrl, setLocalVideoPreviewUrl] = useState(null);
    const [localThumbPreviewUrl, setLocalThumbPreviewUrl] = useState(null);
    const [localOverlayPreviewUrl, setLocalOverlayPreviewUrl] = useState(null);

    useEffect(() => {
        if (!form.data.video_file) return;
        const url = URL.createObjectURL(form.data.video_file);
        setLocalVideoPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [form.data.video_file]);

    useEffect(() => {
        if (!form.data.thumbnail_file) return;
        const url = URL.createObjectURL(form.data.thumbnail_file);
        setLocalThumbPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [form.data.thumbnail_file]);

    useEffect(() => {
        if (!form.data.overlay_image_file) return;
        const url = URL.createObjectURL(form.data.overlay_image_file);
        setLocalOverlayPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [form.data.overlay_image_file]);

    const resolvedExistingVideo = useMemo(() => {
        const src = initialVideo?.video_path || initialVideo?.video_url || '';
        return src;
    }, [initialVideo]);

    const resolvedExistingThumb = initialVideo?.thumbnail_path || '';
    const resolvedExistingOverlay = initialVideo?.overlay_image_path || '';

    const submit = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (mode === 'create') {
            form.post(route('admin.homepage-videos.store'), options);
            return;
        }

        form
            .transform((data) => ({
                ...data,
                _method: 'put',
            }))
            .post(route('admin.homepage-videos.update', initialVideo.id), options);
    };

    const progress = form.progress;

    return (
        <form onSubmit={submit} className="space-y-6">
            {success && (
                <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    {success}
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Video title (optional)
                        </label>
                        <input
                            type="text"
                            value={form.data.title}
                            onChange={(e) => form.setData('title', e.target.value)}
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-red-500"
                            placeholder="Sundia Group Company Video"
                        />
                        {form.errors.title && (
                            <div className="mt-1 text-sm text-red-600">{form.errors.title}</div>
                        )}
                    </div>

                    <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                        <div className="text-sm font-semibold text-gray-800">
                            Video source
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                            Choose either an uploaded video file or a YouTube/Vimeo/direct URL.
                        </div>

                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">
                                    Upload video file
                                </label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => form.setData('video_file', e.target.files?.[0] ?? null)}
                                    className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                                />
                                {form.errors.video_file && (
                                    <div className="mt-1 text-sm text-red-600">{form.errors.video_file}</div>
                                )}
                            </div>

                            <div className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
                                or
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700">
                                    Video URL (YouTube/Vimeo/direct)
                                </label>
                                <input
                                    type="url"
                                    value={form.data.video_url}
                                    onChange={(e) => form.setData('video_url', e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-red-500"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                />
                                {form.errors.video_url && (
                                    <div className="mt-1 text-sm text-red-600">{form.errors.video_url}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <input
                                type="checkbox"
                                checked={!!form.data.is_active}
                                onChange={(e) => form.setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            Active
                        </label>

                        <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <input
                                type="checkbox"
                                checked={!!form.data.overlay_enabled}
                                onChange={(e) => form.setData('overlay_enabled', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            Play button overlay
                        </label>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="rounded-md border border-gray-200 bg-white p-4">
                        <div className="text-sm font-semibold text-gray-800">Thumbnail (optional)</div>
                        <div className="mt-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => form.setData('thumbnail_file', e.target.files?.[0] ?? null)}
                                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                            />
                            {form.errors.thumbnail_file && (
                                <div className="mt-1 text-sm text-red-600">{form.errors.thumbnail_file}</div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="h-20 w-32 overflow-hidden rounded-md bg-gray-100 ring-1 ring-gray-200">
                                {(localThumbPreviewUrl || resolvedExistingThumb) ? (
                                    <img
                                        src={localThumbPreviewUrl || resolvedExistingThumb}
                                        alt="thumbnail preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                        No thumbnail
                                    </div>
                                )}
                            </div>
                            <div className="text-sm text-gray-600">
                                Used as the poster image for the homepage video.
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-gray-200 bg-white p-4">
                        <div className="text-sm font-semibold text-gray-800">Overlay image (optional)</div>
                        <div className="mt-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => form.setData('overlay_image_file', e.target.files?.[0] ?? null)}
                                className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                            />
                            {form.errors.overlay_image_file && (
                                <div className="mt-1 text-sm text-red-600">{form.errors.overlay_image_file}</div>
                            )}
                        </div>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-md bg-gray-100 ring-1 ring-gray-200">
                                {(localOverlayPreviewUrl || resolvedExistingOverlay) ? (
                                    <img
                                        src={localOverlayPreviewUrl || resolvedExistingOverlay}
                                        alt="overlay preview"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                        None
                                    </div>
                                )}
                            </div>
                            <div className="text-sm text-gray-600">
                                Optional custom play-overlay graphic.
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-gray-200 bg-white p-4">
                        <div className="text-sm font-semibold text-gray-800">Preview</div>
                        <div className="mt-3 overflow-hidden rounded-md bg-black">
                            {localVideoPreviewUrl ? (
                                <video
                                    src={localVideoPreviewUrl}
                                    controls
                                    className="aspect-video w-full"
                                />
                            ) : resolvedExistingVideo ? (
                                isProbablyEmbedUrl(resolvedExistingVideo) ? (
                                    <div className="aspect-video w-full bg-black text-white/80 flex items-center justify-center text-sm px-4 text-center">
                                        URL preview (YouTube/Vimeo) will be shown on the public homepage.
                                    </div>
                                ) : (
                                    <video
                                        src={resolvedExistingVideo}
                                        controls
                                        poster={resolvedExistingThumb || undefined}
                                        className="aspect-video w-full"
                                    />
                                )
                            ) : (
                                <div className="aspect-video w-full bg-black text-white/70 flex items-center justify-center text-sm">
                                    No video selected yet
                                </div>
                            )}
                        </div>

                        {progress && (
                            <div className="mt-4">
                                <div className="flex items-center justify-between text-xs text-gray-600">
                                    <span>Uploading…</span>
                                    <span>{progress.percentage}%</span>
                                </div>
                                <div className="mt-2 h-2 w-full overflow-hidden rounded bg-gray-100 ring-1 ring-gray-200">
                                    <div
                                        className="h-full bg-red-600 transition-all"
                                        style={{ width: `${progress.percentage}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <Link
                    href={route('admin.homepage-videos.index')}
                    className="text-sm font-semibold text-gray-600 hover:text-gray-900"
                >
                    Back
                </Link>

                <button
                    type="submit"
                    disabled={form.processing}
                    className="inline-flex items-center rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                    {form.processing ? 'Saving…' : (mode === 'create' ? 'Create video' : 'Save changes')}
                </button>
            </div>
        </form>
    );
}


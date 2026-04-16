import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { publicAssetUrl } from '@/utils/publicAssetUrl';

export default function AdminDashboard() {
    const { props } = usePage();
    const backgroundPictures = props.backgroundPictures ?? {};
    const vacuumformedplastics = props.vacuumformedplastics ?? [];
    const flashVacuumformedplasticSuccess = props?.flash?.success_vacuumformedplastic;
    const pages = ['Home', 'Siam', 'Tpsmi', 'Top offroad', 'Careers'];
    const [backgroundPreviews, setBackgroundPreviews] = useState({});
    const [slotOverrides, setSlotOverrides] = useState({});
    const [editingVacuumformedplastic, setEditingVacuumformedplastic] = useState(null);
    const [vacuumformedplasticImagePreview, setVacuumformedplasticImagePreview] = useState(null);

    const vacuumformedplasticForm = useForm({
        title: '',
        image_file: null,
        display_order: 0,
        is_active: true,
    });

    useEffect(() => {
        if (!editingVacuumformedplastic) {
            vacuumformedplasticForm.reset();
            vacuumformedplasticForm.setData('display_order', 0);
            vacuumformedplasticForm.setData('is_active', true);
            vacuumformedplasticForm.clearErrors();
            setVacuumformedplasticImagePreview(null);
            return;
        }

        vacuumformedplasticForm.setData({
            title: editingVacuumformedplastic.title ?? '',
            image_file: null,
            display_order: editingVacuumformedplastic.display_order ?? 0,
            is_active: editingVacuumformedplastic.is_active ?? true,
        });
        vacuumformedplasticForm.clearErrors();
        setVacuumformedplasticImagePreview(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingVacuumformedplastic?.id]);

    useEffect(() => {
        if (!vacuumformedplasticForm.data.image_file) return;
        const url = URL.createObjectURL(vacuumformedplasticForm.data.image_file);
        setVacuumformedplasticImagePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [vacuumformedplasticForm.data.image_file]);

    const submitVacuumformedplastic = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editingVacuumformedplastic?.id) {
            vacuumformedplasticForm.transform((data) => {
                const next = { ...data };
                if (!next.image_file) delete next.image_file;
                return next;
            });
            vacuumformedplasticForm.post(route('vacuumformedplastics.store'), options);
            return;
        }

        vacuumformedplasticForm.transform((data) => {
            const next = {
                title: data.title,
                display_order: data.display_order,
                is_active: data.is_active,
                _method: 'put',
            };
            if (data.image_file) next.image_file = data.image_file;
            return next;
        });
        vacuumformedplasticForm.post(
            route('vacuumformedplastics.update', editingVacuumformedplastic.id),
            options
        );
    };

    const destroyVacuumformedplastic = (id) => {
        router.delete(route('vacuumformedplastics.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                if (editingVacuumformedplastic?.id === id) {
                    setEditingVacuumformedplastic(null);
                }
            },
        });
    };

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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="space-y-2 p-6 text-gray-900">
                            <div className="text-lg font-semibold">
                                You are in the admin area.
                            </div>
                            <p className="text-sm text-gray-600">
                                Quick management shortcuts are available below.
                            </p>

                            <div className="pt-4">
                                <div className="text-sm font-semibold text-gray-800">
                                    Quick links
                                </div>
                                <div className="mt-3 flex flex-wrap gap-3">
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                    >
                                        Manage Main Dashboard
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

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-700">
                                Current Background Pictures
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Preview and update the background images currently fetched from database.
                            </p>
                            <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">
                                {pages.map((page) => {
                                    const savedImages = backgroundPictures?.[page]?.images ?? [];
                                    const defaultSlots = Number(backgroundPictures?.[page]?.slot_count || 1);
                                    const slots = slotOverrides[page] ?? Math.max(1, defaultSlots);

                                    return (
                                        <div key={page} className="rounded-md border border-gray-200 p-3">
                                            <div className="mb-3 flex items-center justify-between gap-2">
                                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                                                    {page}
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSlotOverrides((prev) => ({
                                                            ...prev,
                                                            [page]: (prev[page] ?? Math.max(1, defaultSlots)) + 1,
                                                        }))
                                                    }
                                                    className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-red-700"
                                                >
                                                    Add Image Slot
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {Array.from({ length: slots }, (_, slot) => {
                                                    const previewKey = `${page}-${slot}`;
                                                    const imagePath = backgroundPreviews?.[previewKey] || savedImages?.[slot] || null;

                                                    return (
                                                        <form
                                                            key={previewKey}
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                const formData = new FormData(e.target);
                                                                formData.append('page_name', page);
                                                                formData.append('slot', String(slot));
                                                                router.post(route('admin.background-pictures.update'), formData, {
                                                                    forceFormData: true,
                                                                    preserveScroll: true,
                                                                    onSuccess: () => {
                                                                        setBackgroundPreviews((prev) => {
                                                                            const next = { ...prev };
                                                                            if (next[previewKey]) URL.revokeObjectURL(next[previewKey]);
                                                                            delete next[previewKey];
                                                                            return next;
                                                                        });
                                                                        e.target.reset();
                                                                    },
                                                                });
                                                            }}
                                                            className="rounded-md border border-gray-200 bg-gray-50 p-3"
                                                        >
                                                            <div className="mb-2 flex items-center justify-between gap-2">
                                                                <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-700">
                                                                    {slots > 1 ? `Background ${slot + 1}` : 'Background'}
                                                                </div>
                                                                <button
                                                                    type="submit"
                                                                    className="rounded bg-gray-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-gray-800"
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>
                                                            <div className="flex aspect-video items-center justify-center overflow-hidden rounded border border-gray-200 bg-white">
                                                                {imagePath ? (
                                                                    <img
                                                                        src={publicAssetUrl(imagePath)}
                                                                        alt={`${page} background ${slot + 1}`}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <span className="text-xs text-gray-400">No image saved</span>
                                                                )}
                                                            </div>
                                                            <div className="mt-3 space-y-2">
                                                                <input
                                                                    type="file"
                                                                    name="image_file"
                                                                    accept="image/*"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files?.[0];
                                                                        setBackgroundPreviews((prev) => {
                                                                            const next = { ...prev };
                                                                            if (next[previewKey]) URL.revokeObjectURL(next[previewKey]);
                                                                            if (file) next[previewKey] = URL.createObjectURL(file);
                                                                            else delete next[previewKey];
                                                                            return next;
                                                                        });
                                                                    }}
                                                                    className="block w-full text-[11px] text-gray-700 file:mr-3 file:rounded file:border-0 file:bg-red-600 file:px-3 file:py-1 file:text-[10px] file:font-semibold file:uppercase file:text-white hover:file:bg-red-700"
                                                                />
                                                                <label className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="remove_image"
                                                                        value="1"
                                                                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                                    />
                                                                    Remove current image
                                                                </label>
                                                            </div>
                                                        </form>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-700">
                                TPSMI Vacuum Formed Plastic Pictures
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Preview current pictures fetched from database and manage them with CRUD actions.
                            </p>

                            <div className="mt-5 space-y-2">
                                {vacuumformedplastics.map((item, idx) => (
                                    <div
                                        key={item.id ?? `vacuumformedplastic-row-${idx}`}
                                        className="flex flex-col gap-3 rounded border border-gray-200 bg-gray-50 p-3 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-16 w-24 overflow-hidden rounded border border-gray-200 bg-white">
                                                <img
                                                    src={
                                                        item.image_path
                                                            ? publicAssetUrl(item.image_path)
                                                            : 'https://placehold.co/350x269'
                                                    }
                                                    alt={item.title || 'Vacuum formed plastic picture'}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                                                    {item.title || 'Untitled picture'}
                                                </p>
                                                <p className="mt-1 text-[11px] text-gray-500">
                                                    Order: {item.display_order ?? 0} | Active: {item.is_active ? 'Yes' : 'No'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setEditingVacuumformedplastic(item)}
                                                className="rounded border border-gray-300 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gray-700 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => item.id && destroyVacuumformedplastic(item.id)}
                                                className="rounded border border-red-200 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-600 hover:bg-red-50"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form
                                onSubmit={submitVacuumformedplastic}
                                className="mt-5 space-y-4 rounded border border-gray-200 bg-gray-50 p-4"
                            >
                                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-700">
                                    {editingVacuumformedplastic ? 'Edit picture' : 'Add picture'}
                                </h4>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={vacuumformedplasticForm.data.title}
                                            onChange={(e) =>
                                                vacuumformedplasticForm.setData('title', e.target.value)
                                            }
                                            className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-[11px] focus:border-red-500 focus:ring focus:ring-red-500/20"
                                            placeholder="Optional title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                                            Display order
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={vacuumformedplasticForm.data.display_order}
                                            onChange={(e) =>
                                                vacuumformedplasticForm.setData(
                                                    'display_order',
                                                    Number(e.target.value || 0)
                                                )
                                            }
                                            className="mt-1 w-full rounded border border-gray-300 px-2 py-1 text-[11px] focus:border-red-500 focus:ring focus:ring-red-500/20"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                                            <input
                                                type="checkbox"
                                                checked={vacuumformedplasticForm.data.is_active}
                                                onChange={(e) =>
                                                    vacuumformedplasticForm.setData('is_active', e.target.checked)
                                                }
                                                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                            />
                                            <span>Active</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                                        Picture image
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <div className="flex h-16 w-40 shrink-0 items-center justify-center overflow-hidden rounded-md border border-dashed border-gray-300 bg-white">
                                            {vacuumformedplasticImagePreview ? (
                                                <img
                                                    src={vacuumformedplasticImagePreview}
                                                    alt="New vacuum formed plastic image preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : editingVacuumformedplastic?.image_path ? (
                                                <img
                                                    src={publicAssetUrl(editingVacuumformedplastic.image_path)}
                                                    alt="Current vacuum formed plastic image"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-gray-400">No image set</span>
                                            )}
                                        </div>
                                        <div className="flex min-w-0 flex-1 flex-col gap-3">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    vacuumformedplasticForm.setData(
                                                        'image_file',
                                                        e.target.files?.[0] ?? null
                                                    )
                                                }
                                                className="block w-full max-w-md text-[11px] text-gray-700 file:mr-3 file:rounded file:border-0 file:bg-red-600 file:px-3 file:py-1 file:text-[10px] file:font-semibold file:uppercase file:text-white hover:file:bg-red-700"
                                            />
                                            {vacuumformedplasticForm.errors.image_file && (
                                                <p className="text-[10px] text-red-600">
                                                    {vacuumformedplasticForm.errors.image_file}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {flashVacuumformedplasticSuccess && (
                                    <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-[11px] text-green-800">
                                        {flashVacuumformedplasticSuccess}
                                    </div>
                                )}

                                <div className="flex items-center justify-end gap-2">
                                    {editingVacuumformedplastic && (
                                        <button
                                            type="button"
                                            onClick={() => setEditingVacuumformedplastic(null)}
                                            className="rounded border border-gray-300 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-700 hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={vacuumformedplasticForm.processing}
                                        className="rounded bg-red-600 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white hover:bg-red-700 disabled:opacity-60"
                                    >
                                        {vacuumformedplasticForm.processing
                                            ? 'Saving...'
                                            : editingVacuumformedplastic
                                            ? 'Update picture'
                                            : 'Add picture'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Index({ companies = [] }) {
    const { props } = usePage();
    const success = props?.flash?.success;
    const [editing, setEditing] = useState(null);

    const form = useForm({
        name: '',
        logo_file: null,
        display_order: 0,
        is_active: true,
    });

    const [localLogoPreviewUrl, setLocalLogoPreviewUrl] = useState(null);
    const logoPreviewObjectUrlRef = useRef(null);

    const revokeLogoPreview = () => {
        if (logoPreviewObjectUrlRef.current) {
            URL.revokeObjectURL(logoPreviewObjectUrlRef.current);
            logoPreviewObjectUrlRef.current = null;
        }
    };

    const onLogoFileChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        revokeLogoPreview();
        if (file) {
            const url = URL.createObjectURL(file);
            logoPreviewObjectUrlRef.current = url;
            setLocalLogoPreviewUrl(url);
        } else {
            setLocalLogoPreviewUrl(null);
        }
        form.setData('logo_file', file);
    };

    useEffect(() => {
        return () => revokeLogoPreview();
    }, []);

    useEffect(() => {
        revokeLogoPreview();
        if (!editing) {
            form.setData({
                name: '',
                logo_file: null,
                display_order: 0,
                is_active: true,
            });
            setLocalLogoPreviewUrl(null);
            form.clearErrors();
            return;
        }

        form.setData({
            name: editing.name ?? '',
            logo_file: null,
            display_order: editing.display_order ?? 0,
            is_active: editing.is_active ?? true,
        });
        setLocalLogoPreviewUrl(null);
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editing?.id]);

    const previewCompany = useMemo(() => {
        return {
            ...(editing || {}),
            ...form.data,
            local_logo_preview_url: localLogoPreviewUrl,
        };
    }, [editing, form.data, localLogoPreviewUrl]);

    const destroyCompany = (id) => {
        if (!confirm('Delete this trusted company?')) return;
        router.delete(route('admin.trusted-companies.destroy', id), {
            preserveScroll: true,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editing?.id) {
            form.post(route('admin.trusted-companies.store'), options);
            return;
        }

        form.transform((data) => ({ ...data, _method: 'put' })).post(
            route('admin.trusted-companies.update', editing.id),
            options,
        );
    };

    const progress = form.progress;
    const previewLogo =
        previewCompany.local_logo_preview_url ||
        previewCompany.logo_path ||
        null;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Trusted Companies
                    </h2>
                    <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Add Company
                    </button>
                </div>
            }
        >
            <Head title="Trusted Companies" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
                {success && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        {success}
                    </div>
                )}

                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                                <div className="rounded-md border border-gray-200 bg-white p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {editing?.id ? 'Edit company' : 'Add new company'}
                                            </div>
                                            <div className="mt-1 text-sm text-gray-600">
                                                This controls the public “Sundia Trusted Companies” logos section.
                                            </div>
                                        </div>
                                        {editing?.id && (
                                            <button
                                                type="button"
                                                onClick={() => setEditing(null)}
                                                className="text-sm font-semibold text-gray-600 hover:text-gray-900"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>

                                    <form onSubmit={submit} className="mt-4 space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.name}
                                                onChange={(e) => form.setData('name', e.target.value)}
                                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-red-500"
                                            />
                                            {form.errors.name && (
                                                <div className="mt-1 text-sm text-red-600">{form.errors.name}</div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Logo image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={onLogoFileChange}
                                                className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                                            />
                                            {form.errors.logo_file && (
                                                <div className="mt-1 text-sm text-red-600">{form.errors.logo_file}</div>
                                            )}
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Order
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={form.data.display_order}
                                                    onChange={(e) => form.setData('display_order', Number(e.target.value))}
                                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-red-500"
                                                />
                                                {form.errors.display_order && (
                                                    <div className="mt-1 text-sm text-red-600">{form.errors.display_order}</div>
                                                )}
                                            </div>

                                            <div className="flex items-end">
                                                <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!form.data.is_active}
                                                        onChange={(e) => form.setData('is_active', e.target.checked)}
                                                        className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                                    />
                                                    Active
                                                </label>
                                                {form.errors.is_active && (
                                                    <div className="mt-1 text-sm text-red-600">{form.errors.is_active}</div>
                                                )}
                                            </div>
                                        </div>

                                        {progress && (
                                            <div className="rounded-md border border-gray-200 bg-white p-3">
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

                                        <div className="flex items-center justify-between pt-2">
                                            <div className="text-xs text-gray-500">
                                                Preview updates live on the right.
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={form.processing}
                                                className="inline-flex items-center rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                                            >
                                                {form.processing ? 'Saving…' : (editing?.id ? 'Save changes' : 'Create company')}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="rounded-md border border-gray-200 bg-white p-4">
                                    <div className="text-lg font-semibold text-gray-900">
                                        Preview (homepage logos)
                                    </div>
                                    <div className="mt-4 flex flex-col items-center justify-center gap-4 rounded-md bg-black p-8">
                                        {previewLogo ? (
                                            <img
                                                src={previewLogo}
                                                alt={previewCompany.name || 'Logo preview'}
                                                className="max-h-24 w-auto object-contain"
                                            />
                                        ) : (
                                            <div className="text-sm text-white/70">
                                                Upload a logo to see the preview.
                                            </div>
                                        )}
                                        <div className="text-xs font-semibold tracking-widest text-white/80 uppercase">
                                            {previewCompany.name || 'Company name'}
                                        </div>
                                    </div>
                                </div>
                        </div>

                {(!companies || companies.length === 0) ? (
                    <div className="mt-6 text-sm text-gray-600">
                        No trusted companies yet. Use the form above to add one.
                    </div>
                ) : (
                    <div className="mt-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold text-gray-900">
                                    Existing companies
                                </div>
                                <div className="mt-1 text-sm text-gray-600">
                                    Inactive companies are dimmed and hidden on the homepage.
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                Sorted by <span className="font-semibold">Order</span>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {companies.map((c) => (
                                <div
                                    key={c.id}
                                    className={`rounded-md border p-4 ${c.is_active ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-70'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-16 w-32 items-center justify-center rounded bg-black">
                                            {c.logo_path ? (
                                                <img
                                                    src={c.logo_path}
                                                    alt={c.name}
                                                    className="max-h-12 w-auto object-contain"
                                                />
                                            ) : (
                                                <div className="text-xs text-white/70">No logo</div>
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-gray-900">
                                                {c.name}
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500">
                                                Order:{' '}
                                                <span className="font-semibold">
                                                    {c.display_order ?? 0}
                                                </span>
                                                {' · '}
                                                {c.is_active ? 'Active' : 'Inactive'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setEditing(c)}
                                            className="text-sm font-semibold text-red-600 hover:text-red-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => destroyCompany(c.id)}
                                            className="text-sm font-semibold text-gray-600 hover:text-gray-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


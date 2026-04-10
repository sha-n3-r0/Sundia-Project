import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import TeamMemberCardPreview from './TeamMemberCardPreview';
import { useEffect, useMemo, useState } from 'react';

export default function Index({ members = [], logoOptions = [] }) {
    const { props } = usePage();
    const success = props?.flash?.success;
    const [editing, setEditing] = useState(null);

    const form = useForm({
        name: '',
        title: '',
        company: '',
        company_logo: '',
        profile_image_file: null,
        display_order: 0,
        is_active: true,
    });

    const [localProfilePreviewUrl, setLocalProfilePreviewUrl] = useState(null);

    useEffect(() => {
        if (!form.data.profile_image_file) return;
        const url = URL.createObjectURL(form.data.profile_image_file);
        setLocalProfilePreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [form.data.profile_image_file]);

    useEffect(() => {
        if (!editing) {
            form.setData({
                name: '',
                title: '',
                company: '',
                company_logo: '',
                profile_image_file: null,
                display_order: 0,
                is_active: true,
            });
            setLocalProfilePreviewUrl(null);
            form.clearErrors();
            return;
        }

        form.setData({
            name: editing.name ?? '',
            title: editing.title ?? '',
            company: editing.company ?? '',
            company_logo: editing.company_logo ?? '',
            profile_image_file: null,
            display_order: editing.display_order ?? 0,
            is_active: editing.is_active ?? true,
        });
        setLocalProfilePreviewUrl(null);
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editing?.id]);

    const previewMember = useMemo(() => {
        return {
            ...(editing || {}),
            ...form.data,
            local_profile_preview_url: localProfilePreviewUrl,
        };
    }, [editing, form.data, localProfilePreviewUrl]);

    const destroyMember = (id) => {
        if (!confirm('Delete this team member?')) return;
        router.delete(route('admin.team-members.destroy', id), {
            preserveScroll: true,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true };

        if (!editing?.id) {
            form.post(route('admin.team-members.store'), options);
            return;
        }

        form.transform((data) => ({ ...data, _method: 'put' })).post(
            route('admin.team-members.update', editing.id),
            options,
        );
    };

    const progress = form.progress;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Team Members
                    </h2>
                    <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                        Add Member
                    </button>
                </div>
            }
        >
            <Head title="Team Members" />

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
                                                {editing?.id ? 'Edit member' : 'Add new member'}
                                            </div>
                                            <div className="mt-1 text-sm text-gray-600">
                                                This form updates the public “Meet the Team” section.
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
                                                Position / Title
                                            </label>
                                            <input
                                                type="text"
                                                value={form.data.title}
                                                onChange={(e) => form.setData('title', e.target.value)}
                                                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-red-500"
                                            />
                                            {form.errors.title && (
                                                <div className="mt-1 text-sm text-red-600">{form.errors.title}</div>
                                            )}
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Company
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.company}
                                                    onChange={(e) => form.setData('company', e.target.value)}
                                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-red-500"
                                                />
                                                {form.errors.company && (
                                                    <div className="mt-1 text-sm text-red-600">{form.errors.company}</div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700">
                                                    Company Logo
                                                </label>
                                                <select
                                                    value={form.data.company_logo || ''}
                                                    onChange={(e) => form.setData('company_logo', e.target.value)}
                                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:ring-red-500"
                                                >
                                                    <option value="">— Select —</option>
                                                    {logoOptions.map((opt) => (
                                                        <option key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                {form.errors.company_logo && (
                                                    <div className="mt-1 text-sm text-red-600">{form.errors.company_logo}</div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Profile image
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => form.setData('profile_image_file', e.target.files?.[0] ?? null)}
                                                className="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
                                            />
                                            {form.errors.profile_image_file && (
                                                <div className="mt-1 text-sm text-red-600">{form.errors.profile_image_file}</div>
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
                                                {form.processing ? 'Saving…' : (editing?.id ? 'Save changes' : 'Create member')}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div className="rounded-md border border-gray-200 bg-white p-4">
                                    <div className="text-lg font-semibold text-gray-900">
                                        Preview (matches homepage)
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <TeamMemberCardPreview member={previewMember} mode="preview" />
                                    </div>
                                </div>
                            </div>

                            {(!members || members.length === 0) ? (
                                <div className="mt-6 text-sm text-gray-600">
                                    No team members yet. Use the form above to add one.
                                </div>
                            ) : (
                                <div className="mt-8">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <div className="text-lg font-semibold text-gray-900">
                                                Existing members
                                            </div>
                                            <div className="mt-1 text-sm text-gray-600">
                                                Cards below match the public “Meet the Team” design. Inactive members are dimmed.
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Sorted by <span className="font-semibold">Order</span>
                                        </div>
                                    </div>
                                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center">
                                        {members.map((m) => (
                                            <div key={m.id} className="relative">
                                                <TeamMemberCardPreview
                                                    member={m}
                                                    mode="admin"
                                                    onEdit={(member) => setEditing(member)}
                                                />

                                                <div className="mt-3 flex items-center justify-between">
                                                    <div className="text-xs text-gray-500">
                                                        Order:{' '}
                                                        <span className="font-semibold">
                                                            {m.display_order ?? 0}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditing(m)}
                                                            className="text-sm font-semibold text-red-600 hover:text-red-700"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                destroyMember(m.id)
                                                            }
                                                            className="text-sm font-semibold text-gray-600 hover:text-gray-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
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


import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ serviceCards }) {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service card?')) {
            setDeletingId(id);
            router.delete(`/admin/service-cards/${id}`, {
                onFinish: () => setDeletingId(null),
            });
        }
    };

    const toggleActive = (card) => {
        router.put(`/admin/service-cards/${card.id}`, {
            ...card,
            is_active: !card.is_active,
        });
    };

    return (
        <>
            <Head title="Service Cards - Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Service Cards Management</h1>
                                <Link
                                    href="/admin/service-cards/create"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add New Card
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {serviceCards.map((card) => (
                                    <div key={card.id} className="border rounded-lg overflow-hidden shadow-sm">
                                        <div className="aspect-[4/3] bg-gray-100 relative">
                                            {card.image_path ? (
                                                <img
                                                    src={`/storage/${card.image_path}`}
                                                    alt={card.alt_text || card.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <button
                                                    onClick={() => toggleActive(card)}
                                                    className={`px-2 py-1 text-xs font-semibold rounded ${
                                                        card.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {card.is_active ? 'Active' : 'Inactive'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            {card.title && (
                                                <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                                            )}
                                            {card.description && (
                                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{card.description}</p>
                                            )}
                                            <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                                                <span>Order: {card.sort_order}</span>
                                                <span>ID: {card.id}</span>
                                            </div>

                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/admin/service-cards/${card.id}/edit`}
                                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-center py-2 px-3 rounded text-sm"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(card.id)}
                                                    disabled={deletingId === card.id}
                                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded text-sm disabled:opacity-50"
                                                >
                                                    {deletingId === card.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {serviceCards.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">No service cards found.</p>
                                    <Link
                                        href="/admin/service-cards/create"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Create Your First Card
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}